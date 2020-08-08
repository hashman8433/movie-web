import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import video1 from '@/components/video1'
import videoList from '@/components/videoList'
// import videoUpload from '@/components/videoUpload'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/video1',
      name: 'video1',
      component: video1
    },
    {
      path: '/videoList',
      name: 'videoList',
      component: videoList
    }
//  {
//    path: '/videoUpload',
//    name: 'videoUpload',
//    component: videoUpload
//  }
  ]
})
