<template>
	<view class="content">
		<!-- 顶部banner -->
		 <view class="header" :style="{paddingTop: statusBarHeight+'px'}">
            <view class="box1 " :style="{minHeight:titleHeight+'px'}">
                <view class="title1" @click="moreSite">{{city}}</view>
                <view class="title2">德育银行</view>
            </view>
			<view class="box2 ">
				<swiper class="swiper" circular="true" autoplay="true" duration="2000">
					<swiper-item v-for="(item, index) in banner" :key="index">
						<view class="swiper-item" style="background: #c52c20;">
							<image :src="$staticURL(item.url)" class="banner"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
        </view>
		<!-- 中间充填 -->
		<view :style="{height: statusBarHeight+ pt +titleHeight+50+'px'}"></view>

		<!-- 中间主体 -->
		<view class="buttonmin">
			<view class="inputs" v-for="(item,index) in lsit " :key="index" @click="jump(item.key)">
				<image :src="$staticURL(item.url)" class="inputsiocn"></image>
				<text>{{ item.name }}</text>
			</view>
		</view>
		<!-- 内容展示区 -->
		<view class="contentmin">
			<view class="conenttop">
			<text>重要通知</text>
			<text class="conenttop_right">更多 ></text>
			</view>
			<view class="contentmain"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				titleHeight: '',
                statusBarHeight: '',	
				banner:[{url:'mainAll/banner01.png'}],
				pt:uni.upx2px(340),
				lsit:[
					{
						name:"积分提报",
						url:'mainAll/declare.png',
						key:"integralReport"
					},
					{
						name:"积分查询",
						url:'mainAll/query.png',
						key:"ccjf"
					},
					{
						name:"积分核销记录",
						url:'mainAll/chargeOff.png',
						key:"integralkmsg"
					}
				]

			}
		},
		onLoad() {

		},
		onShow(){
			 const SystemInfo = wx.getSystemInfoSync();
            this.statusBarHeight = SystemInfo.statusBarHeight;
            this.titleHeight = (uni.getMenuButtonBoundingClientRect().top - this.statusBarHeight) * 2 + uni
                .getMenuButtonBoundingClientRect().height;
		},
		methods: {
			jump(val){
				uni.switchTab({url:`/pages/minAll/${val}/${val}`})
			}
		}
	}
</script>

<style lang="scss">
	.content{
		height: 100%;
	}
	.header {
		z-index: 9;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        // background: linear-gradient(to bottom, #c52c20 10%, #fff);
        background:#c52c20;
		box-shadow: 0px 6upx 6upx 2upx #c52c20;
        .box1 {
			position: relative;
            display: flex;
            align-items: center;
			justify-content: center;
            .title1 {
				position: absolute;
				left: 10upx;
                width: 300upx;
				font-size: 24upx;
				color: #FFFFFF;
                border-radius: 50%;
            }

            .title2 {
                font-weight: 500;
                padding-left: 14upx;
				margin-top: 20upx;
                font-size: 28upx;
                color: #FFFFFF;
            }
        }
		.box2{
			margin: 50upx auto 0;
			.swiper {
				width: 100%;
				height: 370upx;
				.swiper-item {
					width: 95%;
					height: 100%;
					border-radius: 8upx;
					overflow: hidden;
					margin: 0 auto;
					.banner {
						width: 100%;
						height: 100%;
						position: relative;
						top: 20upx;
					}
				}
			}
		}
    }
	//中间主体
	.buttonmin{
		 margin-top: 80upx;
		 .inputs{
			 width: 24%;
			 display: inline-block;
			 height: 150upx;
			 text-align: center;
			 margin-right: 10upx;
			 .inputsiocn{
				 width: 60%;
				 height: 66%;
			 }
		 }
	}
	//重要通知
	.contentmin{
		font-size: 35upx;
		font-weight: bold;
		height:50%;
		margin-top: 80upx;
		margin-left: 20upx;
		.conenttop{
			.conenttop_right{
				float: right;
				margin-right: 20upx;
				font-size: 25upx;
				color: rgb(111, 111, 111);
				margin-top: 15upx;
			}
		}
		.contentmain{
			margin: 0 auto;
			margin-top: 50upx;
			width: 90%;
			height: 50%;
			background-color: #FFFFFF;
			box-shadow: 0upx 1upx 20upx #888888;
		}
	}
</style>
