/**
 * ls 一个目录
 * 相比简单的readDir，此类可以保存一些ls结果
 * 对于已经查询过的目录，可以不再调用readDir
 * 然而，这一点也并不是很好，因为dir的内容是动态变化的，如果从缓存中读取，就会忽略掉了变化
 *
 * 或者说此类可以辅助生成dir tree
 */

class DirTree {

    constructor() {

    }

}
