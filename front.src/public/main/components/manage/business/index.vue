<template lang="html">
    <el-tabs class='eltabs'>
       <el-tab-pane label='已加载'>
           <loaded></loaded>
       </el-tab-pane>
       <el-tab-pane label="管理">
           <manage></manage>
       </el-tab-pane>
     </el-tabs>
</template>

<script>
import Loaded from './loaded.vue'
import Manage from './manage.vue'

export default {
    components:{
        Loaded,
        Manage,
    }

}
</script>

<style lang="css">

</style>
