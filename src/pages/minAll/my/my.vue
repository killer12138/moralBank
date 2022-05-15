<template>
	<view class="content">
		<!-- 授权登录 -->
			<view class="mandate" v-if="info">
				<view>
					<image :src="$staticURL('mainAll/mandate.png')" class="mandatelog"></image>
					<button @click="login">点击授权登录</button>
				</view>
			</view>
			<!-- 正常页面 -->
			<view class="loginmin" v-if="!info">
				<!-- 头像部分 -->
				<view class="logmintop">
					<text class="logminname">xx支部</text><br>
					<image :src="$staticURL('mainAll/mandate.png')"></image>
					<view class="decorate"></view>
				</view>
				<!-- 积分展示部分 -->
				<view class="extcredits">
					<view class="extcredits_left">
						<text class="integralnr">153</text>
						<text>总积分</text>
					</view>
					<view class="extcredits_right">
						<text class="rank">15</text>
						<text>排名</text>
					</view>
				</view>
			<!-- 其他服务 -->
				<view class="service">
					<text class="service_text">其他服务</text>
					<view class="service_function">
						<image :src="$staticURL('mainAll/submission.png')"></image>
						<text>积分提报</text>
						<text class="iocn_right"> > </text>
					</view>
					<view class="service_function">
						<image :src="$staticURL('mainAll/search.png')"></image>
						<text>积分查询</text>
						<text class="iocn_right"> > </text>
					</view>
					<view class="service_function">
						<image :src="$staticURL('mainAll/record.png')"></image>
						<text>核销记录</text>
						<text class="iocn_right"> > </text>
					</view>
					<view class="service_function">
						<image :src="$staticURL('mainAll/feedback.png')"></image>
						<text>问题反馈</text>
						<text class="iocn_right"> > </text>
					</view>
				</view>	
				<button class="logOut" @click="logOut">退出登录</button>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:true
		};
		},
		onShow(){
			let usertoken=uni.getStorageSync('recycle-user-token')
			if(usertoken){
				this.info = false
			}else{
				this.info = true
			}
		},
		methods:{
			login(){
                 const vm = this;
				vm.$store.dispatch('setToken',"token");
                 uni.getUserProfile({
                    desc: '用于完善资料',
                    success: (info) => {
                        uni.login({
                            success: (loginRes)=>{
                                vm.$utils.show({mask:true,title:'登陆中...'})
                                let data = {
                                    appId: 'wxe3d75372a863b502',
                                    jscode: loginRes.code,
                                    rawData: info.rawData,
                                    signature: info.signature,
                                    encryptedData: info.encryptedData,
                                    iv: info.iv,
                                }
                                console.log('data------',data);
                                // vm.$http(`wx/user/login`,'post',data).then((res) => {
                                //     let {code, token, msg} = res;
                                //     vm.$utils.hide();
                                //     if(code == 200){
                                //         this.$utils.toast('登陆成功');
                                        // vm.$store.dispatch('setToken',token);
                                //         vm.getInfo();
                                //     }else{
                                //         this.$utils.toast(msg);
                                //     }
                                // });
								//							

                            }
                        });
                    }
               }) 
            },
			logOut(){
				this.$store.commit("clearToken","")//清除token  //利用储存空值的方法清除token
				this.info = true
			}
		}
	}
</script>

<style lang="scss">
	.mandate{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content:center;
		align-items: center;
		text-align: center;
		view{
			.mandatelog{
				width: 200upx;
				height: 200upx;
				position: relative;
				bottom: 150upx;
			}
			button{
				color: white;
				background-color: #c52c20;
				position: relative;
				bottom: 100upx;
				left: 10upx;
			}
		}
	}
	//我的主体部分
	.loginmin{
		.logmintop{
			background-color: #c52c20;
			color: #ffff;
			text-align: center;
			padding: 30upx;
			.logminname{
				width: 100%;
				height: 50upx;
				text-align: left;
				padding-left: 10upx;
				font-size: 40upx;
				font-weight: bold;
			}
				image{
				width: 200upx;
				height: 200upx;
				margin-top: 30upx;
			}
			.decorate{
				width: 50%;
				height: 30upx;
				border-radius: 50upx;
				margin: 0 auto;
				background-color: #a51b10;
			}

		}
		//积分展示部分
		.extcredits{
			background-color: #ffff;
			width: 95%;
			height: 180upx;
			margin: 0 auto;
			box-shadow: 0upx 1upx 20upx #888888;
			border-radius: 20upx;
			.extcredits_left,.extcredits_right{
				display: inline-block;
				width: 49%;
				height: 100%;
				font-size: 35upx;
				text-align: center;
				padding: 20upx;
			}
			.extcredits_left{
				.integralnr{
					width: 100%;
					font-size: 50upx;
					font-weight: bold;
					color: #c52b21;
				}
			}
			.extcredits_right{
				.rank{
					width: 100%;
					font-size: 50upx;
					font-weight: bold;
					color: #6e6b6a;
				}

			}
		}
		//其他功能部分
		.service{
			background-color: #ffff;
			width: 95%;
			height: 550upx;
			box-shadow: 0upx 1upx 20upx #888888;
			border-radius: 20upx;
			margin: 50upx auto;
			padding: 30upx;
			.service_text{
				font-size: 35upx;
				font-weight: bold;
				margin-bottom: 20upx;
			}
			.service_function{
				height: 100upx;
				border-bottom: 1upx solid #d9d9d9;
				font-size: 30upx;
				image{
				width: 60upx;
				height: 60upx;
				margin-right: 10upx;
				position: relative;
				top: 20upx;
				}
				.iocn_right{
					float: right;
					position: relative;
					top: 20upx;
					right: 20upx;
				}
			}
		}
		.logOut{
			background-color: #c52b21;
			color: white;
			font-weight: bold;
		}
	}
</style>
