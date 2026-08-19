<template>
  <div class="w-full md:w-11/12 mx-auto pt-3 md:pt-6 px-3 md:px-10 space-y-4 min-h-screen">
    <!-- HEADER - Mobile Optimized -->
    <div
      class="bg-gradient-to-r from-cyan-500 to-sky-500 rounded-xl md:rounded-2xl px-3 md:px-6 py-2 md:py-2 shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
    >
      <div class="flex items-center gap-2 md:gap-4 w-full md:w-auto">
        <div class="w-8 h-8 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow text-lg md:text-2xl">
          ⏱️
        </div>
        <div class="flex-1">
          <h2 class="text-lg md:text-2xl font-semibold text-white">Weekly Timecard</h2>
          <p class="text-xs md:text-sm text-cyan-100">Today: {{ todayFormatted }}</p>
        </div>
      </div>
      
      <!-- Mobile View Controls -->
      <div class="flex flex-col md:flex-row justify-center items-start md:items-center gap-2 md:gap-4 w-full md:w-auto">
        <select v-model="selectedRange" class="rounded py-1 px-2 text-sm w-full md:w-auto" @change="onRangeChange">
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>

        <div class="flex items-center gap-2 w-full md:w-auto">
          <button class="px-3 md:px-4 py-1 bg-gray-200 rounded text-sm" @click="changeWeek(-1)">
            ◀ Prev
          </button>

          <span class="font-semibold px-2 rounded p-1 bg-slate-100 text-xs md:text-sm truncate">
            {{ weekRangeLabel }}
          </span>

          <button class="px-3 md:px-4 py-1 bg-gray-200 rounded text-sm" @click="changeWeek(1)">
            Next ▶
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Summary Cards (Visible only on mobile) -->
    <div class="md:hidden grid grid-cols-2 gap-2">
      <div class="bg-white rounded-lg p-3 shadow border-l-4 border-blue-500">
        <div class="text-xs text-gray-500">Total Hours</div>
        <div class="text-xl font-bold">
          {{ Object.values(totalTimeByDate).reduce((acc, curr) => acc + curr.hours, 0) }}h
        </div>
      </div>
      <div class="bg-white rounded-lg p-3 shadow border-l-4 border-green-500">
        <div class="text-xs text-gray-500">Days Present</div>
        <div class="text-xl font-bold">{{ Object.keys(attendanceByDate).length }}</div>
      </div>
    </div>

    <!-- TABLE - Desktop Horizontal Scroll, Mobile Card Layout -->
    <div
      class="relative w-full overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-300"
      :class="{ 'hidden md:block': true }"
    >
      <!-- Desktop Table View (Unchanged) -->
      <table class="min-w-max border-collapse text-xs">
        <!-- GROUP HEADER -->
        <thead>
          <tr class="text-center font-bold">
            <th colspan="4" class="border p-2 bg-blue-50">Login / Logout</th>
            <th colspan="8" class="border p-2 bg-green-50">Task / Work Entry</th>
            <th colspan="3" class="border p-2 bg-purple-50">Approval</th>
          </tr>

          <!-- COLUMN HEADER -->
          <tr v-if="authStore.role == 'developer'">
            <th class="border p-2 bg-blue-50">Day</th>
            <th class="border p-2 bg-blue-50">Date</th>
            <th class="border p-2 bg-blue-50">Login / Logout</th>
            <th class="border p-2 bg-blue-50 text-nowrap">
              Total Login <br />
              Time
            </th>

            <th class="border p-2 bg-green-50">Product</th>
            <th class="border p-2 bg-green-50">Module</th>
            <th class="border p-2 bg-green-50">Major Task Name</th>
            <th class="border p-2 bg-green-50">Major Sub-Task Name</th>
            <th class="border p-2 bg-green-50">Description</th>
            <th class="border p-2 bg-green-50">Output</th>
            <th class="border p-2 bg-green-50">Hours</th>
            <th class="border p-2 bg-green-50">Minutes</th>
            <th class="border p-2 bg-green-50">Save</th>

            <th class="border p-2 bg-purple-50">Employee</th>
            <th class="border p-2 bg-purple-50">Manager</th>
            <th class="border p-2 bg-purple-50">HR</th>
          </tr>

          <tr v-else>
            <th class="border p-2 bg-blue-50">Day</th>
            <th class="border p-2 bg-blue-50">Date</th>
            <th class="border p-2 bg-blue-50">Login / Logout</th>
            <th class="border p-2 bg-blue-50 text-nowrap">
              Total Login <br />
              Time
            </th>
            <th class="border p-2 bg-green-50">Department</th>
            <!-- <th class="border p-2 bg-green-50">Account</th> -->
            <th class="border p-2 bg-green-50">Task Type</th>
            <th class="border p-2 bg-green-50">Task Name</th>
            <th class="border p-2 bg-green-50">Description</th>
            <th class="border p-2 bg-green-50">Output</th>
            <th class="border p-2 bg-green-50">Hours</th>
            <th class="border p-2 bg-green-50">Minutes</th>
            <th class="border p-2 bg-green-50">Save</th>

            <th class="border p-2 bg-purple-50">Employee</th>
            <th class="border p-2 bg-purple-50">Manager</th>
            <th class="border p-2 bg-purple-50">HR</th>
          </tr>
        </thead>

        <tbody>
          <template v-for="day in days" :key="day.date">
            <tr
              v-for="(entry, index) in entriesByDate[day.date] || [{}]"
              :key="index"
              :class="
                !isToday(day.date)
                  ? 'opacity-50 pointer-events-none'
                  : '' || todayRingClass(day.date)
              "
            >
              <!-- DAY -->
              <td
                v-if="index === 0"
                :rowspan="entriesByDate[day.date]?.length || 1"
                class="border p-2 font-semibold"
              >
                {{ day.name }}
              </td>

              <!-- DATE -->
              <td
                v-if="index === 0"
                :rowspan="entriesByDate[day.date]?.length || 1"
                class="border p-2 w-22"
              >
                {{ day.date }}
              </td>

              <!-- LOGIN / LOGOUT -->
              <td
                v-if="index === 0"
                :rowspan="entriesByDate[day.date]?.length || 1"
                class="border p-2 space-y-2 w-36"
              >
                <button
                  v-if="isToday(day.date)"
                  class="w-full py-1 rounded text-white font-semibold"
                  :class="
                    attendanceByDate[day.date]?.some((t) => !t.logout_time)
                      ? 'bg-red-500'
                      : 'bg-emerald-600'
                  "
                  :disabled="attendanceLoading || saveLoadingByDate[day.date]"
                   @click="toggleLogin(day.date)"
                >
                  <span v-if="attendanceLoading">Loading...</span>
                  <span v-else-if="loginLoading[day.date]">Processing...</span>
                  <span v-else>
                    {{
                      attendanceByDate[day.date]?.some((t) => !t.logout_time) ? 'Logout' : 'Login'
                    }}
                  </span>
                </button>

                <span
                  class="text-center flex flex-col items-center text-xs text-red-600"
                  v-if="!attendanceByDate[day.date]?.length"
                >
                  Absent
                </span>

                <div
                  v-for="log in attendanceByDate[day.date] || []"
                  :key="log.login_time"
                  class="text-center flex flex-col items-center text-xs"
                >
                  <span class="text-green-600">Login: {{ log.login_time }}</span>
                  <span v-if="log?.logout_time" class="text-red-600">Logout: {{ log.logout_time }}</span>
                  <span v-else class="text-red-600 text-xs">Logout: Not logged out</span>
                </div>
              </td>
              <td
                v-if="index === 0"
                :rowspan="entriesByDate[day.date]?.length || 1"
                class="border p-2 text-center"
              >
                <div class="font-semibold">
  {{ totalLoginTimeByDate[day.date] || '00 Hours 00 Min' }}
