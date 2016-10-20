<template lang="html">
    <!-- 表格中并没有将全部信息都显示出来,显示的是主要信息，全部信息可以在每条记录的详细页面中查看 -->
    <div >
        <div class="inner-nav">
            <el-button-group class='start-button-group'>
              <el-button type="primary" >修改</el-button>
              <el-button type="danger" >禁用</el-button>
              <el-button type="danger" >删除</el-button>
            </el-button-group>

            <el-button class='end-button-group'
                @click.native='toCreateUser' :plain="true" type="primary" >创建用户</el-button>

        </div>
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
    </div>
</template>

<script>
export default {
    data() {
        var userData = [];
        this.$http.get('api/user/all').then(response => {

            if (response.body.ok) {
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
    methods: {
        toCreateUser() {
            this.$router.push('/manage/user/userCreate');
        }
    },
    components: {}
}
</script>

<style lang="css">
    .start-button-group {
        margin-left: 10px;
    }
    .end-button-group {
        margin-right: 10px;
    }
    .inner-nav {
        height:50px;
        border:1px solid #e0e6ed;
        border-radius: 3px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
    }

</style>
