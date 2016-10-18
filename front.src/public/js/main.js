import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App.vue'
import SettingMenuView from './components/setting-menu-view.vue'
import ServerStatusview from './components/server-status-view.vue'
import ManageRoleView from './components/manage-role-view.vue'
import RoleTableView from './components/manage/role/role-table-view.vue'
import RoleCreateView from './components/manage/role/role-create-view.vue'

import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css';
Vue.use(Element);
Vue.use(VueRouter);
Vue.use(VueResource);

Vue.config.devtools = true;

var router = new VueRouter({
    routes: [
        {
            path: '/manage/menu',
            component: SettingMenuView
        }, {
            path: '/manage/permission',
            component: SettingMenuView
        }, {
            path: '/monitor/server',
            component: ServerStatusview
        }, {
            path: '/manage/role',
            component: ManageRoleView,
            children: [
                {
                    path: '', // 空路径 是会默认呈现的路径
                    component: RoleTableView
                }, {
                    path: 'roleTable',
                    component: RoleTableView
                }, {
                    path: 'roleCreate',
                    component: RoleCreateView
                }
            ]
        }
    ]
});

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
})
