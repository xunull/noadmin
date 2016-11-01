const EventEmitter = require('events');
const queueEmitter = new EventEmitter();

const logger = global.thisapp.logger;

// 正在等待执行的队列
var waitingQueue = [];
// 当前正在运行的数量
var currentRunning = 0;
// 队列最大执行数量,因为是对网站进行请求,请求太快容易被封
const maxConcurrency = 8;
// 一共执行的数量
var count = 0;

/**
 * 目前采用的是事件的机制,那么就依赖于这个方法的调用
 * 需要相关的方法实现时在完成任务后调用此方法
 * @return {Function} [description]
 */
exports.done = function() {
    queueEmitter.emit('oneOver');
};

/**
 * 传对象比传方法有一点好处
 * 对象可以有明确的相关运行环境,而方法依赖的环境就不会很清晰
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
exports.push = function(obj) {
    if (undefined !== obj.run) {
        queueEmitter.emit('add', obj);
    } else {
        logger.warn('queue obj must have a run function');
    }
};

queueEmitter.on('add', function(obj) {
    waitingQueue.push(obj);
    queueEmitter.emit('go');
});

queueEmitter.on('go', function() {
    if (currentRunning < maxConcurrency) {
        var obj = waitingQueue.shift();
        if (undefined !== obj) {
            currentRunning += 1;
            obj.run();
        }
    } else {
        // 运行对列已满,什么都不做
    }
});

queueEmitter.on('oneOver', function(obj) {
    if (currentRunning > 0) {
        currentRunning -= 1;
        if (currentRunning > 0) {
            queueEmitter.emit('go');
        }
    }
});

function Worker() {
    this.run = function() {};
    this.done = function() {
        queueEmitter.emit('oneOver', this);
    };
    this.worker_id = (count += 1);
}
