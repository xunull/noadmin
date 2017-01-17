<template lang="html">
    <div>
        <div class="inner-nav">
            <el-button-group class='start-button-group'>
              <el-button type="primary" >修改</el-button>
              <el-button type="danger" >禁用</el-button>
              <el-button type="danger" >删除</el-button>
            </el-button-group>

            <el-button class='end-button-group'
                @click.native='saveArticle' :plain="true" type="primary" >保存</el-button>

        </div>
        <div >
            <div id="toolbar">
              <button class="ql-bold">Bold</button>
              <button class="ql-italic">Italic</button>
            </div>
            <div id="editor">
             you can write something...
            </div>
        </div>
    </div>
</template>

<script>

import Quill from 'quill'
// import "quill/dist/quill.core.css"

// import Quill from 'quill/core';
//
// import Toolbar from 'quill/modules/toolbar';
// import Snow from 'quill/themes/snow';
//
// import Bold from 'quill/formats/bold';
// import Italic from 'quill/formats/italic';
// import Header from 'quill/formats/header';


// Quill.register({
//   'modules/toolbar': Toolbar,
//   'themes/snow': Snow,
//   'formats/bold': Bold,
//   'formats/italic': Italic,
//   'formats/header': Header
// });

export default {
    mounted(){
        // var ColorClass = Quill.import('attributors/class/color');
        // var SizeStyle = Quill.import('attributors/style/size');
        // Quill.register(ColorClass, true);
        // Quill.register(SizeStyle, true);

        var editor = new Quill('#editor', {
          modules: { toolbar: '#toolbar' },
          theme: 'snow'
        });
        this.editor=editor;
    },
    methods: {
        saveArticle() {
            this.$http.post('/writeMD/saveArticle',{
                text:this.editor.getText()
            }).then(response=>{
                console.log(response.body);
            },response=>{

            });
            console.log(this.editor.getLength());
            console.log(this.editor.getText());
        }
    },
}
</script>

<style lang="css">
/*想打包没有弄好*/
@import "//cdn.quilljs.com/1.1.5/quill.core.css";
@import "//cdn.quilljs.com/1.1.5/quill.snow.css";
@import "//cdn.quilljs.com/1.1.5/quill.bubble.css";

#editor{
    height:400px;
}
</style>
