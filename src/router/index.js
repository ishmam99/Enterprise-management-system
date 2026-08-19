import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
// import SupplyLayout from '@/layouts/SupplyLayout.vue'
import UserLayout from '@/layouts/UserLayout.vue'
import CRMLayout from '@/layouts/CRMLayout.vue'
import PurchaseNow from '@/components/homePage/purchase_now.vue'
import SalesManagementLayout from '@/layouts/SalesManagementLayout.vue'
import PartnerLayout from '@/layouts/PartnerLayout.vue'
import PartnerIndividualLayout from '@/layouts/PartnerLayout.vue'
import PartnerManagementLayout from '@/layouts/PartnerManagementLayout.vue'
// import PMLayout from '@/layouts/PMLayout.vue'
import TrainingLayout from '@/layouts/TrainingLayout.vue'
import TrainerLayout from '@/layouts/TrainerLayout.vue'
import CustomerLayout from '@/layouts/CustomerLayout.vue'
import UserManagementLayout from '@/layouts/UserManagementLayout.vue'
import CustomerManagementLayout from '@/layouts/CustomerManagementLayout.vue'
import HRManagementLayout from '@/layouts/HRManagementLayout.vue'
import SMSLayout from '@/layouts/SMSLayout.vue'
import IndustryManagementLayout from '@/layouts/IndustryManagementLayout.vue'
import CustomerSuccessManagerLayout from '@/layouts/CustomerSuccessManagerLayout.vue'
import CustomerSuccessTeamSalesLayout from '@/layouts/CustomerSuccessTeamSalesLayout.vue'

import BusinessManagementLayout from '@/layouts/BusinessManagementLayout.vue'
import MarketingManagementLayout from '@/layouts/MarketingManagementLayout.vue'
import ProjectManagementLayout from '@/layouts/ProjectManagementLayout.vue'

const layoutRoutes = routes.map(route => {
  // Wrap all pages except those with meta.noLayout
  if (!route.meta?.noLayout) {
    return {
      path: route.path,
      component: DefaultLayout,
      children: [route],
    }
  }
  return route
})
console.log(routes)
// const supplyRoutes = makeChildren('/supply', routes.filter(r => r.path.startsWith('/supply')))
// const programManagementRoutes = makeChildren('/supply', routes.filter(r => r.path.startsWith('/program_management')))
const userRoutes = makeChildren('/user', routes.filter(r => r.path.startsWith('/user')))
const pmRoutes = makeChildren('/partner_management', routes.filter(r => r.path.startsWith('/partner_management')))
const trainingRoutes = makeChildren('/training_management', routes.filter(r => r.path.startsWith('/training_management')))
const trainerRoutes = makeChildren('/trainer', routes.filter(r => r.path.startsWith('/trainer')))
const partnerRoutes = makeChildren('/partner', routes.filter(r => r.path.startsWith('/partner')))
const partnerIndividualRoutes = makeChildren('/partner_individual', routes.filter(r => r.path.startsWith('/partner_individual')))
const partnerManagementRoutes = makeChildren('/partner_management', routes.filter(r => r.path.startsWith('/partner_management')))
const customerRoutes = makeChildren('/customer', routes.filter(r => r.path.startsWith('/customer')))
const customerSuccessManagerRoutes = makeChildren('/customer_success_manager', routes.filter(r => r.path.startsWith('/customer_success_manager')))
const customerSuccessTeamSalesRoutes = makeChildren('/customer_success_team_sales', routes.filter(r => r.path.startsWith('/customer_success_team_sales')))
const userManagementRoutes = makeChildren('/user_management', routes.filter(r => r.path.startsWith('/user_management')))
const customerManagementRoutes = makeChildren('/customer_management', routes.filter(r => r.path.startsWith('/customer_management')))
const hrManagementRoutes = makeChildren('/hr_management', routes.filter(r => r.path.startsWith('/hr_management')))
const smsManagementRoutes = makeChildren('/software_management', routes.filter(r => r.path.startsWith('/software_management')))
const industryManagementRoutes = makeChildren('/industry_management', routes.filter(r => r.path.startsWith('/industry_management')))

const crmRoutes = makeChildren('/crm', routes.filter(r => r.path.startsWith('/crm')))
const salesManagementRoutes = makeChildren('/sales_management',routes.filter(r => r.path.startsWith('/sales_management')))
const projectManagementRoutes = makeChildren('/project_management',routes.filter(r => r.path.startsWith('/project_management')))





