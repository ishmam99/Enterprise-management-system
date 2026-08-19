<template>
  <div>
    <!-- Loading overlay — shown while Stripe initialises -->
    <div v-if="!stripeLoaded && !stripeError" class="p-4 text-center">
      <div class="inline-block">
        <div class="w-8 h-8 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p class="mt-2 text-gray-600 text-sm">Loading secure payment form...</p>
      </div>
    </div>

    <!-- Stripe Error -->
    <div v-if="stripeError" class="text-center py-8 bg-red-50 rounded-xl border border-red-200">
      <svg class="w-12 h-12 text-red-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="text-red-700 mb-3 text-sm">{{ stripeError }}</p>
      <button @click="retryInitialize" class="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors">
        Retry
      </button>
    </div>

    <!--
      IMPORTANT: this wrapper uses v-show, NOT v-if.
      The div (and cardElementRef) must always be in the DOM so Stripe
      can mount into it during initializeStripe(). v-if would remove the
      element before Stripe gets a chance to find it.
    -->
    <div v-show="stripeLoaded && !stripeError">
      <div class="p-4 bg-white rounded-xl border-2 border-gray-200 focus-within:border-indigo-400 transition-colors duration-200">
        <!-- ref target is always rendered; Stripe mounts here -->
        <div ref="cardElementRef" class="stripe-card-element"></div>
      </div>

      <div v-if="cardError" class="text-red-500 text-xs mt-1.5 flex items-center gap-1">
        <span>⚠️</span> {{ cardError }}
      </div>

      <!-- Secure badge -->
      <div class="flex items-center gap-1.5 mt-2">
        <svg class="w-3.5 h-3.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
        </svg>
        <span class="text-xs text-gray-500">Payments are SSL encrypted and processed securely by Stripe</span>
      </div>

      <div class="mt-6 flex justify-end">
        <button
          @click="processPayment"
          :disabled="isSubmitDisabled || isProcessingPayment || !isStripeReady"
          class="group px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg transition-all duration-300 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5"
        >
          <svg v-if="isProcessingPayment" class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>{{ isProcessingPayment ? processingStep : `Pay $${props.calculatedPrice?.toLocaleString()}` }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Swal from 'sweetalert2'

const props = defineProps({
  calculatedPrice: Number,
  selectedCourse: Object,
  selectedEnrollmentType: String,
  companyName: String,
  numberOfPersons: Number,
  selectedSchedule: Object,
  preferredStartDate: String,
  isSubmitDisabled: Boolean
})

const emit = defineEmits(['payment-success', 'payment-error'])

// ── Stripe state ──────────────────────────────────────────────
const stripeLoaded       = ref(false)
const stripeError        = ref('')
const isStripeReady      = ref(false)
const cardError          = ref('')
const cardElementRef     = ref(null)
const isProcessingPayment = ref(false)
const processingStep     = ref('Processing...')

let stripe      = null
let cardElement = null
let elements    = null

// ── Load Stripe.js from CDN ───────────────────────────────────
const loadStripeScript = () => {
  return new Promise((resolve, reject) => {
    if (window.Stripe) { resolve(window.Stripe); return }
    const script = document.createElement('script')
    script.src   = 'https://js.stripe.com/v3/'
    script.async = true
    script.onload = () => setTimeout(() => {
      window.Stripe ? resolve(window.Stripe) : reject(new Error('Stripe failed to initialize'))
    }, 100)
    script.onerror = () => reject(new Error('Failed to load Stripe.js'))
    document.head.appendChild(script)
  })
}

// ── Initialize Stripe Elements ────────────────────────────────
const initializeStripe = async () => {
  stripeError.value = ''

  // cardElementRef is always in the DOM (v-show, not v-if),
  // so no polling or nextTick delays are needed here.
  if (!cardElementRef.value) {
    stripeError.value = 'Card element container not found. Please refresh the page.'
    return
  }

  try {
    const StripeConstructor = await loadStripeScript()
    const stripePublicKey   = import.meta.env.VITE_STRIPE_PUBLIC_KEY

    if (!stripePublicKey) throw new Error('Stripe public key is not configured.')

    stripe   = StripeConstructor(stripePublicKey)
    elements = stripe.elements()

    cardElement = elements.create('card', {
      style: {
        base: {
          fontSize: '16px',
          color: '#374151',
          fontFamily: '"Inter", "Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          '::placeholder': { color: '#9ca3af' },
        },
        invalid: { color: '#ef4444', iconColor: '#ef4444' },
      },
      hidePostalCode: false,
    })

    cardElement.mount(cardElementRef.value)
    cardElement.on('change', (event) => {
      cardError.value    = event.error ? event.error.message : ''
      isStripeReady.value = event.complete
    })

    stripeLoaded.value = true
  } catch (error) {
    console.error('Stripe init error:', error)
    stripeError.value = error.message || 'Failed to load payment system. Please refresh.'
  }
}

const retryInitialize = () => {
  stripeError.value  = ''
  stripeLoaded.value = false
  if (cardElement) {
    try { cardElement.destroy() } catch (_) {}
    cardElement = null
  }
  initializeStripe()
}

// ── Build enrollment payload ──────────────────────────────────
const createEnrollmentPayload = () => {
  const payload = {
    course_id:    props.selectedCourse.id,
    course_price: props.calculatedPrice,
    status:       1,                        // 1 = pending payment
  }

  if (props.selectedEnrollmentType === 'individual') {
    payload.training_type = 'individual'
    if (props.preferredStartDate) payload.preferred_start_date = props.preferredStartDate
  } else if (props.selectedEnrollmentType === 'jumbo') {
    payload.training_type          = 'company'
    payload.number_of_participants = props.numberOfPersons
    payload.organization           = props.companyName
    if (props.preferredStartDate) payload.preferred_start_date = props.preferredStartDate
  } else if (props.selectedEnrollmentType === 'group') {
    payload.training_type               = 'group'
    payload.training_course_schedule_id = props.selectedSchedule.id
  }

  return payload
}

// ── Main payment flow ─────────────────────────────────────────
// Flow:
//   1. Create enrollment  →  get enrollment_id
//   2. Create PaymentIntent with enrollment_id in metadata (backend attaches order_id)
//   3. confirmCardPayment with the clientSecret
//   4. Webhook handles status update — no manual /confirm-payment call needed
const processPayment = async () => {
  if (!stripe || !cardElement) {
    Swal.fire({ title: 'Not Ready', text: 'Payment system is still loading. Please wait.', icon: 'warning' })
    return
  }

  if (!isStripeReady.value) {
    Swal.fire({ title: 'Invalid Card', text: 'Please enter a valid card number.', icon: 'warning' })
    return
  }

  isProcessingPayment.value = true

  try {
    // ── Step 1: Create enrollment record (status = 1 / pending) ──
    processingStep.value = 'Creating enrollment...'
    const enrollmentPayload  = createEnrollmentPayload()
    const enrollmentResponse = await api().post('/training-requests', enrollmentPayload)


    if (!enrollmentResponse.data?.success) {
      throw new Error(enrollmentResponse.data?.message || 'Failed to create enrollment.')
    }

    const enrollmentId = enrollmentResponse.data.data.training_enrollment?.id

    // ── Step 2: Create PaymentIntent — pass enrollment_id so backend
    //           stores it in metadata.order_id for the webhook ──────
    processingStep.value = 'Preparing payment...'
    const intentResponse = await api().post('/stripe/create-payment-intent', {
      amount:        props.calculatedPrice,
      currency:      'usd',
      enrollment_id: enrollmentId,           // ← key addition
    })

    if (!intentResponse.data?.clientSecret) {
      throw new Error('Failed to initialize payment. Please try again.')
    }

    const clientSecret = intentResponse.data.clientSecret

    // ── Step 3: Confirm card payment with Stripe ──────────────────
    processingStep.value = 'Confirming payment...'
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: { name: props.companyName || 'Customer' },
      },
    })

    if (error) throw new Error(error.message)

    // ── Step 4: Payment confirmed on Stripe's side.
    //           The webhook (payment_intent.succeeded) will update
    //           the enrollment status to 2. No manual call needed. ──
    if (paymentIntent?.status === 'succeeded') {
      await Swal.fire({
        title:             'Payment Successful! 🎉',
        text:              'Your enrollment is confirmed. A confirmation email will be sent shortly.',
        icon:              'success',
        confirmButtonText: 'Continue',
        confirmButtonColor: '#4f46e5',
      })
      emit('payment-success', { enrollmentId, paymentIntentId: paymentIntent.id })
    }
  } catch (error) {
    console.error('Payment error:', error)

    const friendlyMessages = {
      card_declined:       'Your card was declined. Please try a different card.',
      insufficient_funds:  'Insufficient funds. Please use a different payment method.',
      expired_card:        'Your card has expired. Please use a different card.',
      incorrect_cvc:       'Incorrect security code. Please check and try again.',
      processing_error:    'A processing error occurred. Please try again.',
    }

    const msg = Object.entries(friendlyMessages).find(([key]) =>
      error.message?.includes(key)
    )?.[1] || error.message || 'There was an error processing your payment.'

    Swal.fire({ title: 'Payment Failed', text: msg, icon: 'error', confirmButtonText: 'Try Again', confirmButtonColor: '#dc2626' })
    emit('payment-error', error)
  } finally {
    isProcessingPayment.value = false
    processingStep.value      = 'Processing...'
  }
}

// ── Lifecycle ─────────────────────────────────────────────────
// cardElementRef is always rendered (v-show), so a direct call is safe.
onMounted(() => initializeStripe())

onBeforeUnmount(() => {
  if (cardElement) {
    try { cardElement.destroy() } catch (_) {}
    cardElement = null
  }
})
</script>

<style scoped>
.stripe-card-element {
  min-height: 40px;
  padding: 8px 0;
}
</style>