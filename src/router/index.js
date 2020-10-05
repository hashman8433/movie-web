import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import video1 from '@/components/video1'
import videoList from '@/components/videoList'
import imgList from '@/components/imgList'
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
      component: videoList,
      meta: {
		requireAuth: true,
		keepAlive: false, //此组件不需要被缓存
      },
    },
    {
      path: '/imgList',
      name: 'imgList',
      component: imgList
    }
    
//  {
//    path: '/videoUpload',
//    name: 'videoUpload',
//    component: videoUpload
//  }
  ]
})