</div>
              </td>

              <!-- TASK / WORK ENTRY (API DATA + INPUTS) -->
              <td v-if="authStore.role != 'developer'" class="border p-1 w-10">
                <div v-if="timesByDate[day.date]?.length" class="space-y-1 mb-2">
                  <div
                    v-for="(t, i) in timesByDate[day.date]"
                    :key="i"
                    class="gap-1 bg-gray-50 p-1 rounded"
                  >
                    <div class="border rounded truncate">{{ t.type_of_work }}</div>
                  </div>
                </div>
                <div :class="timesByDate[day.date]?.length == 0 ? 'py-0' : 'py-7'"></div>
                <div class="gap-1">
                  <select
                    v-model="getRowForm(day.date).workTypeId"
                    class="w-full border rounded text-xs px-2 py-1"
                    :disabled="!isToday(day.date)"
                  >
                    <option value="" selected disabled>Select Dept.</option>
                    <option v-for="w in workTypes" :key="w.id" :value="w.id">
                      {{ w.name }}
                    </option>
                  </select>
                </div>
              </td>
              
              <!-- <td v-if="authStore.role != 'developer'" class="border p-1">
                <div v-if="timesByDate[day.date]?.length" class="space-y-1 mb-2">
                  <div
                    v-for="(t, i) in timesByDate[day.date]"
                    :key="i"
                    class="grid gap-1 bg-gray-50 p-1 rounded"
                  >
                    <div class="truncate border rounded">{{ t.account?.name || '—' }}</div>
                  </div>
                </div>
                <div :class="timesByDate[day.date]?.length == 0 ? 'py-0' : 'py-7'"></div>
                <div class="grid gap-1">
                  <select
                    v-model="getRowForm(day.date).record_id"
                    class="w-full border rounded text-xs px-2 py-1"
                    :disabled="!isToday(day.date)"
                  >
                    <option value="" selected disabled>Select Account</option>
                    <option v-for="r in recordList" :key="r.id" :value="r.id">
                      {{ r.values?.find((v) => v.field?.label === 'Company Name')?.value }}
                    </option>
                  </select>
                </div>
              </td> -->

              <!-- TASK / WORK ENTRY (API DATA + INPUTS) -->
              <td v-if="authStore.role != 'developer'" class="border p-1">
                <!-- SAVED TIMES (API DATA) -->
                <div v-if="timesByDate[day.date]?.length" class="space-y-1 mb-2">
                  <div
                    v-for="(t, i) in timesByDate[day.date]"
                    :key="i"
                    class="gap-1 bg-gray-50 p-1 rounded"
                  >
                    <div class="border rounded truncate">{{ t?.activity || '—' }}</div>
                  </div>
                </div>
                <div :class="timesByDate[day.date]?.length == 0 ? 'py-0' : 'py-7'"></div>
                <!-- INPUT ROW (UNCHANGED LOGIC) -->
                <div class="gap-1">
                  <!-- ACTIVITY -->
                  <select
                    v-model="getRowForm(day.date).activity"
                    class="w-full border rounded px-2 py-1 text-xs"
                    :disabled="!isToday(day.date)"
                  >
                    <option value="" selected disabled>Select Task Type</option>
                    <option v-for="a in selectedWorkType(day.date)?.activities || []" :key="a">
                      {{ a }}
                    </option>
                  </select>
                </div>
              </td>
              <td v-if="authStore.role == 'developer'" class="border p-1">
                <!-- SAVED TIMES (API DATA) -->
                <div v-if="timesByDate[day.date]?.length" class="space-y-1 mb-2">
                  <div
                    v-for="(t, i) in timesByDate[day.date]"
                    :key="i"
                    class="gap-1 bg-gray-50 p-1 rounded"
                  >
                    <div class="border rounded truncate">{{ t?.major_task || '—' }}</div>
                  </div>
                </div>
                <div :class="timesByDate[day.date]?.length == 0 ? 'py-0' : 'py-7'"></div>
                <!-- INPUT ROW (UNCHANGED LOGIC) -->
                <div class="gap-1">
                  <!-- ACTIVITY -->
                  <select
                    v-model="getRowForm(day.date).major_task"
                    class="w-full border rounded px-2 py-1 text-xs"
                    :disabled="!isToday(day.date)"
                    required
                  >
                    <option value="" disabled>Select Major Task Name</option>
                    <option v-for="task in majorTasks" :key="task.name" :value="task.name">
                      {{ task.name }}
                    </option>
                  </select>
                </div>
              </td>

              <!-- TASK / WORK ENTRY (API DATA + INPUTS) -->
              <td v-if="authStore.role != 'developer'" class="border p-1">
                <div v-if="timesByDate[day.date]?.length" class="space-y-1 mb-2">
                  <div
                    v-for="(t, i) in timesByDate[day.date]"
                    :key="i"
                    class="gap-1 bg-gray-50 p-1 rounded"
                  >
                    <div class="border rounded truncate">{{ t?.task_summary || '—' }}</div>
                  </div>
                </div>
                <div :class="timesByDate[day.date]?.length == 0 ? 'py-0' : 'py-7'"></div>
                <div class="gap-1">
                  <input
                    type="text"
                    placeholder="task name"
                    v-model="getRowForm(day.date).task_name"
                    class="w-full border rounded px-2 py-1 text-center text-xs"
                    :disabled="!isToday(day.date)"
                  />
                </div>
              </td>

              <!-- TASK / WORK ENTRY (API DATA + INPUTS) -->
              <td class="border p-1">
                <!-- SAVED TIMES (API DATA) -->
                <div v-if="timesByDate[day.date]?.length" class="space-y-1 mb-2">
                  <div
                    v-for="(t, i) in timesByDate[day.date]"
                    :key="i"
                    class="gap-1 bg-gray-50 p-1 rounded"
                  >
                    <div class="border rounded truncate">{{ t?.description || '—' }}</div>
                  </div>
                </div>
                <div :class="timesByDate[day.date]?.length == 0 ? 'py-0' : 'py-7'"></div>
                <!-- INPUT ROW (UNCHANGED LOGIC) -->
                <div class="gap-1">
                  <!-- Description -->
                  <input
                    type="text"
                    rows="2"
                    placeholder="description"
                    v-model="getRowForm(day.date).description"
                    class="w-full border rounded px-2 py-1 text-center text-xs"
                    :disabled="!isToday(day.date)"
                  />
                </div>
              </td>

              <!-- TASK / WORK ENTRY (API DATA + INPUTS) -->
              <td class="border p-1">
                <!-- SAVED TIMES (API DATA) -->
                <div v-if="timesByDate[day.date]?.length" class="space-y-1 mb-2">
                  <div
                    v-for="(t, i) in timesByDate[day.date]"
                    :key="i"
                    class="gap-1 bg-gray-50 p-1 rounded"
                  >
                    <div class="border rounded truncate">{{ t?.output_summary || '—' }}</div>
                  </div>
                </div>
                <div :class="timesByDate[day.date]?.length == 0 ? 'py-0' : 'py-7'"></div>
                <!-- INPUT ROW (UNCHANGED LOGIC) -->
                <div class="gap-1">
                  <!-- Output -->
                  <input
                    type="text"
                    placeholder="output"
                    v-model="getRowForm(day.date).output"
                    class="w-full border rounded px-2 py-1 text-center text-xs"
                    :disabled="!isToday(day.date)"
                  />
                </div>
              </td>

              <!-- TASK / WORK ENTRY (API DATA + INPUTS) -->
              <td class="border p-1" colspan="2">
                <!-- SAVED TIMES (API DATA) -->
                <div v-if="timesByDate[day.date]?.length" class="space-y-1 mb-2">
                  <div
                    v-for="(t, i) in timesByDate[day.date]"
                    :key="i"
                    class="grid grid-cols-2 gap-1 bg-gray-50 p-1 rounded"
                  >
                    <!-- HOURS -->
                    <div class="text-center border rounded flex items-center justify-center">
                      {{ t.hour || 0 }} Hours
                    </div>

                    <!-- MINUTES -->
                    <div class="text-center border rounded flex items-center justify-center">
                      {{ (t.minute || 0).toString().padStart(2, '0') }} Minutes
                    </div>
                  </div>

                  <!-- TOTAL -->
                  <div class="w-full flex items-center justify-center mt-2 font-semibold">
                    Total
                  </div>

                  <div class="grid grid-cols-2 gap-1 bg-red-100 p-1 rounded font-semibold">
                    <div class="text-center border border-red-600 rounded">
                      {{ totalTimeByDate[day.date]?.hours || 0 }} Hours
                    </div>
                    <div class="text-center border border-red-600 rounded">
                      {{
                        totalTimeByDate[day.date]?.minutes?.toString().padStart(2, '0') || '00'
                      }}
                      Minutes
                    </div>
                  </div>
                </div>

                <!-- INPUT ROW (UNCHANGED LOGIC) -->
                <div class="grid grid-cols-2 gap-1 mt-2">
                  <!-- HOURS -->
                  <input
                    type="number"
                    min="0"
                    placeholder="hours"
                    v-model="getRowForm(day.date).hours"
                    class="w-full border rounded px-2 py-1 text-center text-xs"
                    :disabled="!isToday(day.date)"
                  />

                  <!-- MINUTES -->
                  <input
                    type="number"
                    min="0"
                    max="59"
                    placeholder="minutes"
                    v-model="getRowForm(day.date).minutes"
                    class="w-full border rounded px-2 py-1 text-center text-xs"
                    :disabled="!isToday(day.date)"
                  />
                </div>
              </td>

              <!-- TASK / WORK ENTRY (API DATA + INPUTS) -->
              <td class="border p-1">
                <div class="gap-1 w-[100px]">
                  <!-- SAVE -->
                  <button
                    class="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded disabled:opacity-20 w-full"
                    :disabled="
                      !isToday(day.date) || attendanceLoading || saveLoadingByDate[day.date]
                    "
                    @click="submitEntry(day.date)"
                  >
                    <span v-if="saveLoadingByDate[day.date]">Saving...</span>
                    <span v-else>Save</span>
                  </button>
                </div>
              </td>

              <!-- APPROVALS -->
              <!-- EMPLOYEE -->
              <td class="border text-center">
                <div class="flex flex-col items-center justify-around gap-1">
                  <span
                    class="border px-1 rounded"
                    :class="
                      getDayApprovals(entriesByDate[day.date]?.[0])?.employee
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    "
                  >
                    {{
                      getDayApprovals(entriesByDate[day.date]?.[0])?.employee
                        ? 'Approved'
                        : 'Pending'
                    }}
                  </span>

                  <!-- Approve button -->
                  <button
                    v-if="
                      entriesByDate[day.date]?.[0]?.id && entriesByDate[day.date][0].status === '0'
                    "
                    class="bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-1 rounded text-xs"
                    :disabled="attendanceLoadingById[entriesByDate[day.date][0].id]"
                    @click="approveEmployee(entriesByDate[day.date][0], day.date)"
                  >
                    <span v-if="attendanceLoadingById[entriesByDate[day.date][0].id]"
                      >Approving...</span
                    >
                    <span v-else>Approve</span>
                  </button>
                </div>
              </td>

              <!-- MANAGER -->
              <td class="border text-center">
                <span
                  class="border px-1 rounded"
                  :class="
                    getDayApprovals(entriesByDate[day.date]?.[0])?.manager
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  "
                >
                  {{
                    getDayApprovals(entriesByDate[day.date]?.[0])?.manager ? 'Approved' : 'Pending'
                  }}
                </span>
              </td>

              <!-- HR -->
              <td class="border text-center">
                <span
                  class="border px-1 rounded"
                  :class="
                    getDayApprovals(entriesByDate[day.date]?.[0])?.hr
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  "
                >
                  {{ getDayApprovals(entriesByDate[day.date]?.[0])?.hr ? 'Approved' : 'Pending' }}
                </span>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <!-- Mobile Card View (Visible only on mobile) -->
    <div class="md:hidden space-y-4">
      <div v-for="day in days" :key="day.date" class="bg-white rounded-xl shadow-lg overflow-hidden">
        <!-- Day Header -->
        <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3">
          <div class="flex justify-between items-center">
            <div>
              <div class="font-bold text-lg">{{ day.name }}</div>
              <div class="text-sm opacity-90">{{ day.date }}</div>
            </div>
            <div class="text-right">
              <div class="text-sm">Total Login</div>
              <div class="font-bold">{{ totalLoginTimeByDate[day.date] || '00:00' }}</div>
            </div>
          </div>
        </div>

        <!-- Login/Logout Section -->
        <div class="p-4 border-b bg-gray-50">
          <div class="flex items-center justify-between">
            <div>
              <div v-if="attendanceByDate[day.date]?.length" class="space-y-1">
                <div v-for="log in attendanceByDate[day.date]" :key="log.login_time" class="text-sm">
                  <span class="text-green-600">Login: {{ log.login_time }}</span>
                  <span v-if="log.logout_time" class="text-red-600 ml-2">Logout: {{ log.logout_time }}</span>
                  <span v-else class="text-red-600 ml-2 text-xs">Active</span>
                </div>
              </div>
              <div v-else class="text-red-600 text-sm">Absent</div>
            </div>
            <button
              v-if="isToday(day.date)"
              class="px-4 py-2 rounded text-white font-semibold text-sm"
              :class="attendanceByDate[day.date]?.some((t) => !t.logout_time) ? 'bg-red-500' : 'bg-emerald-600'"
              :disabled="attendanceLoading || loginLoading[day.date]"
              @click="toggleLogin(day.date)"
            >
              <span v-if="loginLoading[day.date]">...</span>
              <span v-else>
                {{ attendanceByDate[day.date]?.some((t) => !t.logout_time) ? 'Logout' : 'Login' }}
              </span>
            </button>
          </div>
        </div>

        <!-- Tasks Section -->
        <div class="p-4 space-y-4">
          <!-- Saved Tasks -->
          <div v-if="timesByDate[day.date]?.length" class="space-y-3">
            <div class="text-sm font-semibold text-gray-700">Saved Tasks</div>
            <div v-for="(task, idx) in timesByDate[day.date]" :key="idx" 
                 class="bg-gray-50 rounded-lg p-3 space-y-2 border-l-4 border-green-500">
              <div class="grid grid-cols-2 gap-2 text-xs">
                <div><span class="text-gray-500">Dept:</span> {{ task.type_of_work || '—' }}</div>
                <div><span class="text-gray-500">Account:</span> {{ task.account?.name || '—' }}</div>
                <div><span class="text-gray-500">Task:</span> {{ task.task_summary || '—' }}</div>
                <div><span class="text-gray-500">Activity:</span> {{ task.activity || '—' }}</div>
                <div class="col-span-2"><span class="text-gray-500">Desc:</span> {{ task.description || '—' }}</div>
                <div><span class="text-gray-500">Hours:</span> {{ task.hour || 0 }}</div>
                <div><span class="text-gray-500">Mins:</span> {{ task.minute || 0 }}</div>
              </div>
            </div>
          </div>

          <!-- New Task Form -->
          <div v-if="isToday(day.date)" class="space-y-3">
            <div class="text-sm font-semibold text-gray-700">Add New Task</div>
            
            <div class="grid grid-cols-1 gap-3">
              <select v-model="getRowForm(day.date).workTypeId" class="w-full border rounded-lg p-2 text-sm">
                <option value="">Select Department</option>
                <option v-for="w in workTypes" :key="w.id" :value="w.id">{{ w.name }}</option>
              </select>

              <select v-model="getRowForm(day.date).record_id" class="w-full border rounded-lg p-2 text-sm">
                <option value="">Select Account</option>
                <option v-for="r in recordList" :key="r.id" :value="r.id">
                  {{ r.values?.find((v) => v.field?.label === 'Company Name')?.value }}
                </option>
              </select>

              <select v-model="getRowForm(day.date).activity" class="w-full border rounded-lg p-2 text-sm">
                <option value="">Select Task Type</option>
                <option v-for="a in selectedWorkType(day.date)?.activities || []" :key="a">{{ a }}</option>
              </select>

              <input v-model="getRowForm(day.date).task_name" type="text" 
                     placeholder="Task Name" class="w-full border rounded-lg p-2 text-sm">

              <textarea v-model="getRowForm(day.date).description" rows="2"
                        placeholder="Description" class="w-full border rounded-lg p-2 text-sm"></textarea>

              <input v-model="getRowForm(day.date).output" type="text"
                     placeholder="Output" class="w-full border rounded-lg p-2 text-sm">

              <div class="grid grid-cols-2 gap-2">
                <input v-model.number="getRowForm(day.date).hours" type="number" min="0"
                       placeholder="Hours" class="w-full border rounded-lg p-2 text-sm">
                <input v-model.number="getRowForm(day.date).minutes" type="number" min="0" max="59"
                       placeholder="Minutes" class="w-full border rounded-lg p-2 text-sm">
              </div>

              <button @click="submitEntry(day.date)" :disabled="saveLoadingByDate[day.date]"
                      class="bg-emerald-600 text-white py-2 rounded-lg font-semibold">
                <span v-if="saveLoadingByDate[day.date]">Saving...</span>
                <span v-else>Save Task</span>
              </button>
            </div>
          </div>

          <!-- Approvals -->
          <div class="border-t pt-3 grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <div class="text-gray-500">Employee</div>
              <span class="px-2 py-1 rounded" :class="getDayApprovals(entriesByDate[day.date]?.[0])?.employee ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'">
                {{ getDayApprovals(entriesByDate[day.date]?.[0])?.employee ? '✓' : 'Pending' }}
              </span>
            </div>
            <div>
              <div class="text-gray-500">Manager</div>
              <span class="px-2 py-1 rounded" :class="getDayApprovals(entriesByDate[day.date]?.[0])?.manager ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'">
                {{ getDayApprovals(entriesByDate[day.date]?.[0])?.manager ? '✓' : 'Pending' }}
              </span>
            </div>
            <div>
              <div class="text-gray-500">HR</div>
              <span class="px-2 py-1 rounded" :class="getDayApprovals(entriesByDate[day.date]?.[0])?.hr ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'">
                {{ getDayApprovals(entriesByDate[day.date]?.[0])?.hr ? '✓' : 'Pending' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Your existing script remains exactly the same
import { ref, reactive, computed, onMounted } from 'vue'
import api from '@/config/api'
import { useAuthStore } from '@/stores/AuthStore'
import Swal from 'sweetalert2'
import { useHRM } from '@/composables/useHRM'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const onRangeChange = (e) => {
  const value = e.target.value

  if (value === 'weekly') {
    router.push('/crm/timecard')
  } else {
    router.push('/crm/timecard/myMonthly')
  }
}
const selectedRange = ref(route.path.includes('myMonthly') ? 'monthly' : 'weekly')

const { hrmApi } = useHRM()
const saveLoadingByDate = reactive({})
const attendanceLoading = ref(true)
const totalLoginTimeByDate = ref({})
const getLocalISODate = (date = new Date()) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const getBusinessDate = () => {
  const now = new Date()

  // BEFORE 6 AM → count as yesterday
  if (now.getHours() < 6) {
    now.setDate(now.getDate() - 1)
  }

  return getLocalISODate(now)
}

const todayISO = getBusinessDate()

// const isToday = (date) => true
const isToday = (date) => date === todayISO
// const hasActiveSession = computed(() => {
//   return Object.values(attendanceByDate.value || {}).some(day =>
//     day?.some(t => !t.logout_time)
//   )
// })

const authStore = useAuthStore()
authStore.sidebarOpen = false

/* ================= WORK TYPES (UNCHANGED) ================= */

const workTypes = [
  {
    id: 1,
    accountSelect: true,
    name: 'Sales Department',
    activities: ['Sales-Email', 'Sales Call', 'Sales-Presentation', 'Sales-Meeting', 'Sales-Study']
  },
  {
    id: 2,
    accountSelect: true,
    name: 'Accounting Department',
    activities: [
      'Accounting-Salary',
      'Accounting-Daily',
      'Accounting-Monthly',
      'Accounting-Quarterly'
    ]
  },
  {
    id: 3,
    accountSelect: true,
    name: 'Finance Department',
    activities: [
      'Finance-Tax',
      'Finance-Banking',
      'Finance-Daily',
      'Finance-Monthly',
      'Finance-Quarterly'
    ]
  },
  {
    id: 4,
    accountSelect: true,
    name: 'HR Department',
    activities: ['HR-Disciplinary', 'HR-Background check', 'HR-Recruitment']
  },
  {
    id: 5,
    accountSelect: true,
    name: 'Marketing Department',
    activities: [
      'Marketing-Email',
      'Marketing-Presentation',
      'Marketing-Meeting',
      'Marketing-Study'
    ]
  },
  {
    id: 6,
    accountSelect: true,
    name: 'Training Department',
    activities: [
      'Training-Business Development',
      'Training-Sales',
      'Training-MS Office',
      'Training-MSC-Structure',
      'Training-MSC-Acoustics',
      'Training-MSC-System Dynamics',
      'Training-MSC-VM&C',
      'Training-MSC-ICME',
      'Training-MSC-Autonomous'
    ]
  },
  {
    id: 7,
    accountSelect: true,
    name: 'Business Development',
    activities: [
      'Business Development-CRM Management',
      'Business Development-Contact Update',
      'Business Development-Presentation',
      'Business Development-Email'
    ]
  },
  {
    id: 8,
    accountSelect: true,
    name: 'Engineering Department',
    activities: ['Engineering-Design', 'Engineering-Service', 'Engineering-Analysis']
  }
]

const majorTasks = [
  {
    name: 'Frontend',
    subtopics: [
      { name: 'Frontend API Integration' },
      { name: 'Frontend UI Design' },
      { name: 'Frontend Project Structure' }
    ]
  },
  {
    name: 'Backend',
    subtopics: [
      { name: 'Backend API Development' },
      { name: 'Backend Database Design' },
      { name: 'Backend Structure' }
    ]
  },
  {
    name: 'UI/UX',
    subtopics: [
      { name: 'UI/UX Icon Design' },
      { name: 'UI/UX Banner Design' },
      { name: 'UI/UX Figma Design' }
    ]
  },
  {
    name: 'Testing',
    subtopics: [{ name: 'Testing Feature' }]
  },
  {
    name: 'Deployment',
    subtopics: [
      { name: 'Deployment - GoDaddy' },
      { name: 'Deployment - Turbify' },
      { name: 'Deployment - App Store' },
      { name: 'Deployment - Play Store' }
    ]
  },
  {
    name: 'Management',
    subtopics: [{ name: 'Management Feature Development' }]
  }
]

/* ================= RECORDS ================= */

const recordList = ref([])
const loadRecords = async () => {
  const res = await api().get('crm/modules/2/records?fields=company_name')
  recordList.value = res.data.data
}

// const productList = ref([])
// const loadProducts = async () => {
//   const { data } = await api().get('product-by-feature-list')
//   productList.value = data.data
// }

/* ================= DAYS ================= */

const days = computed(() => {
  return weekDays.value.map((d) => ({
    date: d.date,
    name: d.dayName
  }))
})

/* ================= PER-ROW FORM STATE ================= */

const rowForms = reactive({})

const getRowForm = (date) => {
  if (!rowForms[date]) {
    rowForms[date] = {
      date,
      workTypeId: '',
      // record_id: '',
      activity: '',
      product_id: '', // ✅ NEW
      module_id: '', // ✅ NEW
      major_task: '', // ✅ NEW
      major_sub_task: '', // ✅ NEW
      hours: '',
      minutes: '',
      task_name: '',
      description: '',
      output: '',
      efficiency: '',
      status: 0
    }
  }
  return rowForms[date]
}

const selectedWorkType = (date) => {
  const f = getRowForm(date)
  return workTypes.find((w) => w.id == f.workTypeId)
}

/* ================= ENTRIES ================= */

const entries = ref([])

const entriesByDate = computed(() => {
  const start = weekStart.value
  const end = new Date(start)
  end.setDate(start.getDate() + 6)

  return entries.value.reduce((acc, e) => {
    const d = new Date(e.date)
    if (d >= start && d <= end) {
      if (!acc[e.date]) acc[e.date] = []
      acc[e.date].push(e)
    }
    return acc
  }, {})
})

/* ================= SUBMIT ENTRY (FIXED) ================= */

const validateSubmitEntry = (date) => {
  const f = getRowForm(date)
  const workType = selectedWorkType(date)
  const errors = []

  // if (!f.workTypeId) errors.push('• Department is required')
  // if (workType?.accountSelect && !f.record_id) errors.push('• Account is required')
  // if (!f.activity) errors.push('• Task Type is required')
  // if (!f.task_name) errors.push('• Task Name is required')
  if (!f.hours && !f.minutes) errors.push('• Hours or Minutes is required')
  // if (!f.output) errors.push('• Output is required')
  // Description is optional

  return errors
}

const submitEntry = async (date) => {
  if (saveLoadingByDate[date]) return

  // Validate required fields
  const errors = validateSubmitEntry(date)
  if (errors.length > 0) {
    Swal.fire({
      icon: 'error',
      title: 'Missing Required Fields',
      html: errors.join('<br>'),
      confirmButtonText: 'OK'
    })
    return
  }

  // Find the attendance ID for this specific date from our entries list
  const dayEntry = entries.value.find((e) => e.date === date)
  const currentAttendanceId = dayEntry?.id

  if (!currentAttendanceId) {
    Swal.fire({
      icon: 'error',
      title: 'Login required',
      text: 'No active attendance record found for this date. Please Login first.'
    })
    return
  }

  saveLoadingByDate[date] = true
  const f = getRowForm(date)

  // Get the company name from record_id
  const companyName = getAccountNameById(f.record_id)

  try {
    await hrmApi.post('/attendance-task-store', {
      attendance_id: currentAttendanceId,
      task_id: null,
      product_id: f.product_id,
      module_id: f.module_id,
      major_task: f.major_task,
      major_sub_task: f.major_sub_task,
      type_of_work: selectedWorkType(date)?.name,
      // record_id: f.record_id,
      activity: f.activity,
      hour: f.hours || 0,
      minute: f.minutes || 0,
      task_name: f.task_name,
      description: f.description,
      output: f.output,
      efficiency: companyName || f.record_id // Send company name, fallback to ID if not found
    })

    // ... reset form logic ...
    rowForms[date] = {
      date,
      workTypeId: '',
      // record_id: '',
      product_id: '',
      module_id: '',
      major_task: '',
      major_sub_task: '',
      activity: '',
      hours: '',
      minutes: '',
      task_name: '',
      description: '',
      output: '',
      efficiency: '',
      status: 0
    }

    Swal.fire({ icon: 'success', title: 'Saved', timer: 1200, showConfirmButton: false })
    await loadAttendanceForWeek()
  } finally {
    saveLoadingByDate[date] = false
  }
}
/* ================= ATTENDANCE ================= */

const attendanceByDate = ref({})
const timesByDate = ref({})
const isLoggedInByDate = reactive({})
const loginLoading = reactive({})

const toggleLogin = async (date) => {
  if (loginLoading[date]) return
  loginLoading[date] = true

  try {
    const now = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })

    if (!isLoggedInByDate[date]) {
      await hrmApi.post('/timecard-login', {
        login_time: now
      })
    } else {
      let active = null

      for (const logs of Object.values(attendanceByDate.value)) {
        const found = logs?.find((t) => !t.logout_time)
        if (found) {
          active = found
          break
        }
      }

      if (!active) return

      if (!active) return

      await hrmApi.post(`/timecard-logout/${active.timecard_id}`, {
        logout_time: now
      })
    }

    await loadAttendanceForWeek()
  } finally {
    loginLoading[date] = false
  }
}

