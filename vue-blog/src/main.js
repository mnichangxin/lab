import Vue from 'vue'
import VueRouter from 'vue-router'

import iview from 'iview'
import 'iview/dist/styles/iview.css'

import BlogContainer from './components/BlogContainer.vue'

// 引入插件
Vue.use(VueRouter)
Vue.use(iview)

// 实例化
new Vue({
    el: '#container',
    router: new VueRouter({
        // 路由配置
        routes: [
            // {
            //     path: '/home',
            //     component: Home
            // },
            // {
            //     path: '/about',
            //     component: About
            // }
        ]
    }),
    render: h => h(BlogContainer)
})