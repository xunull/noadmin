import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import SettingMenuView from './components/setting-menu-view.vue'

new Vue({
  el:'#app',
  components:{
    app:App
  }
})

Vue.config.devtools = true;

var router=new VueRouter();
router.transitionOnLoad=false;

router.map({
    '/setting/menu': {
        component: SettingMenuView
    },
    '/setting/permission': {
        component: function(resolve){
              $.ajax({
                url:'/public/js/components/test.html',
                type:'get',
                dataType:'html',
                success:function(data){
                    console.log('成功了');
                    console.log(data);
                    resolve({
                      template:data
                    });
                },
                error:function(data,err){
                    console.log('失败了')
                    console.log(err);
                    console.table(data);
                }
              })
        }
    }
});

router.start(App,'#app');
