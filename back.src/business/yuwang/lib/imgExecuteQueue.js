/**
 * 专注于执行拉取网页中img的执行队列
 */

const EventEmitter = require('events');

const logger = thisapp.logger;

// 拉取图片的队列
var imgWaitingQueue = [];
// 拉取页面的队列
var pageWaitingQueue = [];
// 最大并发数量,该值应该是可以配置的
var defaultConcurrency = 8;

var currentRunning = 0;

const ratio = 0.8;

function getEmitter(that) {
    var queueEmitter = new EventEmitter();

    queueEmitter.on('someDone', function(resouce) {

        if (currentRunning > 0) {
            currentRunning -= 1;
            if ('img' === resouce.type) {
                that.imgCount -= 1;
            } else {
                that.pageCount -= 1;
            }
            if (currentRunning > 0) {
                queueEmitter.emit('go');
            }
        }
    });

    queueEmitter.on('pushPage', function(obj) {
        pageWaitingQueue.push(obj);
        queueEmitter.emit('go');
    });

    queueEmitter.on('pushImg', function(obj) {
        imgWaitingQueue.push(obj);
        queueEmitter.emit('go');

    });

    queueEmitter.on('go', function() {
        // logger.focus('imgcount '+that.imgMaxConcurrency+' pageCount '+that.pageMaxConcurrency);
        if (currentRunning < that.maxConcurrency) {
            if (that.imgCount < that.imgMaxConcurrency) {
                let obj = imgWaitingQueue.shift();

                // 如果img的等待队列中拿不出数据，会尝试从page中提取一个
                // 优先清空img的队列
                if (undefined !== obj) {
                    that.imgCount += 1;
                    currentRunning += 1;
                    try {
                        obj.run();
                    } catch (err) {
                        logger.error(err);
                    }
                } else {
                    if (that.pageCount < that.pageMaxConcurrency) {
                        let obj = pageWaitingQueue.shift();
                        if (undefined !== obj) {
                            that.pageCount += 1;
                            currentRunning += 1;
                            try {
                                obj.run();
                            } catch (err) {
                                logger.error(err);
                            }
                        }
                    }
                }
            }
        } else {
            // 队列已满
        }

    });

    return queueEmitter;
}

class ImgExecuteQueue {
    constructor(maxConcurrency) {
        this.maxConcurrency = maxConcurrency
            ? maxConcurrency
            : defaultConcurrency;
        this.imgMaxConcurrency = Math.floor(this.maxConcurrency * ratio);
        this.pageMaxConcurrency = this.maxConcurrency - this.imgMaxConcurrency;
        this.queueEmitter = getEmitter(this);
        this.imgCount = 0;
        this.pageCount = 0;
    }
    done(resource) {
        this.queueEmitter.emit('someDone',resource);
    }

    push(resource) {

        if ('img' === resource.type) {
            this.queueEmitter.emit('pushImg', resource);
        } else if ('a' === resource.type) {
            this.queueEmitter.emit('pushPage', resource);
        }
    }
}

module.exports = ImgExecuteQueue;
