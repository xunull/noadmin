import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import SettingMenuView from './components/setting-menu-view.vue'
import ServerStatusview from './components/server-status-view.vue'
Vue.use(VueRouter);

Vue.config.devtools = true;

var router=new VueRouter();
router.transitionOnLoad=false;

router.map({
    '/setting/menu': {
        component:SettingMenuView
    },
    '/setting/permission': {
        component:SettingMenuView
    },
    '/monitor/server':{
        component:ServerStatusview
    }
});

router.start(App,'#app');
