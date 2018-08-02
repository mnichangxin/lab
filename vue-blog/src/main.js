import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './components/App.vue'
import Routers from './router.js'
import iview from 'iview'
import 'iview/dist/styles/iview.css'

// 引入插件
Vue.use(VueRouter)
Vue.use(iview)

// 实例化
new Vue({
    el: '#app',
    router: new VueRouter({
        routes: Routers
    }),
    render: h => h(App)
    // components: {
    //     App
    // }
})