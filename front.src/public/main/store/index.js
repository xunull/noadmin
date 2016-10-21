import Vue from 'vue'
import Vuex from 'vuex'
import defaultMutations from './modules/default'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        defaultMutations: defaultMutations
    }
});
