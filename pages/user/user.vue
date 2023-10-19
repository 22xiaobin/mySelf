<template>
  <view class="content">
    <!-- 滚动条 -->
    <view>
      <uni-notice-bar show-icon scrollable :text="noticeList" speed="50" />
      <uni-notice-bar show-icon scrollable :text="notice" speed="50" />
    </view>
    <!-- 轮播图 -->
    <swiper class="swiper" indicator-dots="true" circular="true">
      <swiper-item class="swiper-item" v-for="item in picList" :key="item.id">
        <image :src="item.url" mode="aspectFill"></image>
      </swiper-item>
    </swiper>

    <view class="box">
      <!-- 时间选择器 -->
      <view class="uni-list">
        <view class="uni-list-cell">
          <view class="uni-list-cell-left"> 当前选择: </view>
          <view class="uni-list-cell-db" style="background-color: skyblue; width: 100px">
            <picker mode="time" :value="time" start="00:00" end="23:59" @change="bindTimeChange">
              <view class="uni-input">{{ time }}</view>
            </picker>
          </view>
        </view>
      </view>
      <!-- 倒计时 -->
      <view>
        <view class="money">
          金额：
          <u-count-to
            v-if="showCountDown"
            :start-val="startVal"
            :end-val="endVal"
            :duration="duration"
            decimals="3"
            :color="skyblue"
            :use-easing="false"
            @end="countEnd"
          ></u-count-to
        ></view>
      </view>
      <view class="remainTime" style="display: flex">
        <text>剩余时间：</text>
        <uni-countdown
          v-if="showCountDown"
          :show-day="false"
          :hour="lastHour"
          :minute="lastMinute"
          :second="lastSecond"
        ></uni-countdown>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      dayTime: '', //当天时间
      noticeList: ['此页面使用组件：', '消息滚动', '轮播图', '倒计时', '此条消息为数组模式'], //消息数组
      notice: '此页面使用组件：, 消息滚动, 轮播图, 倒计时，此条消息为字符串模式', //消息字符串
      picList: [], //照片数组
      duration: 3000, //倒计时达到目标的时间(以毫秒为单位)
      time: uni.getStorageSync('selectTime') ? uni.getStorageSync('selectTime') : '12:00', //选择的时间
      lastHour: '1', //倒计时  小时
      lastMinute: '1', //倒计时  分钟
      lastSecond: '1', //倒计时  秒钟
      showCountDown: true, //是否展示倒计时
      money: 200, // 总金额
      startVal: 0, //数字滚动开始值
      endVal: 200, //数字滚动开始值

      testTime: '', //临时
    };
  },
  onLoad() {
    this.getSwiperPic();
    this.dayTime = this.getNewTime();

    // this.startVal = 0;
    // 倒计时
    let jieTime = this.dayTime.slice(0, 11);

    this.getMidnightTimestamp(`${jieTime}${this.time}`);
  },

  methods: {
    // 获取照片数据
    getSwiperPic() {
      uni.request({
        url: 'https://api.thecatapi.com/v1/images/search?limit=2',
        method: 'GET',
        success: ({ data }) => {
          for (let k = 0; k < data.length; k++) {
            if (data[k].url.slice(-3) !== 'gif') {
              this.picList.push(data[k]);
            }
          }
        },
      });
    },

    //获取现在时间   '2023-09-22 17:31:49'
    getNewTime() {
      // 获取当前时间
      let currentDate = new Date();

      // 获取年份
      let year = currentDate.getFullYear();

      // 获取月份（注意月份从0开始，所以需要加1）
      let month = currentDate.getMonth() + 1;

      // 获取日期
      let date = currentDate.getDate();

      // 获取小时，并转换为两位数格式
      let hours = ('0' + currentDate.getHours()).slice(-2);

      // 获取分钟，并转换为两位数格式
      let minutes = ('0' + currentDate.getMinutes()).slice(-2);

      // 获取秒钟，并转换为两位数格式
      let seconds = ('0' + currentDate.getSeconds()).slice(-2);

      let time = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;

      //进行滚动
      this.countTo(time);

      return time;
    },

    // 获取到指定时间的剩余时间戳
    getMidnightTimestamp(timeString) {
      let newTime = new Date(timeString).getTime(); // 获取时间戳（以毫秒为单位）
      let oldTime = new Date().getTime();
      const timestamp = newTime - oldTime;

      // 获取到剩余时间
      this.testTime = timestamp;

      let hours = Math.floor(timestamp / (1000 * 60 * 60));
      let minutes = Math.floor((timestamp % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((timestamp % (1000 * 60)) / 1000);

      this.lastHour = this.padZero(hours);
      this.lastMinute = this.padZero(minutes);
      this.lastSecond = this.padZero(seconds);

      // const time = `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
    },

    /**
     * 数字滚动
     * @param{String} timeString 接收的是年月日时分秒  例如：'2023-09-22 17:31:49'
     */
    countTo(timeString) {
      this.startVal = 0;
      this.duration = 3000;
      // 获取到年月日+''
      let NYR = timeString.slice(0, 11);

      // 获取到时分秒
      let SFM = timeString.slice(11, 19);

      // 定义工作时间和总收入
      const startTime = `${NYR}09:00`; // 开始时间（小时）
      const endTime = uni.getStorageSync('selectTime'); // 结束时间
      const totalIncome = this.money; // 总收入（元）

      // 计算总工作时间
      const totalWorkHours = new Date(`${NYR}${uni.getStorageSync('selectTime')}`) - new Date(startTime);

      // 计算每秒收入
      const hourlyIncome = totalIncome / (totalWorkHours / 1000);
      // 现在时间
      const specifiedTime = new Date(timeString);
      // 从开始到现在
      const workedHours = (specifiedTime - new Date(startTime)) / 1000;

      // 计算到指定时间时的收入
      const moneyAtSpecifiedTime = hourlyIncome * workedHours;

      this.endVal = moneyAtSpecifiedTime;
    },

    // 防止时分秒为一位
    padZero(value) {
      return value.toString().padStart(2, '0');
    },

    // 选择时间
    bindTimeChange(e) {
      this.showCountDown = false;
      this.time = e.detail.value;
      uni.setStorageSync('selectTime', this.time);

      this.getNewTime();

      // 倒计时
      let jieTime = this.dayTime.slice(0, 11);

      this.getMidnightTimestamp(`${jieTime}${this.time}`);

      // 防止选了时间之后页面不刷新
      this.$nextTick(() => {
        this.showCountDown = true;
      });
    },

    countEnd() {
      console.log('数字滚动到目标值');
      this.countVal = 100; // 在数字滚动结束时将 countVal 赋值为 100
      this.startVal = this.endVal;
      // 重新赋值到期时间
      this.duration = this.testTime;
      // 重新赋值到期金额
      this.endVal = 200;
    },
  },
};
</script>

<style lang="scss">
.content {
  // display: flex; //就是这一句代码惹的祸
  .swiper {
    height: 250px;
    .swiper-item {
      overflow: hidden;
      image {
        width: 100vw;
        height: 100%;
      }
    }
  }
}
.box {
  border: 1px solid yellowgreen;
  padding: 40rpx 0rpx;
  margin: 20rpx 10rpx;
  text-align: center;
  display: flex;
  flex-flow: column;
  align-items: center;
}

.money {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 50px;
  font-size: 20px;
  border: 1px solid skyblue;
  text-align: center;
  line-height: 50px;
}
.remainTime {
  @extend .money;
}
</style>
