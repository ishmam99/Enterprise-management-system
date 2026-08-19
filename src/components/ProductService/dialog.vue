<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button
        variant="outline"
        class="bg-[#2c9299] w-full h-14 rounded border-none hover:bg-slate-500"
        @click="checkAuth"
      >
        <p class="p-3 lg:text-2xl text-white sm:text-xl text-center">
          Request For Quote
        </p>
      </Button>
    </DialogTrigger>
    <DialogContent class="w-[90vw] max-w-[1200px] bg-white rounded">
      <DialogHeader class="border-b-2 border-[#2c9299] pb-3">
        <DialogTitle class="text-3xl text-[#2c9299]"
          >Request For Quote</DialogTitle
        >
      </DialogHeader>
      <form @submit.prevent="submitQuote" class="w-full">
        <div class="grid gap-4 py-4">
          <!-- Dropdown Fields - Now in a 2-column grid -->
          <div class="grid grid-cols-3 gap-4">
             <div>
              <label
                for="product-subcategory"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Industry <span class="text-red-500">*</span>
                <span class="ml-2 text-blue-500">
                  <Icon name="eos-icons:loading" class="inline" />
                </span>
              </label>
             <select
  v-model="formData.industry"
  @change="updateIndustryName"
  id="product-subcategory"
  required
  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
>
  <option value="" disabled>Select an industry</option>
  <option
    v-for="industry in industries"
    :key="industry.id"
    :value="industry.name"
  >
    {{ industry.name }}
  </option>
</select>
            </div>
            <div>
              <label
                for="product-subcategory"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Sub Industry <span class="text-red-500">*</span>
                <span class="ml-2 text-blue-500">
                  <Icon name="eos-icons:loading" class="inline" />
                </span>
              </label>
             <!-- Subindustry select -->
<select
  v-model="formData.subindustry"
  @change="updateSubindustryName"
  id="product-subcategory"
  required
  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
>
  <option value="" disabled>Select a sub industry</option>
  <option
    v-for="subindustry in filteredSubindustries"
    :key="subindustry.id"
    :value="subindustry.name"
  >
    {{ subindustry.name }}
  </option>
