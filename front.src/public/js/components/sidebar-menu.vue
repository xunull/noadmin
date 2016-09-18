<template lang="html">
  <ul class='sidebar-menu'>
    <siderbar-menu v-for="menu in menus" track-by="$index" :menu="menu">
    </siderbar-menu>
  </ul>
</template>

<script>
import Vue from 'vue'

var SiderbarSubmenu = Vue.extend({
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
Vue.component('siderbarsubmenu',SiderbarSubmenu);

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


export default {
  data () {
    return {
      menus: clientObj.userMenu
    }
  },
  components: {
    SiderbarMenu
  }
}
</script>
