<template lang="html">
  <ul class='sidebar-menu'>
    <siderbar-menu v-for="(menu,index) in menus" track-by="index" :menu="menu">
    </siderbar-menu>
  </ul>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'

var SiderbarSubmenu = Vue.extend({
  props:['submenu'],
  template:
  `
  <ul class="treeview-menu">
    <li v-for='menu in submenu'>
      <!--<a v-bind:href="menu.url">-->
      <!--<a  v-link="{ path: menu.uri }">-->
      <router-link to="{ path: menu.uri }"></router-link>
      <i v-bind:class="menu.menu_icon"></i>{{menu.name}}</a></li>
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
        <i v-bind:class="menu.menu_icon"></i> <span>{{menu.name}}</span>
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
