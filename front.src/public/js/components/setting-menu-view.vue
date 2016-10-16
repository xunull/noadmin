<template lang="html">
  <div>
      <div class='row'>
        <div class='col-md-6'>
          <div class='box box-primary'>
            <div class="box-header with-border">
              <h3 class="box-title">配置访问路线</h3>
            </div>
            <div id="accessPathTree" class="ztree"></div>
          </div>
        </div>
      </div>
      <link rel="stylesheet" href="/libs/zTree/css/metroStyle/metroStyle.css">
  </div>

</template>

<script>
export default {

    mounted() {

        function getUserAccessPath() {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: 'setting/accessPath',
                    type: 'post',
                    dataType: 'json',
                    success: function(data) {
                        resolve(data);
                    },
                    error: function(data, error) {
                        reject('获取用户访问path出错');
                    }
                })
            })
        }

        function getAllAccessPath() {

            return new Promise((resolve, reject) => {
                $.ajax({
                    url: 'setting/allAccessPath',
                    type: 'post',
                    dataType: 'json',
                    success: function(data) {
                        resolve(data);
                    },
                    error: function(data, error) {
                        reject('获取全部access path出错');
                    }
                });
            })

        }

        function ztree(userAccessPath, allAccessPath) {
            console.log(userAccessPath);
            console.log(allAccessPath);
            var setting = {
                check: {
                    // 是否显示checkbox，radio
                    enable: true
                },

                data: {
                    key: {
                        // 节点名
                        name: "name"
                    },
                    simpleData: {
                        idKey: "id",
                        pIdKey: "pid",
                        rootPId: 0,
                        // 是否启用简单数据格式
                        // 简单数据格式不需要对象保持真正的父子嵌套关系
                        enable: true
                    }
                },
            };

            $.fn.zTree.init($('#accessPathTree'), setting, allAccessPath);

        }

        var asyncFunc = async function() {
            var userAccessPath = await getUserAccessPath().catch(err => {
                alert(err);
            });
            var allAccessPath = await getAllAccessPath().catch(err => {
                alert(err);
            });
            ztree(userAccessPath, allAccessPath);

        }

        asyncFunc();

    }
}
</script>