const businessManagementRoutes = makeChildren('/business_management', routes.filter(r => r.path.startsWith('/business_management')))
const marketingManagementRoutes = makeChildren('/marketing_management', routes.filter(r => r.path.startsWith('/marketing_management')))








console.log(partnerManagementRoutes)
function makeChildren(parentPath, routes) {
  return routes.map(r => {
    let relativePath = r.path.replace(parentPath, '')
    if (!relativePath) relativePath = '' // index page
    else if (relativePath.startsWith('/')) relativePath = relativePath.slice(1)
    return { ...r, path: relativePath }
  })
}

const finalRoutes = [
    {
    path: '/crm',
    component: CRMLayout,
    children: crmRoutes,
  },
    {
    path: '/sales_management',
    component: SalesManagementLayout,
    children: salesManagementRoutes,
  },

  // {
  //   path: '/supply',
  //   component: SupplyLayout,
  //   children: supplyRoutes,
  // },

  {
    path: '/user',
    component: UserLayout,
    children: userRoutes,
  },
  {
    path: '/trainer',
    component: TrainerLayout,
    children: trainerRoutes,
  },
  {
    path: '/partner',
    component: PartnerLayout,
    children: partnerRoutes,
  },
  {
    path: '/partner_individual',
    component: PartnerIndividualLayout,
    children: partnerIndividualRoutes,
  },
  {
    path: '/customer',
    component: CustomerLayout,
    children: customerRoutes,
  },
  {
    path: '/customer_success_manager',
    component: CustomerSuccessManagerLayout,
    children: customerSuccessManagerRoutes,
  },

  {
    path: '/customer_success_team_sales',
    component: CustomerSuccessTeamSalesLayout,
    children: customerSuccessTeamSalesRoutes,
  },

  {
    path: '/training_management',
    component: TrainingLayout,
    children: trainingRoutes,
  },
  {
    path: '/user_management',
    component: UserManagementLayout,
    children: userManagementRoutes,
  },
  {
    path: '/partner_management',
    component: PartnerManagementLayout,
    children: partnerManagementRoutes,
  },
  {
    path: '/customer_management',
    component: CustomerManagementLayout,
    children: customerManagementRoutes,
  },
  {
    path: '/hr_management',
    component: HRManagementLayout,
    children: hrManagementRoutes,
  },
  {
    path: '/software_management',
    component: SMSLayout,
    children: smsManagementRoutes,
  },



    {
    path: '/business_management',
    component: BusinessManagementLayout,
    children: businessManagementRoutes,
  },
    {
    path: '/marketing_management',
    component: MarketingManagementLayout,
    children: marketingManagementRoutes,
  },
    {
    path: '/project_management',
    component: ProjectManagementLayout,
    children: projectManagementRoutes,
  },



//
  //this is for applicant access token
{
  path: '/applicant-access/:token',
  name: 'ApplicantAccess',
  component: () => import('@/pages/applicant-access/ApplicantAccess.vue')
},
{
  path: '/purchase_now',
  component: DefaultLayout,
  children: [
    {
      path: '',
      name: 'purchase_now',
      component: PurchaseNow,
    },
  ],
},
  {
    path: '/industry_management',
    component: IndustryManagementLayout,
    children: industryManagementRoutes,
  },
  ...layoutRoutes.filter(r =>
    // !r.path.startsWith('/supply') &&
    !r.path.startsWith('/user_management') &&
    // !r.path.startsWith('/program_management') &&
    !r.path.startsWith('/software_management') &&
    !r.path.startsWith('/industry_management') &&
    !r.path.startsWith('/user') &&
    !r.path.startsWith('/trainer') &&
    !r.path.startsWith('/partner_management') &&

    !r.path.startsWith('/business_management') &&
    !r.path.startsWith('/marketing_management') &&
    !r.path.startsWith('/project_management') &&









    !r.path.startsWith('/training_management') &&
    !r.path.startsWith('/partner') &&
    !r.path.startsWith('/partner_individual') &&
    !r.path.startsWith('/customer') &&
    !r.path.startsWith('/crm') &&
    !r.path.startsWith('/sales_management') &&
    !r.path.startsWith('/customer_success_team_sales') &&
    !r.path.startsWith('/hr_management')
  ),
]
const router = createRouter({
  history: createWebHistory(),
  routes: finalRoutes,
})

export default router
