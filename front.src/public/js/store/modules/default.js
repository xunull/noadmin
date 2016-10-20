const state = {
    // 应用启动时，count 置为0
    breadcrumbPath: null
}

const mutations = {
    // mutation 的第一个参数是当前的 state
    // 你可以在函数里修改 state
    BREADCRUMBPATHREFRESH(state, path) {
        state.breadcrumbPath = path;
    }
}

const actions = {
    breadcrumbPathRefresh({dispatch, state},path) {
        dispatch('BREADCRUMBPATHREFRESH', path);
    }
}

const getters = {
    getBreadcrumbPath(state) {
        return state.breadcrumbPath
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
