import { uploadURL } from '@/config'
import store from '@/store/index.js'
const utils = {
	show: ({mask = false, title = '加载中···'} = {}) => {
		uni.showLoading({
			title,
			mask
		})
	},
	hide: () => {
		uni.hideLoading();
	},
	toast: (title = '请稍后···', icon = 'none', mask = false, time = 1000) => {
		uni.showToast({
			title,
			icon,
			mask,
			time
		})
	},
	// 普通跳转(参事需拼接url)
	goPage(url) {
		uni.navigateTo({url})
	},
	previewImage(img,imgArr) {
		uni.previewImage({
			current: img,
			urls: imgArr ? imgArr : [img]
		});
	},
	getMyDate(str) {
		//补零操作
		function addZero(num){
		    if(parseInt(num) < 10){
		        num = '0'+num;
		    }
		    return num;
		}
	    var oDate = new Date(str),
	    oYear = oDate.getFullYear(),
	    oMonth = oDate.getMonth()+1,
	    oDay = oDate.getDate(),
	    // oHour = oDate.getHours(),
	    // oMin = oDate.getMinutes(),
	    // oSen = oDate.getSeconds(),
	    oTime = oYear +'-'+ addZero(oMonth) +'-'+ addZero(oDay);
	    return oTime;
	},
	uploadingImg(imgUrls,param={}) {
		console.log('imgUrls',imgUrls);
		return new Promise((resolve,reject)=>{
		    //启动上传等待中...  
		    uni.showLoading({title: '上传中'})
		    let i = 0;
		    let returnImgUrls = [];//返回的所有图片链接
		    uploadImg(imgUrls[i])
		    function uploadImg(path) {
		      wx.uploadFile({
		        url: uploadURL+ 'file/upload',
		        filePath: path,
		        header: {
					Authorization: store.state.token,
		          'Content-Type':'multipart/form-data'
		        },
		        name: 'file',
				formData: param,
		        success(res) {
					let {code,msg,data} = JSON.parse(res.data);
					if(code == 200){
						returnImgUrls.push(data.url)
					}
		        },
		        complete: function () {
		          i++;
		          if (i < imgUrls.length) {
		            uploadImg(imgUrls[i])
		          } else {
		            uni.hideLoading()
					resolve(returnImgUrls);
		          }
		        },
				fail(err) {
				}
		      })
		    }
		})
	}
}
export default utils
