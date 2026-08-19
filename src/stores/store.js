import { defineStore } from 'pinia';
// import { projectlist } from './projects';
// import Announcement from '@/views/EMS/Announcement.vue';

export const useStore = defineStore ( 'store', {
  state: ()=> ({
    tasks: [],
    timeCards: [],
    employeeList:[],
    teamList:[],
    departmentList: [],
    companyList: [],
    customerList: [],
    projectTypeList: [
      {
        id: 1,
        name: 'IDL'
      },
      {
        id: 2,
        name: 'HTBIS'
      },
      {
        id: 3,
        name: 'HDBBD'
      },
    ],
    createProject: null,
    groupTask:[],
    projectlist:[],
    projectDetailslist:[],
    singleTask:[],
    leaveHistory: [],
    leaveApprovals: [],
    leaveHRdashboard: [],
    assignedTask:[],
    employeeProjects:[],
    taskList:[],
    announcementInfo: [],
    attendeeEmployee: []

  }),
  actions: {
    groupTaskAdd(task) {
      this.groupTask.push(task)
    },
    singleTaskAdd(task) {
      this.singleTask.push(task)
  },
  },
  persist: true
})
