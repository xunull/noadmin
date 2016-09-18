var Content =Vue.extend({
  template:`
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <h1>
          Dashboard
          <small>Control panel</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
          <li class="active">Dashboard</li>
        </ol>
      </section>

      <!-- Main content -->
      <section id='router-view' class="content">
          <router-view></router-view>
      </section>
      <!-- /.content -->
    </div>
    `
});

Vue.component('my-content',Content);
