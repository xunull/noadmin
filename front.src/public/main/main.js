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

import BusinessManageIndex from './components/manage/business/index.vue'

import ReplView from '../business/repl/repl-view.vue'
import ShellView from '../business/remoteShell/shell-view.vue'

import KshellTerminal from '../business/remoteShell/terminal.vue'
import KshellLogin from '../business/remoteShell/login.vue'

import YuwangIndex from '../business/yuwang/index.vue'
import FishList from '../business/yuwang/fishList.vue'
import FishCreate from '../business/yuwang/fishCreate.vue'

import WhoisIndex from '../business/whois/index.vue'

import WriteMD from '../business/writeMD/index.vue'

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
            path: '/builtinBusiness/yuwang',
            component: YuwangIndex,
            meta: {
                breadcrumbName: [
                    '主页', '业务系统', '渔网'
                ],
                breadcrumbUrl: ['/', '', '/builtinBusiness/yuwang']
            }
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
        },{
            path: '/manage/business',
            component: BusinessManageIndex,
            meta: {
                breadcrumbName: [
                    '主页', '系统管理', '业务管理'
                ],
                breadcrumbUrl: ['/', '', '/manage/business']
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
                            '主页', '系统管理', '角色管理', '角色创建'
                        ],
                        breadcrumbUrl: ['/', '', '/manage/role', '/manage/role/roleCreate']
                    }
                }
            ]
        }, {
            path: '/builtinBusiness/repl',
            component: ReplView,
            meta: {
                breadcrumbName: [
                    '主页', '业务系统', 'repl'
                ],
                breadcrumbUrl: ['/', '', '/builtinBusiness/repl']
            }
        }, {
            path: '/builtinBusiness/whois',
            component: WhoisIndex,
            meta: {
                breadcrumbName: [
                    '主页', '业务系统', 'Whois'
                ],
                breadcrumbUrl: ['/', '', '/builtinBusiness/whois']
            }
        }, {
            path: '/builtinBusiness/writeMD',
            component: WriteMD,
            meta: {
                breadcrumbName: [
                    '主页', '业务系统', 'writeMD'
                ],
                breadcrumbUrl: ['/', '', '/builtinBusiness/writeMD']
            }
        }, {
            path: '/builtinBusiness/kshell',
            component: ShellView,
            children: [
                {
                    path: '',
                    component: KshellLogin,
                    meta: {
                        breadcrumbName: [
                            '主页', '业务系统', 'kshell', '用户登陆'
                        ],
                        breadcrumbUrl: ['/', '', '/builtinBusiness/kshell']
                    }
                }, {
                    path: 'login',
                    component: KshellLogin,
                    meta: {
                        breadcrumbName: [
                            '主页', '业务系统', 'kshell', '用户登陆'
                        ],
                        breadcrumbUrl: ['/', '', '/builtinBusiness/kshell', '/builtinBusiness/kshell/login']
                    }
                }, {
                    path: 'terminal',
                    component: KshellTerminal,
                    meta: {
                        breadcrumbName: [
                            '主页', '业务系统', 'kshell', '终端窗口'
                        ],
                        breadcrumbUrl: ['/', '', '/builtinBusiness/kshell', '/builtinBusiness/kshell/terminal']
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
