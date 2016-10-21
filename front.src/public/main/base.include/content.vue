<template lang="html">
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <el-breadcrumb class='my-breadcrumb' separator="/">
      <i  class="dashboard-icon fa fa-dashboard"></i>

      <el-breadcrumb-item :to='path.url'
          v-for="(path,index) in breadcrumbPath"
          track-by="index"
          :breadcrumbPath="breadcrumbPath">{{path.name}}</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- Main content -->
    <section id='router-view' class="content">
        <router-view></router-view>
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
export default {
    data() {
        return {
            // counterValue: 111
            // return this.$store.getters.getCount
        }
    },
    computed: {
        breadcrumbPath() {
            // 计算面包削导航的内容
            let toPath = this.$store.getters.getBreadcrumbPath;

            if (toPath.fullPath === '/') {
                return [{
                    name: '主页',
                    url: '/'
                }]
            } else {
                let fullPath = toPath.fullPath;
                let breadcrumbName = toPath.meta.breadcrumbName;
                let breadcrumbUrl = toPath.meta.breadcrumbUrl;

                var temp = [];
                breadcrumbName.forEach(function(value, index) {
                    temp.push({
                        name: value,
                        url: breadcrumbUrl[index]
                    })
                });
                return temp;
            }

        }
    }
}
</script>
<style lang="css">
    /* todo 与文字对齐 */
    .dashboard-icon {
        color: blue;
        float: left;
        margin-right: 3px;
    }
    .my-breadcrumb {
        font-size: 18px !important;
        margin-left: 5px;
        padding-top: 5px;
    }
</style>
