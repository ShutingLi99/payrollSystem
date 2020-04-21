import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import BackContainer from '@/components/backstage/backhome/BackContainer'
import AsideCon from '@/components/backstage/backhome/AsideCon'
import HeaderCon from '@/components/backstage/backhome/HeaderCon'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/test',
      name: 'BackContainer',
      component:BackContainer
    },
    {
      path:'/back',component:resolve => require(['@/components/backstage/backhome/BackContainer'], resolve),
      children:[
        {path:'',redirect:{name:'home'}},
        { path:'home', name:'home', component:resolve => require(['@/components/common/Home'], resolve) },
        { path:'announcement', name:'announcement', component:resolve => require(['@/components/common/Announcement'], resolve)  },
        { path:'depManagement', name:'depManagement', component:resolve => require(['@/components/backstage/pages/DepManager'], resolve)  },
      ]
    }
    // { path:'/back', component:resolve => require(['@/components/backstage/backhome/BackContainer'], resolve),
    //   children:[
    //     // { path:'', redirect:{ name:'home' } },
    //     // { path:'home', name:'home', component:resolve => require(['@/components/page/Home/Home'], resolve) },
    //     { path:'announcement', name:'announcement', component:resolve => require(['@/components/page/AnnouncementManage/AnnouncementManage'], resolve)  },
    //     { path:'personnel_management', component:resolve => require(['@/components/common/SectionContainer'], resolve),
    //       children:[
    //         { path:'company_management', name:'company_management', component:resolve => require(['@/components/page/CompanyManage/CompanyManage'], resolve) },
    //         { path:'staff_management', name:'staff_management', component:resolve => require(['@/components/page/StaffManagement/StaffManagement'], resolve),
    //           beforeEnter:(to,from,next)=>{
    //             router.app.$options.store.dispatch(types.GET_ALL_STAFF_INFO);
    //             next();
    //           }
    //         },
    //         { path:'department_management', name:'department_management', component:resolve => require(['@/components/page/PostDepartmentManagement/Index'], resolve) },
    //         { path:'position_management', redirect:{ name:'department_management' } },
    //       ]},
    //     { path:'attendance_management', component:resolve => require(['@/components/common/SectionContainer'], resolve), children:[
    //         { path:'clock_in', name:'clock_in', component:resolve => require(['@/components/page/ClockInManage/ClockInManage'], resolve) ,
    //           beforeEnter:(to,from,next)=>{
    //             router.app.$options.store.commit(types.CHANGE_LOADING,{status:true});
    //             //console.log(router.app.$options)
    //             next();
    //           }
    //         },
    //         { path:'leave', name:'leave', component:resolve => require(['@/components/page/VacationManage/VacationManage'], resolve)  },
    //       ]},
    //     { path:'my_department', component:resolve => require(['@/components/common/SectionContainer'], resolve), children:[
    //         { path:'department_file', name:'department_file', component:resolve => require(['@/components/page/DepartmentFile/DepartmentFile'], resolve) },
    //       ]},
    //     { path:'chart', component:resolve => require(['@/components/page/ChartShow/ChartShow'], resolve) },
    //
    //   ]}
  ]
})
