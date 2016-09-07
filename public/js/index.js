var SiderbarMenus = Vue.extend({
  data: function () {
   return { menus: sidebarMenu}
  },
  template:
    `
    <ul class='sidebar-menu'>
      <siderbarmenu v-for="menu in menus" track-by="$index" :menu="menu">
			</siderbarmenu>
    </ul>
    `

});
Vue.component('siderbarmenus',SiderbarMenus);

var SiderbarMenu = Vue.extend({
  props:['menu'],
  template:
    `
    <li class="treeview">
      <a href="#">
        <i class="{{menu.menu_icon}}"></i> <span>{{menu.name}}</span>
        <span class="pull-right-container">
          <i class="fa fa-angle-left pull-right"></i>
        </span>
      </a>
      <siderbarsubmenu :submenu="menu.sub_menu">
      </siderbarsubmenu>
    </li>
    `

});
Vue.component('siderbarmenu',SiderbarMenu);

var SiderbarSubMenu = Vue.extend({
  props:['submenu'],
  template:
  `
  <ul class="treeview-menu">
    <li v-for='menu in submenu'>
      <!--<a href="{{menu.url}}">-->
      <a  v-link="{ path: menu.url }">
      <i class="{{menu.menu_icon}}"></i>{{menu.name}}</a></li>
  </ul>
  `

});
Vue.component('siderbarsubmenu',SiderbarSubMenu);


var Bar = Vue.extend({
    template: '<p>This is bar!</p>'
});
var App = Vue.extend({
});
var router=new VueRouter();
router.transitionOnLoad=false;


router.map({
    '/setting/menu': {
        component: function(resolve){
          $.ajax({
            url:'/public/js/components/setting-menu-page.html',
            type:'get',
            dataType:'html',
            success:function(data){
              resolve({
                template:data
              })
            },
            error:function(data){

            }
          })
        }
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

$(function(){

});
