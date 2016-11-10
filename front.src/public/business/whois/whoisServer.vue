<template lang="html">
    <div >
        <div class="inner-nav">
            <el-button-group class='start-button-group'>
              <el-button type="primary" >修改</el-button>
              <el-button type="danger" >添加</el-button>
              <el-button type="danger" >删除</el-button>
            </el-button-group>

        </div>
        <el-row>
          <el-col :span="24">
              <div class="grid-content bg-purple-light">
                  <el-table
                     :data="serverData"
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
                       property="address"
                       label="地址"
                       width="180">
                     </el-table-column>
                   </el-table>
              </div>
          </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        var serverData = [];

        this.$http.get('/whois/getWhoisAllServer').then(response => {

            if (response.body.ok) {
                this.$data.serverData=response.body.data;
            }

        }, response => {

        });

        return {
            serverData: serverData
        }
    }
}
</script>

<style lang="css">
</style>
