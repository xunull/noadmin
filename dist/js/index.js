/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	  var treeview = React.createClass({displayName: "treeview",
	      render:function() {
	        return (
	          React.createElement("li", null, 
	            React.createElement("a", {href: "#"}, 
	            React.createElement("i", {className: "fa fa-circle-o text-red"}), 
	            React.createElement("span", null, "Important"))
	          )
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
	        React.createElement(SignInForm, null),
	        // document.getElementsByClassName('login-box')
	        $(".login-box")[0]
	      );
	  },
	  error:function(data){
	
	  }
	})


/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map