<template>
	<view class="container">
		<!-- 标题 -->
		<view class="title">{{list.title}}</view>
		<!-- 编辑 与 发布信息 -->
		<view class="publish">
			<text>编辑：{{list.author}}</text>
			<text>发布时间：{{list.posttime}}</text>
		</view>
		<!-- 新闻详情 -->
		<view class="show">
			<rich-text :nodes="list.content"></rich-text>		
		</view>
		<!-- 免责声明  -->
		<view class="description">
			声明：本站的内容均采集与腾讯新闻，如果侵权请联系管理（513894357@qq.com）进行整改删除，本站进行了内容采集不代表本站及作者观点，若有侵犯请及时联系管理员，谢谢您的支持。
		</view>
	</view>
</template>

<script >
	import formatTimestamp from '@/common/getDay.js'
	export default {
		data() {
			return {
				list:{
					// title:'',//标题
					// author:'',//作者
					// picurl:'',//缩略图地址
					// posttime:'',//发布时间
					// classid:'',//栏目id
					// hits:'',//阅读量
					// content:'',//详情内容
				},
				id:'',
				historyList:[],//浏览历史记录
			};
		},
		// Newsbox通过navigatorTo传值，使用onload接收
		onLoad(e) {
			// 将当前新闻id传值  使用 promise 方法
			this.getlistDetails(e).then((res)=>{
				// 赋值给展示出来
				this.list=res
				// 先取出历史记录,如果有就取出，没有就设为空
				this.historyList= uni.getStorageSync('historyList') || []
				
				// 判断 历史记录 中是否有值

				let index=this.historyList.findIndex(item=>item.id==res.id);
				
				if( index != -1){
					this.historyList.splice(index,1)
				}
				
				// 赋值给历史记录，存起来
				this.historyList.unshift(res)
				uni.setStorageSync('historyList',this.historyList)
			})
			
			//使用 async 方法
			// this.getlistDetails(e)
		},
		methods:{
			// 获取新闻详情
			 getlistDetails(e){
				 return new Promise((reslove,reject)=>{
					 uni.request({
					 	url:"https://ku.qingnian8.com/dataApi/news/detail.php",
					 	data:{
					 		cid:uni.getStorageSync('cid'),	//当前栏目id
					 		id:e.id,		//当前新闻id
					 	},
					 	success:(res)=> {
							// 调整发布时间
							let time=formatTimestamp(res.data.posttime)
							// 重新赋值
							res.data.posttime=time
							res.data.content=res.data.content.replace(/<img/gi,'<img style="max-width:100%"')	
							// 设置导航栏上的文字
					 		uni.setNavigationBarTitle({
					 			title:res.data.title
					 		})
							// 返回值
							reslove(res.data)
					 	}
					 })
				 })
			},
			
			//	获取新闻详情 异步方法  async
			// async getlistDetails(e) {
			//   try {
			//     const res = await uni.request({
			//       url: "https://ku.qingnian8.com/dataApi/news/detail.php",
			//       data: {
			//         cid: uni.getStorageSync('cid'), //当前栏目id
			//         id: e.id, //当前新闻id
			//       },
			//     });
			//     this.list = res.data;
			//     return this.list;
			//   } catch (error) {
			//     throw new Error(error);
			//   }
			// },
			
			
		},
		
	}
</script>

<style lang="scss">
	.container{
		padding: 30rpx;
		.title {
			font-size: 20px;
			font-weight: 700;
		}
		.publish {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 12px;
			background-color: #f6f6f6;
			padding: 15rpx;
			margin: 30rpx 0;
		}
		.show{
			font-size: 14px;
		}
		.description{
				background: #FEF0F0;
				font-size: 26rpx;
				padding:20rpx;
				color:#F89898;
				line-height: 1.8em;
			}
	}

</style>