</select>
            </div>

            <div class="items-end">
              <Label for="type" class="text-right text-sm">
                Product <span class="text-red-500">*</span>
              </Label>
              <select
                id="type"
                v-model="formData.product_id"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled>Select Product</option>
                <option v-for="type in products" :key="type.id" :value="type.id">
                  {{ type.name }}
                </option>
              </select>
            </div>
          </div>

          <!-- Other fields in a 3-column grid -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label
                for="product-brand"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Manufacturer 
                <span class="ml-2 text-blue-500">
                  <Icon name="eos-icons:loading" class="inline" />
                </span>
              </label>
              <select
                v-model="formData.brand_id"
                id="product-brand"
                
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                
              >
                <option value="" disabled>Select a manufacturer</option>
                <option v-for="brand in brands" :key="brand.id" :value="brand.id">
                  {{ brand.name }}
                </option>
              </select>
            </div>

            <div class="items-end">
              <Label for="specs" class="text-right text-sm">
                Specifications
              </Label>
              <select
                id="specs"
                v-model="formData.specs"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Specifications</option>
                <option
                  v-for="spec in specifications"
                  :key="spec.id"
                  :value="spec.name"
                >
                  {{ spec.name }}
                </option>
              </select>
            </div>

          </div>
          <div class="grid grid-cols-2 gap-4">
              <div>
    <label for="model-number" class="block text-sm font-medium text-gray-700 mb-1">
      Model Number 
    </label>
    <select
      v-model="selectedModel"
      id="model-number"
      required
      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="" disabled>Select a model number</option>
      <option
        v-for="model in modelNumbers"
        :key="model.id"
        :value="model.model_number"
      >
        {{ model.model_number }} ({{ model.category }})
      </option>
    </select>
  </div>
            <div class="items-end">
              <Label for="model_year"  class="text-right text-sm">
               Quantity
              </Label>
              <input type="text" min="0" v-model="formData.quantity" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>
          <!-- Original Fields -->
          <div class="grid grid-cols-2 gap-4">
            <div class="items-end">
              <Label for="name" class="text-right text-lg">
                Name <span class="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                v-model="formData.name"
                placeholder="Enter Name"
                required
              />
            </div>
            <div class="items-end">
              <Label for="email" class="text-right text-lg">
                Email <span class="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                v-model="formData.email"
                placeholder="Enter Email"
                type="email"
                required
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="items-end">
              <Label for="phone_number" class="text-right text-lg">
                Contact Number
              </Label>
              <Input
                id="phone_number"
                v-model="formData.phone_number"
                placeholder="Enter Contact Number"
              />
            </div>
            <div class="items-end">
              <Label for="company_details" class="text-right text-lg">
                Company Details
              </Label>
              <Input
                id="company_details"
                v-model="formData.company_details"
                placeholder="Enter Company Details"
              />
            </div>
          </div>

          <div class="items-end">
            <Label for="requirement" class="text-right text-lg">
              Brief Project Details<span class="text-red-500">*</span>
            </Label>
            <Textarea
              id="requirement"
              v-model="formData.requirement"
              placeholder="Type your message here."
              required
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose as-child>
            <Button
              type="button"
              variant="secondary"
              class="border my-1 border-gray-400 hover:bg-gray-200 rounded"
              @click="resetForm"
            >
              Close
            </Button>
          </DialogClose>
          <Button
            type="submit"
            class="bg-green-600 my-1 text-white rounded border-none hover:bg-green-400"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting"> Submitting... </span>
            <span v-else> Submit </span>
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast/use-toast";
import { useAuthStore } from "@/stores/authStore";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const { toast } = useToast();
const isSubmitting = ref(false);
const brands = ref([]);
const products = ref([]);

const checkAuth = () => {
  if (!authStore.isAuthenticated) {
    router.push("/login?redirect=" + encodeURIComponent(route.fullPath));
    return false;
  }
  return true;
};

// Fetch brands
const fetchBrands = async () => {
  try {
    // isLoading.value.brands = true;
    const response = await useApi("active-brand", { method: "GET" });
    brands.value = response.data || [];
  } catch (error) {
    console.error("Failed to fetch brands:", error);
    showToast("Failed to load brands", "error");
  } finally {
    // isLoading.value.brands = false;
  }
};

// Fetch products
const fetchProducts = async () => {
  try {
    // isLoading.value.products = true;
    const response = await useApi("product", { method: "GET" });
    products.value = response.data || [];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    showToast("Failed to load products", "error");
  } finally {
    // isLoading.value.products = false;
  }
};


// JSON data for dropdowns
// const industries = [
//   {
//     id: 1,
//     name: "Hospitality Industry",
//   },
//   {
//     id: 2,
//     name: "Healthcare Industry",
//   },
//   {
//     id: 3,
//     name: "Restaurant & Entertainment Industry",
//   },
//   {
//     id: 4,
//     name: "Enterprise Industry",
//   },
//   {
//     id: 5,
//     name: "Local Government Sector",
//   },
//   {
//     id: 6,
//     name: "Education Sector",
//   },
// ];

const types = [
  {
    id: 1,
    name: "Hotel Development",
  },
  {
    id: 2,
    name: "Hospitality",
  },
  {
    id: 3,
    name: "Telephone System",
  },
  {
    id: 4,
    name: "Healthcare",
  },
  {
    id: 5,
    name: "Structured Cabling",
  },
  {
    id: 6,
    name: "Restaurant",
  },
  {
    id: 7,
    name: "TVs and Displays",
  },
  {
    id: 8,
    name: "Enterprise IT Equipment",
  },
  {
    id: 9,
    name: "Local Government Wi-Fi Solution",
  },
  {
    id: 10,
    name: "Education Surveillance System",
  },
  {
    id: 11,
    name: "Furniture",
  },
  {
    id: 12,
    name: "Website Development",
  },
  {
    id: 13,
    name: "Software Resale and Support",
  },
];

