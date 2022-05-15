import { root } from '@/config';
import store from '@/store/index.js'
module.exports = {
    http: async function(url, method = 'GET', param, showToast = true) {
		// 登陆接口特殊处理
		let roots = root;
		// if(url == 'login'){
		// 	url = 'auth/api/v1/' + url
		// 	roots = roots.substring(0,roots.length-16)
		// }
        return await new Promise((resolve, reject) => {
            uni.request({
                url: roots + url,
                method: method,
				timeout:10000,
                data: param,
                header: {
                    Authorization: store.state.token ? 'Bearer ' + store.state.token : '',
                    "content-type": "application/json" //"application/x-www-form-urlencoded",
                },
                success: res => {
					let {code,msg} = res.data;
					resolve(res.data);
                    if(code == 401){
						//	清除Token
                    	store.commit('clearToken');
                        uni.showToast({
                            title: '请登录！',
                            icon: 'none'
                        });
					}
                },
                fail: (res) => {
                    reject(res)
					uni.hideLoading();
                    uni.showToast({
                        title: '人数较多，请稍后重试...',
                        icon: 'none'
                    });
                }
            });
        })
    }
}