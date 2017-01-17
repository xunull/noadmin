<template lang="html">
    <el-card class="box-card">
      <div v-for="item in loaded" class="text item">
        {{'列表内容 ' + item }}
      </div>
    </el-card>
</template>

<script>
export default {
    data() {
        let loaded=[1,2,3,4,5,6,67,9];

        this.$http.get('/admin/manage/business/getLoaded').then(response=>{

            console.log(response.body);

        });

        return {
            loaded
        }
    }

}
</script>

<style lang="css">
</style>
