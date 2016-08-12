  var treeview = React.createClass({
      render:function() {
        return (
          <li>
            <a href="#">
            <i className="fa fa-circle-o text-red"></i>
            <span>Important</span></a>
          </li>
        );
      }
  });

$.ajax({
  url:'menu/admin/getUserMenu',
  type:'post',
  data:{

  },
  dataType:'json',
  sucess:function(data){
      console.log(data);
      ReactDOM.render(
        <SignInForm />,
        // document.getElementsByClassName('login-box')
        $(".login-box")[0]
      );
  },
  error:function(data){

  }
})
