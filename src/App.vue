<script>
	export default {
		data(){
			return{
			}
		},
		onLaunch: function() {
			// console.log('App Launch')
			function network() {
					uni.getNetworkType({
						success: function(res) {
							if (res.networkType == 'none') {
								uni.showModal({
									title: '网络错误',
									content: '请连接网络后重试',
									success(res) {
										network();
									}
								})
							}
						}
					});
				};
			network();
			const updateManager = uni.getUpdateManager();
				updateManager.onUpdateReady(function() {
					uni.showModal({
						title: '更新提示',
						content: '新版本已经准备好，是否重启应用？',
						success(res) {
							updateManager.applyUpdate();
						}
					})
				})
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>
<style lang="scss">
	@import "@/assets/fonts/iconfont.css"; 
	@import "@/assets/css/global.scss";
</style>
