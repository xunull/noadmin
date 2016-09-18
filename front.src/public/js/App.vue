<template lang="html">
  <my-header></my-header>
  <my-sidebar></my-sidebar>
  <my-content></my-content>
</template>

<script>
import MyHeader from './base.include/header.vue'
import MySidebar from './base.include/sidebar.vue'
import MyContent from './base.include/content.vue'

export default {
  components: {
    MyHeader,
    MySidebar,
    MyContent
  }
}

</script>