const getAccountNameById = (id) => {
  if (!id) return null

  const record = recordList.value.find((r) => r.id == id)
  if (!record) return null

  return record.values?.find((v) => v.field?.label === 'Company Name')?.value || null
}

/* ================= UPDATED ATTENDANCE FETCH ================= */

const loadAttendanceForWeek = async () => {
  attendanceLoading.value = true

  attendanceByDate.value = {}
  timesByDate.value = {}
  entries.value = []

  const start = weekDays.value[0].date
  const end = weekDays.value[6].date

  try {
    const res = await hrmApi.get(`/auth-user-timecard-info?start_date=${start}&end_date=${end}`)

    res.data.data.forEach((day) => {
      const date = day.date

      // LOGIN LOGS
      attendanceByDate.value[date] = day.timecard || []

      // ACTIVE SESSION
      isLoggedInByDate[date] = day.timecard?.some((t) => !t.logout_time)

       // ✅ TOTAL LOGIN TIME (FROM API)
      totalLoginTimeByDate.value[date] = day.total_time_worked || '00 Hours 00 Min'

      // TASKS
      timesByDate.value[date] = (day.attendance_tasks || []).map((task) => {
        const accountName = getAccountNameById(task.record_id)

        return {
          ...task,
          // product,
          // module,
          account: accountName ? { name: accountName } : null
        }
      })

      entries.value.push({
        ...day,
        times: timesByDate.value[date]
      })
    })
  } finally {
    attendanceLoading.value = false
  }
}

