var SettingMenuView = Vue.extend({
    template: `
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
              </div>
              <link rel="stylesheet" href="/libs/zTree/css/metroStyle/metroStyle.css">
              `,
    ready: function() {

        $.ajax({
          url:'setting/getUserAccessPath',
          type:'post',
          dataType:'json',
          success:function(data){
            console.log(data);
          },
          error:function(data){
            alert('获取用户访问path出错');
          }
        })

        $.ajax({
            url: 'setting/getAllAccessPath',
            type: 'post',
            dataType: 'json',
            success: function(data) {

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
                          rootPId:0,
                          // 是否启用简单数据格式
                          // 简单数据格式不需要对象保持真正的父子嵌套关系
                          enable: true
                      }
                  },
              };

                $.fn.zTree.init($('#accessPathTree'), setting, data);

                console.table(data);
            },
            error: function(data, error) {
                alert('获取全部access path出错');
            }
            
        });
    }

});
Vue.component('setting-menu-view', SettingMenuView);
