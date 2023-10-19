<template>
	<view>
		<!-- 头部 -->
		<view class="head">
			<image src="@/static/images/history.png" mode="aspectFill"></image>
			<view>浏览历史</view>
		</view>
		<!-- 展示列表 -->
		<view>
			<Newsbox :dataList="list"></Newsbox>
		</view>
	</view>
</template>

<script>
	import Newsbox from '@/components/newsbox/Newsbox.vue'
	export default {
		data() {
			return {
				list:[]
			};
		},
		components:{
			Newsbox
		},
		onShow() {
			this.list =	uni.getStorageSync('historyList')
		},
		methods:{
			
		},
	}
</script>

<style lang="scss" scoped>
	.head{
		width: 300rpx;
		height: 300rpx;
		margin: 0px auto;
		text-align: center;
		font-size: 16px;
		color: darkgray;
		image{
			width: 200rpx;
			height: 200rpx;
		}
	}
</style>
