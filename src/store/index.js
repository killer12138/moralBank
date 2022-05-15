import Vue from 'vue'
import Vuex from 'vuex'
import moreStore from './modules/moreStore'

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		TencentMapKey: 'PPNBZ-3OGR5-DO7IV-QEWAN-MHLWV-XHFYN', //腾讯地图
        token: uni.getStorageSync('recycle-user-token')  ? uni.getStorageSync('recycle-user-token') : '',
        userInfo: uni.getStorageSync('recycle-user-userInfo') ? uni.getStorageSync('recycle-user-userInfo') : '',
    },
    getters: {
        getUserInfo: (state) => state.userInfo,
    },
	//写实际操作
    mutations: {
		//的一个是 微型的store   第二个是参数
        setToken(state, payload) {
			state.token = payload;
			uni.setStorageSync('recycle-user-token', payload);
        },
        setUserInfo(state, payload) {
            state.userInfo = payload;
            uni.setStorageSync('recycle-user-userInfo', payload);
        },
		clearToken(state, payload) {
            state.token = '';
            uni.clearStorageSync('recycle-user-token');
        },
    },
	//写业务逻辑
    actions: {
        setToken({ commit }, platform) {
			commit('setToken', platform);
        },
        setUserInfo({ commit }, platform) {
            commit('setUserInfo', platform);
        },
    },
    modules: {
		moreStore
    }
})
export default store