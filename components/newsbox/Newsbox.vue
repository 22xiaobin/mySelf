<template>
	<view class="">
		<view class="newsbox" v-for="item in dataList" :key='item.id' @click="linkDetails(item.id)">
			<!-- 图片 -->
			<view class="pic">
				<image :src="item.picurl"  mode="aspectFill"></image>
			</view>
			<!-- 新闻 -->
			<view class="text">
				<!-- 新闻标题 -->
				<view class="title">
					{{item.title}}
				</view>
				<!-- 新闻流量 -->
				<view class="info">
					<text>{{item.author}}</text>
					<text>{{item.hits}}浏览</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"Newsbox",
		props:['dataList'],
		data() {
			return {
				// cid:'',		//当前栏目id
				// id:'',		//当前新闻id
			};
		},
		onLoad() {
			
		},
		methods:{
			// 进入详细信息
			linkDetails(id){
				uni.navigateTo({
					url:`/pages/newsDetails/newsDetails?id=${id}`
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
.newsbox{
	// width: 100vw;
	display: flex;
	border-bottom: 1px dotted #bbbbbb;
	margin: 10rpx 0;
	padding-bottom: 10rpx;

	.pic{
		width: 30%;
		height: 80px;
		// border: 1px solid;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.text{
		width: 70%;
		height: 80px;
		// border: 1px solid;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-left: 10rpx;
		.title{
			  display: -webkit-box;
			  -webkit-box-orient: vertical;
			  overflow: hidden;
			  -webkit-line-clamp: 2; /* 最大显示2行 */
		}
		.info{
			color: #bbbbbb;
			font-size: 12px;
			padding-bottom: 10rpx;
			text{
				padding-right: 15rpx;
			}
		}
	}
}
</style>