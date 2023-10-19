<template>
	<view class="home">
		<!-- 头部滑动栏 -->
		<u-sticky offset-top="0">
			<scroll-view scroll-x class="navscroll">
			<view class="item" 
			:class="item.id == cid ? 'active' : ''"
			v-for="item in titleList" :key="item.id" @click="handler(item.id)">
				<text>{{item.classname}}</text>
			</view>

			</scroll-view>
		</u-sticky>
		
		<!-- 具体展示 -->
		<view class="content">
			<view class="row" >
					<Newsbox :dataList="list"></Newsbox>
			</view>
			
			<!-- 加载 -->
			<view>
				<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText"  />
			</view>
		</view>
	</view>
</template>

<script>
	import Newsbox from '@/components/newsbox/Newsbox.vue'
	export default {
		data() {
			return {
				titleList:[],//标题列表
				list:[],//新闻列表
				cid:50,//导航栏ID
				page:1,
				pageSize:8,
				status:'loading',//组件状态
				iconType:'flower',//加载图标样式
				loadText:'正在加载',//自定义加载文字
				againRequest:false,//重复请求
			}
		},
		components:{
			Newsbox
		},
		onLoad() {
			this.getTitle()
			this.getNews()
			// 将栏目id存入storage
			uni.setStorageSync('cid',this.cid)
			
		},
		methods: {
			//获取新闻标题
			getTitle(){
				// 先清空数据
				this.titleList=[]
				uni.request({
					url:"https://ku.qingnian8.com/dataApi/news/navlist.php",
					success: (res) => {
						res.data.forEach((item)=>{
							this.titleList.push(item)
							})
					    }
				})
			},
			// 获取新闻数据
			getNews(isType){
				//下拉刷新页面
				if (isType == 'refresh') {
					this.page = 1
					this.againRequest=true
				}
				uni.request({
					url:"https://ku.qingnian8.com/dataApi/news/newslist.php",
					data:{
						cid:this.cid,
						page:this.page,
						num:this.pageSize
					},
					success: (res) => {
						//除上拉加载以外的刷新请求。。页面参数清零
						if (isType != 'pullDownRefresh') this.list = []
						this.list=[...this.list,...res.data]
						// 判断请求状态
						this.status = (res.data.length < this.pageSize && 'nomore') || 'loading'
						// 判断是否需要重复请求
						if(res.data.length >= this.pageSize){
							this.againRequest=true
							}else{
								this.againRequest=false
							}
					    }
				})
			},
			// 点击头部导航栏
			handler(e){
				//重新定义cid
				this.cid=e
				// 将栏目id存入storage
				uni.setStorageSync('cid',this.cid)
				// 重新请求新闻数据
				this.list=[]
				this.page=1
				this.getNews()
			},
			
			
		},
		// 下拉刷新
		onPullDownRefresh(){
			//请求数据
			this.getNews('refresh')
			// 停止下拉刷新
			uni.stopPullDownRefresh()
		},
		// 上滑请求
		onReachBottom(){
			// 上锁，防止重复请求
			if(this.againRequest){
				setTimeout(()=>{
					this.page++
					this.getNews('pullDownRefresh')
				},500)
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.navscroll{
		height: 100rpx;
		background: #F7F8FA;
		white-space: nowrap;
		.item{
			font-size: 40rpx;
			display: inline-block;
			line-height: 100rpx;
			padding: 0 30rpx;
		}
	}
	.content{
		padding: 30rpx;
		.row{
			border-bottom: 1px dotted #efefef;
			padding: 15rpx 0;
		}
	}
	.active{
		color: #2fc37d;
	}
</style>
