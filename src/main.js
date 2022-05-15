import Vue from 'vue'
import App from './App'
//引入网络路径
import {staticURL,uploadURL} from '@/config'
Vue.prototype.$staticURL = staticURL;
Vue.prototype.$uploadURL = uploadURL;
//封装axios
import { http } from '@/utils/http.js';
Vue.prototype.$http = http;

import utils from '@/utils/utils.js';
Vue.prototype.$utils = utils;

Vue.config.productionTip = false
import store from '@/store'
Vue.prototype.$store = store
//判断常见的刘海屏
uni.getSystemInfo({
	success: function (res) {
		let modelmes = res.model;
		console.log("手机型号-------",res.model);
		if(modelmes.indexOf('iPhone X')>=0||modelmes.indexOf('iPhone XR')>=0||modelmes.indexOf('iPhone XS')>=0||modelmes.indexOf('iPhone 12')>=0||modelmes.indexOf('iPhone 11')>=0||modelmes.indexOf('iPhone11')>=0||modelmes.indexOf('iPhone12')>=0||modelmes.indexOf('iPhoneXR')>=0||modelmes.indexOf('iPhoneX')>=0){
			Vue.prototype.$is_bang = true
		}else{
			Vue.prototype.$is_bang = false
		}
	}
});
App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
