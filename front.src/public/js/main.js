import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import SettingMenuView from './components/setting-menu-view.vue'
import ServerStatusview from './components/server-status-view.vue'

Vue.use(VueRouter);

Vue.config.devtools = true;

var router = new VueRouter({
    routes: [
        {
            path: '/setting/menu',
            component: SettingMenuView
        }, {
            path: '/setting/permission',
            component: SettingMenuView
        }, {
            path: '/monitor/server',
            component: ServerStatusview
        }
    ]
});

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
})
