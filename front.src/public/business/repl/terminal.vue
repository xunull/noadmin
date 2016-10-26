<template lang="html">
    <div class="col-sm-12 terminal" >
            <!-- pre标签中的内容会保持原本格式输出 -->
            <pre class="terminal-content">
欢迎使用repl终端
<span class='prompt'>> </span><input @keyup.enter.stop='inputEnter' class="input">
</pre>
</template>

<script>
var replEmitter = require('./lib/replsocketio');

export default {
    data() {
        return {}
    },
    computed: {},
    mounted() {
        replEmitter.on('output', (data) => {
            // 对于undefined 需要特殊处理
            if ('undefined' === data) {
                $(".prompt").before('undefined' + '<br>');

            } else {
                // $(".terminal-content").append(JSON.parse(data) + '<br>');
                $(".prompt").before(data + '<br>');
            }
            this.inputFocus();
        });

        var inputDir = document.querySelector('.input');
        inputDir.contentEditable = true;
        this.inputFocus();

    },
    methods: {
        inputEnter(event) {
            var sentence = $('.input').val();
            $(".prompt").before('> ' + sentence + '<br>');
            replEmitter.emit('input', sentence);
            $('.input').val('');
            this.inputFocus();
        },
        inputFocus() {
            var inputDir = document.querySelector('.input');
            // inputDir.focus();
            $('.input').focus();
            inputDir.scrollIntoView();

            // 这个也可以做到滚动到最下方
            // var content = document.querySelector('.terminal-content');
            // content.scrollTop = content.scrollHeight;


        }
    },
    components: {}
}
</script>

<style lang="css">

    .terminal-content {
        /* 使pre的行可以自动换行 */
        white-space: pre-wrap;       /* css-3 */
        white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
        white-space: -pre-wrap;      /* Opera 4-6 */
        white-space: -o-pre-wrap;    /* Opera 7 */
        word-wrap: break-word;       /* Internet Explorer 5.5+ */

        padding: 0;
        font-size: 16px;
        font-family: monospace;
        background-color: black;
        height:500px;
        color:green;
        overflow:auto;
    }

    .terminal-content  input {
        font-family: monospace;
        background-color: black;
        color:green;
        overflow:auto;
        border: 0 none;
        width: 100%;
    }

    .terminal {
        height:500px;
    }
</style>
