class Regular {

    constructor(urlPattern, checkList=null, isAll = true, isSingle = false,grabImg) {
        this.urlPattern = urlPattern;
        this.checkList = checkList;
        this.isAll = isAll;
        this.isSingle = isSingle;
        this.grabImg = grabImg;
    }
    // 测试一个url是否符合预期规则
    test(url) {}
    testType(type) {
        // array.includes 没有实现

        for (let temp of this.checkList) {
            if(temp === type) {
                return true;
            }
        }
        return false;
    }

}

module.exports=Regular;