const getDayApprovals = (attendance) => {
  if (!attendance) return { employee: false, manager: false, hr: false }

  const status = parseInt(attendance.status || 0)

  return {
    employee: status >= 1,
    manager: status >= 2,
    hr: status >= 3
  }
}

const attendanceLoadingById = reactive({})

const approveEmployee = async (attendance) => {
  if (!attendance?.id) return

  // Find the date of this attendance
  const attendanceDate = attendance.date

  console.log(attendanceDate)

  // Check if user is logged in - they must be logged OUT to approve
  if (attendanceDate && isLoggedInByDate[attendanceDate]) {
    Swal.fire({
      icon: 'warning',
      title: 'Please Logout First',
      text: 'You must logout before approving timecard entries.'
    })
    return
  }

  const id = attendance.id
  attendanceLoadingById[id] = true

  try {
    await hrmApi.post(`attendance-approve/${id}`, {
      status: 1
    })
    attendance.status = '1'
  } catch (err) {
    console.error(err)
  } finally {
    attendanceLoadingById[id] = false
  }
}

const totalTimeByDate = computed(() => {
  const map = {}

  for (const [date, times] of Object.entries(timesByDate.value)) {
    let totalMinutes = 0

    times.forEach((t) => {
      totalMinutes += (Number(t.hour) || 0) * 60
      totalMinutes += Number(t.minute) || 0
    })

    map[date] = {
      hours: Math.floor(totalMinutes / 60),
      minutes: totalMinutes % 60
    }
  }

  return map
})

