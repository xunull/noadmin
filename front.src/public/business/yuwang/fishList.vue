<template>
   <el-table
     :data="tableData"
     style="width: 100%">
     <el-table-column
       prop="date"
       label="创建日期"
       width="180">
     </el-table-column>
     <el-table-column
       prop="name"
       label="目标地址"
       width="180">
     </el-table-column>
     <el-table-column
       prop="address"
       label="描述">
     </el-table-column>
     <el-table-column
       prop="address"
       label="文件数量">
     </el-table-column>
     <el-table-column
       prop="address"
       label="完成度">
     </el-table-column>
     <el-table-column
       prop="address"
       label="保存位置">
     </el-table-column>
   </el-table>
 </template>

 <script>
   export default {
     data() {
       return {
         tableData: null
       }
     }
   }
 </script>