const manufacturers = [
  {
    id: 1,
    name: "Samsung",
  },
  {
    id: 2,
    name: "LG",
  },
  {
    id: 3,
    name: "Cisco",
  },
  {
    id: 4,
    name: "HP",
  },
  {
    id: 5,
    name: "Dell",
  },
  {
    id: 6,
    name: "Lenovo",
  },
  {
    id: 7,
    name: "Panasonic",
  },
  {
    id: 8,
    name: "Sony",
  },
  {
    id: 9,
    name: "Polycom",
  },
  {
    id: 10,
    name: "Avaya",
  },
  {
    id: 11,
    name: "Mitel",
  },
  {
    id: 12,
    name: "Yealink",
  },
  {
    id: 13,
    name: "Grandstream",
  },
];

const modelYears = ["2025", "2024", "2023", "2022", "2021", "2020"];

const specifications = [
  {
    id: 1,
    name: '55" 4K UHD Display',
  },
  {
    id: 2,
    name: '65" 8K QLED Display',
  },
  {
    id: 3,
    name: '48" Full HD Display',
  },
  {
    id: 4,
    name: "24-Port Gigabit Switch",
  },
  {
    id: 5,
    name: "16-Port PoE Switch",
  },
  {
    id: 6,
    name: "Wi-Fi 6 Access Point",
  },
  {
    id: 7,
    name: "1080p Surveillance Camera",
  },
  {
    id: 8,
    name: "4K PTZ Camera",
  },
  {
    id: 9,
    name: "8-Core 3.2GHz Processor",
  },
  {
    id: 10,
    name: "16GB RAM, 512GB SSD",
  },
  {
    id: 11,
    name: "32GB RAM, 1TB SSD",
  },
  {
    id: 12,
    name: "Modular Furniture Set",
  },
  {
    id: 13,
    name: "Ergonomic Office Chair",
  },
];

const industries = [
  {
    id: 1,
    name: "Entertainment Leisure and Hospitality"
  },
  {
    id: 2,
    name: "Health Care Technology"
  },
  {
    id: 3,
    name: "Architecture, Engineering and Construction"
  },
  {
    id: 4,
    name: "Consumer Goods and Packaging"
  },
  {
    id: 5,
    name: "Information Technology"
  },
  {
    id: 6,
    name: "Automotive, transportation and Mobility"
  },
  // {
  //   id: 7,
  //   name: "Government/Military"
  // },
  {
    id: 8,
    name: "Aerospace and Defense"
  },
]

