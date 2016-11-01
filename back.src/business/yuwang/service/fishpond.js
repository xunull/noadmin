const uuid = require('node-uuid');
const fork = require('child_process').fork;
/**
 * 爬虫的最大数量
 * @type {Number}
 */
const FishMax = 8;

/**
 * 等待队列
 * @type {Array}
 */
const waitingPool = new Map();

/**
 * 运行队列
 * @type {Array}
 */
const runningPool = new Map();

/**
 * 当前使用的爬虫数量
 * @type {Number}
 */
const currentFish = 0;

exports.push = function(target) {
    if (runningPool.size < FishMax) {
        // 运行队列未满
        let fishId = startFish(target);
        return {fishId: fishId, msg: '已加入运行队列，正在运行'};
    } else {
        // 运行队列以满
        let id = uuid.v4();
        waitingPool.set(id, target);
        return {fishId: id, msg: '运行队列以满，以加入等待队列，当运行队列可用时可以自动被运行'};
    }
}

function startFish(target) {
    let id = uuid.v4();
    runningPool.set(id, target);
    let fish = fork(path.resolve(__dirname, './babel-fish.js'));
    target.fish = fish;
    return id;
}