/* ================= WEEK ================= */
const todayRingClass = (date) =>
  isToday(date) ? 'bg-emerald-50 border border-red-100 ring-2 ring-red-200 ring-inset' : ''

const weekOffset = ref(0)
const weekStart = computed(() => {
  const d = getSaturday(new Date(todayISO))
  d.setDate(d.getDate() + weekOffset.value * 7)
  return d
})

function getSaturday(date) {
  const d = new Date(date)
  const diff = (d.getDay() + 1) % 7
  d.setDate(d.getDate() - diff)
  d.setHours(0, 0, 0, 0)
  return d
}

const formatLocalDate = (date) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const weekDays = computed(() =>
  Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(weekStart.value)
    d.setDate(d.getDate() + i)

    return {
      date: formatLocalDate(d), // ✅ FIX
      dayName: d.toLocaleDateString('en-US', { weekday: 'long' })
    }
  })
)

const todayFormatted = computed(() =>
  new Date(todayISO).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
)

const changeWeek = async (dir) => {
  weekOffset.value += dir
  await loadAttendanceForWeek()
}
const weekRangeLabel = computed(() => {
  const start = weekDays.value[0].date
  const end = weekDays.value[6].date
  return `${start} → ${end}`
})

const getTotalLoginTime = (date) => {
  const logs = attendanceByDate.value[date] || []

  let minutes = 0

  logs.forEach((l) => {
    if (!l.login_time || !l.logout_time) return

    const start = new Date(`1970-01-01 ${l.login_time}`)
    const end = new Date(`1970-01-01 ${l.logout_time}`)

    minutes += (end - start) / 60000
  })

  return {
    hours: Math.floor(minutes / 60),
    minutes: Math.round(minutes % 60)
  }
}

onMounted(async () => {
  await loadRecords()
  await loadAttendanceForWeek()
})
</script>

<style scoped>
/* Mobile scrollbar styling */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Ensure table doesn't break on mobile */
@media (max-width: 768px) {
  .overflow-x-auto {
    -webkit-overflow-scrolling: touch;
  }
}
</style>