const subindustries = [
  // Hospitality sub-industries
  {
    id: 101,
    name: "Hotels",
    industryId: 1
  },
  // {
  //   id: 102,
  //   name: "Restaurants",
  //   industryId: 1
  // },
  {
    id: 102,
    name: "Park",
    industryId: 1
  },
  
  // Healthcare sub-industries

  {
    id: 201,
    name: "Hospital",
    industryId: 2
  },
  {
    id: 202,
    name: "Ambulatory Services",
    industryId: 2
  },
  {
    id: 203,
    name: "Dentist",
    industryId: 2
  },
  {
    id: 204,
    name: "Fitness and Recreation Center",
    industryId: 2
  },
  {
    id: 205,
    name: "Health and Personal Care Wholesale",
    industryId: 2
  },
  {
    id: 206,
    name: "Medical Equipment and Supplies",
    industryId: 2
  },
  {
    id: 207,
    name: "Nursing and Residential Care",
    industryId: 2
  },
  {
    id: 208,
    name: "Outpatient Care",
    industryId: 2
  },
  {
    id: 209,
    name: "Pharmaceutical Manufacturing",
    industryId: 2
  },
  {
    id: 210,
    name: "Pharmacies and Personal Care Stores",
    industryId: 2
  },
  {
    id: 211,
    name: "Physicians and Health Practitioners",
    industryId: 2
  },
  
  // Manufacturing sub-industries
  {
    id: 301,
    name: "Architecture Systems",
    industryId: 3
  },
  {
    id: 302,
    name: "Engineering Systems",
    industryId: 3
  },
  {
    id: 303,
    name: "CBM",
    industryId: 3
  },
  {
    id: 304,
    name: "RE",
    industryId: 3
  },
  {
    id: 305,
    name: "RL",
    industryId: 3
  },
  
  // Retail sub-industries
  {
    id: 401,
    name: "Consumer Goods Rental",
    industryId: 4
  },
  {
    id: 402,
    name: "Death Care Services",
    industryId: 4
  },
  {
    id: 403,
    name: "Fitness and Recreation Centers",
    industryId: 4
  },
  {
    id: 404,
    name: "Hotels and Accommodation",
    industryId: 4
  },
  {
    id: 405,
    name: "Laundry Service",
    industryId: 4
  },
  {
    id: 406,
    name: "Personal Care Services",
    industryId: 4
  },
  {
    id: 407,
    name: "Photofinishing",
    industryId: 4
  },
  {
    id: 408,
    name: "Travel and Reservation Services",
    industryId: 4
  },
  
  // Technology sub-industries
  {
    id: 501,
    name: "Engineering Software",
    industryId: 5
  },
  {
    id: 502,
    name: "Telecom Software",
    industryId: 5
  },
  {
    id: 503,
    name: "Healthcare Software",
    industryId: 5
  },
  {
    id: 504,
    name: "Training Simulator",
    industryId: 5
  },
  // {
  //   id: 505,
  //   name: "Manufacturing Software",
  //   industryId: 5
  // },
  // {
  //   id: 506,
  //   name: "Automotive Software",
  //   industryId: 5
  // },
  // {
  //   id: 507,
  //   name: "Government Software",
  //   industryId: 5
  // },
  
  // Education sub-industries
  {
    id: 601,
    name: "Drive Train",
    industryId: 6
  },
  {
    id: 602,
    name: "Interior",
    industryId: 6
  },
  {
    id: 603,
    name: "Systems",
    industryId: 6
  },
  {
    id: 604,
    name: "Body",
    industryId: 6
  },
  {
    id: 605,
    name: "Air Transportation Service",
    industryId: 6
  },
  {
    id: 606,
    name: "Mass Transit and Ground Passenger Transportation",
    industryId: 6
  },
  {
    id: 607,
    name: "Motor Vehicle Manufacturer",
    industryId: 6
  },
  {
    id: 608,
    name: "Railroad Transportation",
    industryId: 6
  },
  {
    id: 609,
    name: "Motor Vehicle and Part Dealer",
    industryId: 6
  },
  
  // Construction sub-industries
  // {
  //   id: 701,
  //   name: "Residential",
  //   industryId: 7
  // },
  // {
  //   id: 702,
  //   name: "Commercial",
  //   industryId: 7
  // },
  // {
  //   id: 703,
  //   name: "Industrial",
  //   industryId: 7
  // },
  
  // Financial Services sub-industries
  {
    id: 801,
    name: "Defence Systems",
    industryId: 8
  },
  {
    id: 802,
    name: "Space Systems",
    industryId: 8
  },
  {
    id: 803,
    name: "Military Aircraft",
    industryId: 8
  },
  {
    id: 804,
    name: "Commercial Aircraft",
    industryId: 8
  },
  {
    id: 805,
    name: "Airlines",
    industryId: 8
  },
]

