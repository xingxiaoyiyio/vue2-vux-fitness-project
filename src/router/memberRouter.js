import Vue from 'vue'
import VueRouter from 'vue-router'
import memberHome from '@/components/memberHome'
import activityIndex from '@/components/member/activities/activityIndex'
import activityDetail from '@/components/member/activities/activityDetail'
import groupCourses from '@/components/member/groupCourses/groupCourses'
import personalCourses from '@/components/member/personalCourses/personalCourses'
import personalCourseDetail from '@/components/member/personalCourses/personalCourseDetail'
import mine from '@/components/member/mine/mine'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    //路由映射map
    routes: [
        { path: '/', redirect: '/memberHome/activityIndex' },
        { path: '*', redirect: '/memberHome/activityIndex' },
	    {
	      path: '/memberHome',
	      name: 'memberHome',
	      component: memberHome,
	      children:[
	      	   {
			      path: '/memberHome/activityIndex',
			      name: 'activityIndex',
			      component: activityIndex
			    },
			     {
			      path: '/memberHome/activityDetail/:activityId',
			      name: 'activityDetail',
			      component: activityDetail
			    },
			    {
			      path: '/memberHome/groupCourses',
			      name: 'groupCourses',
			      component: groupCourses
			    },
			    {
			      path: '/memberHome/mine',
			      name: 'mine',
			      component: mine
			    },
			    {
			      path: '/memberHome/personalCourses',
			      name: 'personalCourses',
			      component: personalCourses
			    },
			     {
			      path: '/memberHome/personalCourseDetail/:courseId/:date',
			      name: 'personalCourseDetail',
			      component: personalCourseDetail
			    }

	      ]
	    },
	     
    ]
});

export default router;