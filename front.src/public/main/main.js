import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App.vue'

import store from './store';

import SettingMenuView from './components/setting-menu-view.vue'
import ServerStatusview from './components/server-status-view.vue'
import ManageRoleView from './components/manage-role-view.vue'
import RoleTableView from './components/manage/role/role-table-view.vue'
import RoleCreateView from './components/manage/role/role-create-view.vue'
import PathView from './components/manage/path/path-view.vue';
import AuthorityView from './components/manage/authority/authority-view.vue'

import ManageUserView from './components/manage/user/user-view.vue'
import UserTable from './components/manage/user/user-table.vue'
import UserCreate from './components/manage/user/user-create.vue'

import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css';
Vue.use(Element);
Vue.use(VueRouter);
Vue.use(VueResource);

Vue.config.devtools = true;

var router = new VueRouter({
    routes: [
        {
            path: '/manage/user',
            component: ManageUserView,
            children: [
                {
                    path: '',
                    component: UserTable,
                    meta: {
                        breadcrumbName: [
                            '主页', '系统管理', '用户管理'
                        ],
                        breadcrumbUrl: ['/', '', '/manage/user']
                    }
                }, {
                    path: 'userTable',
                    component: UserTable,
                    meta: {
                        breadcrumbName: [
                            '主页', '系统管理', '用户管理'
                        ],
                        breadcrumbUrl: ['/', '', '/manage/user']
                    }
                }, {
                    path: 'userCreate',
                    component: UserCreate,
                    meta: {
                        breadcrumbName: [
                            '主页', '系统管理', '用户管理', '用户创建'
                        ],
                        breadcrumbUrl: ['/', '', '/manage/user', '/manage/user/userCreate']
                    }
                }
            ]
        }, {
            path: '/manage/menu',
            component: SettingMenuView
        }, {
            path: '/manage/authority',
            component: SettingMenuView
        }, {
            path: '/monitor/server',
            component: ServerStatusview
        }, {
            path: '/manage/path',
            component: PathView,
            meta: {
                breadcrumbName: [
                    '主页', '系统管理', '路径管理'
                ],
                breadcrumbUrl: ['/', '', '/manage/path']
            }
        }, {
            path: '/manage/authority',
            component: AuthorityView
        }, {
            path: '/manage/role',
            component: ManageRoleView,
            children: [
                {
                    path: '', // 空路径 是会默认呈现的路径
                    component: RoleTableView,
                    meta: {
                        breadcrumbName: [
                            '主页', '系统管理', '角色管理'
                        ],
                        breadcrumbUrl: ['/', '', '/manage/role']
                    }
                }, {
                    path: 'roleTable',
                    component: RoleTableView,
                    meta: {
                        breadcrumbName: [
                            '主页', '系统管理', '用户管理'
                        ],
                        breadcrumbUrl: ['/', '', '/manage/role']
                    }
                }, {
                    path: 'roleCreate',
                    component: RoleCreateView,
                    meta: {
                        breadcrumbName: [
                            '主页', '系统管理', '角色管理','角色创建'
                        ],
                        breadcrumbUrl: ['/', '', '/manage/role','/manage/role/roleCreate']
                    }
                }
            ]
        }
    ]
});

// 路由切换的时候，需要更新breadcrumb的信息
router.beforeEach((to, from, next) => {

    router.app.$store.commit('BREADCRUMBPATHREFRESH', to);
    next();
})

new Vue({
    el: '#app',
    store,
    router: router,
    render: h => h(App)
})
