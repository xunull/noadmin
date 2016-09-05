var SiderbarMenus = Vue.extend({
  props:['menus'],
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
      <a href="{{menu.url}}">
      <i class="{{menu.menu_icon}}"></i>{{menu.name}}</a></li>
  </ul>
  `

});
Vue.component('siderbarsubmenu',SiderbarSubMenu);

$(function(){
  var sidebarMenuVue = new Vue({
			  el: '#sidebarMenu',
			  data: {
			  	menus:sidebarMenu
			  }
			});
});
