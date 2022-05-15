<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onShow(){
			let usertoken=uni.getStorageSync('recycle-user-token')
			if(!usertoken){
					uni.switchTab({url:`/pages/minAll/my/my`})
				}
		}
	}
</script>

<style lang="scss">

</style>
