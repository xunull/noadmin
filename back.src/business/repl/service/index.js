var toFrontEmitter = require('./replSocketio');
var appREPL = global.thisapp.common.repl.app;

toFrontEmitter.on('input', (inputValue) => {
    appREPL.input(inputValue);
});

appREPL.REPLEmitter.on('output', (data) => {
    // 语句的返回值 在最后是有\n
    // 并且repl在每个语句后还会返回一个'> '
    // 这个在shell中 是提示用户的
    // 不过在此系统中，用户输入的行由前端负责，所以暂时将此行省去

    // 这里有个潜在的bug,如果'> '正好是返回值，就坑了
    if (data !== '> ') {
        // 去掉最后面的回车，好像不去掉也不会影响json的解析
        data=data.substring(0,data.length-1);
        console.log(' output ',data.toString());
        toFrontEmitter.emit('output', data);
    }
});
