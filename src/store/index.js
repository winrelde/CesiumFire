import { createStore } from "vuex"

const store = createStore({
    state: {
        name:'Ramda',
        aboutDisplayState: false,
    },
    getters: {
        getName: (state) => {
            return state.name
        }
    },
    mutations: {
        setName(state,value){
            state.name = value
        },
        setAboutDisplayState(state,value){
            state.aboutDisplayState = value
        }
    },
    actions: {
        setNameAsync(context,value){
            context.commit('setName',value)
        },
        setAboutDisplayStateAsync(context,value){
            context.commit('setAboutDisplayState',value)
        }
    },
    modules:{}
})

export default store
