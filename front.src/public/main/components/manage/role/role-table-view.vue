<template lang="html">
<div>
    <el-button-group>
      <el-button type="primary" >修改</el-button>
      <el-button type="success" >添加子角色</el-button>
      <el-button type="danger" >删除</el-button>
    </el-button-group>
    <el-row>
      <el-col :span="24">
          <div class="grid-content bg-purple-light">
              <el-table
                 :data="rolesData"
                 :fixed-column-count="4"
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
                   property="name"
                   label="名称"
                   width="180">
                 </el-table-column>
                 <el-table-column
                   property="description"
                   label="描述"
                   width="180">
                 </el-table-column>
                 <el-table-column
                   property="parent"
                   label="父角色"
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
                 <el-table-column
                   property="update_date"
                   label="修改时间">
                 </el-table-column>
                 <el-table-column
                   property="update_time"
                   label="修改者">
                 </el-table-column>
               </el-table>
          </div>
      </el-col>
    </el-row>
</div>
</template>

<script>
export default {
    data() {
        var rolesData = [];

        this.$http.get('/api/role/all').then((response) => {
            // this.$data.meetings = response.body;
            if (response.body.ok) {
                console.log(response.body);
                // 直接对数组变量赋值，table上不会显示
                rolesData.push(...response.body.data);
            } else {
                console.log(response.body.msg);
            }

        }, (response) => {
            console.log(response);
        });

        return {
            rolesData: rolesData
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
