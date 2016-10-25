var toFrontEmitter = require('./replSocketio');
var appREPL = global.thisapp.common.repl.app;

toFrontEmitter.on('input', (inputValue) => {
    appREPL.input(inputValue);
});

appREPL.REPLEmitter.on('output', (data) => {
    console.log(data);
    toFrontEmitter.emit('output', data);
});
