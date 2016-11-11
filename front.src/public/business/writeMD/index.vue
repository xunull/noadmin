<template lang="html">
    <div >
        <div id="toolbar">
          <button class="ql-bold">Bold</button>
          <button class="ql-italic">Italic</button>
        </div>
        <div id="editor">
         you can write something...
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
    }
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