const modelNumbers = [
  {
    "id": 1,
    "model_number": "HG40NF693GFXZA",
    "category": "Television"
  },
  {
    "id": 2,
    "model_number": "HG43NF693GFXZA",
    "category": "Television"
  },
  {
    "id": 3,
    "model_number": "HG49NF693GFXZA",
    "category": "Television"
  },
  {
    "id": 4,
    "model_number": "HG32NF693GFXZA",
    "category": "Television"
  },
  {
    "id": 5,
    "model_number": "43UR340C9UD",
    "category": "Monitor"
  },
  {
    "id": 6,
    "model_number": "55US660H9UA",
    "category": "Television"
  },
  {
    "id": 7,
    "model_number": "50US660H9UA",
    "category": "Television"
  },
  {
    "id": 8,
    "model_number": "MPF-S22V",
    "category": "Projector"
  },
  {
    "id": 9,
    "model_number": "PLCM-UM-CP",
    "category": "Conference System"
  },
  {
    "id": 10,
    "model_number": "Dahua- 32 Channel Digital Video Recorder DVR",
    "category": "Security"
  },
  {
    "id": 11,
    "model_number": "Denon Pro DN-350UI",
    "category": "Audio"
  },
  {
    "id": 12,
    "model_number": "Denon DN-474A",
    "category": "Audio"
  },
  {
    "id": 13,
    "model_number": "MCD770B",
    "category": "Audio"
  },
  {
    "id": 14,
    "model_number": "MCD770CB",
    "category": "Audio"
  },
  {
    "id": 15,
    "model_number": "MCD770CR",
    "category": "Audio"
  }
]



const formData = ref({
  industry: "",
  subindustry: "",
  brand_id: "", 
  product_id: "",
  specs: "",
  model_number: "",
  quantity: "",
  name: authStore.user?.name || "",
  email: authStore.user?.email || "",
  phone_number: authStore.user?.phone_number || "",
  company_details: "",
  requirement: "",
  status: "0", // Default status
});

const selectedModel = computed({
  get: () => formData.value.model_number,
  set: (value) => formData.value.model_number = value
});

const filteredSubindustries = computed(() => {
  if (!formData.value.industry) return [];

  const selectedIndustry = industries.find(
    (ind) => ind.name === formData.value.industry
  );

  if (!selectedIndustry) return [];

  return subindustries.filter(
    (sub) => sub.industryId === selectedIndustry.id
  );
});

watch(() => formData.value.industry, (newVal) => {
  formData.value.subindustry = ''
})
const resetForm = () => {
  formData.value = {
    industry: "",
    subindustry: "",
    brand_id: "",
    product_id: "",
    specs: "",
    model_number: "",
    quantity: "",
    name: authStore.user?.name || "",
    email: authStore.user?.email || "",
    phone_number: authStore.user?.phone_number || "",
    company_details: "",
    requirement: "",
    
  };
};

const submitQuote = async () => {
  if (!checkAuth()) return;

  try {
    isSubmitting.value = true;

    // Basic validation (unchanged)
    if (
      !formData.value.industry ||
      !formData.value.product_id ||
      !formData.value.name ||
      !formData.value.email ||
      !formData.value.requirement
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Email validation (unchanged)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.value.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    // **Look up industry and subindustry names**
    const industryName = industries.find(i => i.id === formData.value.industry)?.name || "";
    const subindustryName = subindustries.find(s => s.id === formData.value.subindustry)?.name || "";

    // **Create a modified payload with names instead of IDs**
    const payload = {
  ...formData.value,
  industry: formData.value.industry, // Ensure these are included
  subindustry: formData.value.subindustry,
};

    // Submit to API (using payload instead of formData.value)
    const response = await useApi("quote", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Success handling (unchanged)
    toast({
      title: "Success",
      description: "Your quote request has been submitted successfully!",
      variant: "default",
    });

    resetForm();
  } catch (error) {
    console.error("Error submitting quote:", error);
    toast({
      title: "Error",
      description: "Failed to submit quote request. Please try again.",
      variant: "destructive",
    });
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  fetchBrands();
  fetchProducts();
});
</script>

<style scoped>
/* Add any custom styles here */
</style>
