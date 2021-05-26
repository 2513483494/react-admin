//格式化时间，以我们想要的格式返回
export default function formatTime(currTime){
    const time = new Date(currTime)
    return `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
}