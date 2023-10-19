<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/* 写在第一行，style标签需要加入lang="scss" */
	@import "uview-ui/index.scss";
	
	view{
		box-sizing: border-box;
	}
</style>
