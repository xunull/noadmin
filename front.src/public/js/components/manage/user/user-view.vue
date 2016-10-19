<template lang="html">
    <!-- 表格中并没有将全部信息都显示出来,显示的是主要信息，全部信息可以在每条记录的详细页面中查看 -->
    <el-row>
      <el-col :span="24">
          <div class="grid-content bg-purple-light">
              <el-table
                 :data="userData"
                 :border='true'
                 :stripe='true'
                 selection-mode="multiple"
                 style="width: 100%">
                 <el-table-column
                   type="selection"
                   width="50">
                 </el-table-column>
                 <el-table-column
                   type="index"
                   width="50">
                 </el-table-column>
                 <el-table-column
                   property="loginname"
                   label="登录名"
                   width="180">
                 </el-table-column>
                 <el-table-column
                   property="name"
                   label="用户名"
                   width="180">
                 </el-table-column>
                 <el-table-column
                   property="active"
                   label="活跃帐户"
                   width="180">
                 </el-table-column>
                 <el-table-column
                   property="create_date"
                   label="创建时间">
                 </el-table-column>
                 <el-table-column
                   property="create_user"
                   label="创建者">
                 </el-table-column>
               </el-table>
          </div>
      </el-col>
    </el-row>
</template>

<script>
export default {
    data() {
        var userData = [];
        this.$http.get('api/user/all').then(response => {

            if(response.body.ok){
                userData.push(...response.body.data);
            }
        }, response => {

        });
        return {
            userData: userData
        }
    },
    computed: {},
    mounted() {},
    methods: {},
    components: {}
}
</script>

<style lang="css">
</style>
