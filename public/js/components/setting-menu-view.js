var SettingMenuView = Vue.extend({
  template:
  `
  <div>
      这是一个ztree
      <div id="tree" class="ztree"></div>
  </div>
  <link rel="stylesheet" href="/libs/zTree/css/metroStyle/metroStyle.css">
  <script src="/libs/zTree/js/jquery.ztree.all.min.js" charset="utf-8"></script>
  <script src="/public/js/components/test.js" charset="utf-8"></script>
  `,
  data:function(){
    $.ajax({
      url:'setting/getAllAccessPath',
      type:'post',
      dateType:'json',
      success:function(data){
        console.log(data);
        return {
          allAccessPath:data
        }

      },
      error:function(data,error){

      }
    });
  }

});
Vue.component('setting-menu-view',SettingMenuView);
