export function formatDate(date) {
  const value = new Date(date)
  const now = new Date()
  let rel = parseInt(( now.getTime() - value.getTime()) / 1000)
  let year, month, day
  if (rel < 60) {
    return '刚刚'
  } else if(rel < 60 * 60) {
    return parseInt(rel / 60) + '分钟前'
  } else if(rel < 60 * 60 * 24){
    return parseInt(rel / 3600) + '小时前'
  } else {
    year = value.getFullYear()
    month = value.getMonth()
    day = value.getDay()
    return [year, month, day].join('-')
  }
}
