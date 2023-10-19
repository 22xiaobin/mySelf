// 获取时间
function formatTimestamp(timestamp) {
  const date = new Date(Number(timestamp));
  const year = date.getFullYear();
  let  month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  
  
// forEach 方法   没有返回值，对原始数组进行操作。
//  let arr=[month,day,hours,minutes,seconds];
//  arr.forEach((item,index)=>{
// 		arr[index]=addString(item)
// })
// console.log(arr);

// map 方法    返回一个新数组	，原始数组不会发生改变
let arr=[month,day,hours,minutes,seconds];
arr=arr.map(item=>addString(item))
// console.log(arr);

  return `${year}年-${arr[0]}月-${arr[1]}日 ${arr[2]}:${arr[3]}:${arr[4]}`;
  // return `${year}年-${month}月-${day}日 ${hours}:${minutes}:${seconds}`;
};


// 判断时间前面是否需要加 0
function addString(time ){
	return 	time > 10 ? time : '0'+time
}

export default formatTimestamp