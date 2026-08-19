<script setup>
import { computed, ref } from 'vue'
import { useMainStore } from '@/stores/main'
import { mdiEye, mdiTrashCan } from '@mdi/js'
import CardBoxModal from '@/components/CardBoxModal.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import UserAvatar from '@/components/UserAvatar.vue'

defineProps({
  checkable: Boolean
})

const mainStore = useMainStore()

const items = computed(() => mainStore.clients)

const isModalActive = ref(false)

const isModalDangerActive = ref(false)

const perPage = ref(5)

const currentPage = ref(0)

// const checkedRows = ref([])

// const itemsPaginated = computed(() =>
//   items.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
// )

const numPages = computed(() => Math.ceil(items.value.length / perPage.value))

const currentPageHuman = computed(() => currentPage.value + 1)

const pagesList = computed(() => {
  const pagesList = []

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i)
  }

  return pagesList
})

// const remove = (arr, cb) => {
//   const newArr = []

//   arr.forEach((item) => {
//     if (!cb(item)) {
//       newArr.push(item)
//     }
//   })

//   return newArr
// }

// const checked = (isChecked, client) => {
//   if (isChecked) {
//     checkedRows.value.push(client)
//   } else {
//     checkedRows.value = remove(checkedRows.value, (row) => row.id === client.id)
//   }
// }

const timeCard = ref([
  {
    id: '1',
    date: 'Mar 10, 2024',
    project: 'Idl-Masjid',
    start_time: '07:00pm',
    end_time: '03:30am',
    break_time: '30 mins',
    total: '8 Hours'
  },
  {
    id: '2',
    date: 'Mar 2, 2024',
    project: 'Idl-Masjid',
    start_time: '07:00pm',
    end_time: '03:30am',
    break_time: '30 mins',
    total: '8 Hours'
  },
  {
    id: '3',
    date: 'Mar 3, 2024',
    project: 'Idl-Masjid',
    start_time: '07:00pm',
    end_time: '03:30am',
    break_time: '30 mins',
    total: '8 Hours'
  },
  {
    id: '4',
    date: 'Mar 4, 2024',
    project: 'Idl-Masjid',
    start_time: '07:00pm',
    end_time: '03:30am',
    break_time: '30 mins',
    total: '8 Hours'
  },
  {
    id: '5',
    date: 'Mar 5, 2024',
    project: 'Idl-Masjid',
    start_time: '07:00pm',
    end_time: '03:30am',
    break_time: '30 mins',
    total: '8 Hours'
  }
])
</script>

<template>
  <CardBoxModal v-model="isModalActive" title="Sample modal">
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal>

  <CardBoxModal v-model="isModalDangerActive" title="Please confirm" button="danger" has-cancel>
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal>

  <table>
    <thead>
      <tr>
        <!-- <th v-if="checkable" /> -->
        <!-- <th /> -->
        <th>Date</th>
        <!-- <th>Project</th> -->
        <th>Start Time</th>
        <th>End Time</th>
        <th>Break Time</th>
        <th>Total Hours</th>
        <!-- <th>Action</th> -->
      </tr>
    </thead>
    <tbody>
      <tr v-for="time in timeCard" :key="time.id">
        <!-- <TableCheckboxCell v-if="checkable" @checked="checked($event, client)" /> -->
        <!-- <td class="border-b-0 lg:w-6 before:hidden">
          <UserAvatar :username="client.name" class="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
        </td> -->
        <td data-label="Date">
          {{ time.date }}
        </td>
        <!-- <td data-label="Project">
          {{ time.project }}
        </td> -->
        <td data-label="Start Time">
          {{ time.start_time }}
        </td>
        <td data-label="End Time">
          {{ time.end_time }}
        </td>
        <td data-label="End Time">
          {{ time.break_time }}
        </td>
        <td data-label="Total">
          {{ time.total }}
        </td>
        <!-- <td data-label="Progress" class="lg:w-32">
          <progress class="flex w-2/5 self-center lg:w-full" max="100" :value="client.progress">
            {{ client.progress }}
          </progress>
        </td> -->
        <!-- <td data-label="Created" class="lg:w-1 whitespace-nowrap">
          <small class="text-gray-500 dark:text-slate-400" :title="client.created">{{
            client.created
          }}</small>
        </td> -->
        <!-- <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton color="info" :icon="mdiEye" small @click="isModalActive = true" />
            <BaseButton
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="isModalDangerActive = true"
            />
          </BaseButtons>
        </td> -->
      </tr>
    </tbody>
  </table>
  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
    <BaseLevel>
      <BaseButtons>
        <BaseButton
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          :color="page === currentPage ? 'lightDark' : 'whiteDark'"
          small
          @click="currentPage = page"
        />
      </BaseButtons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </BaseLevel>
  </div>
</template>
