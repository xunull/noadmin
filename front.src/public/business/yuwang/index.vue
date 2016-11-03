<template lang="html">
    <div >
        <el-tabs class='eltabs'>
           <el-tab-pane label="拉取列表">
               <fish-list></fish-list>
           </el-tab-pane>
           <el-tab-pane label="创建fish">
               <fish-create></fish-create>
           </el-tab-pane>
         </el-tabs>
    </div>
</template>

<script>
import FishCreate from './fishCreate.vue'
import FishList from './fishList.vue'

export default {
    methods: {

    },
    components: {
        FishList,
        FishCreate
    }
}
</script>

<style lang="css">
    .eltabs {
        width:100%
    }
</style>
