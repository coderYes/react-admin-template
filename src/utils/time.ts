import dayjs from 'dayjs'

/**
 * get timeStamp
 * @returns
 */
export function getTimeStamp() {
  return new Date().getTime().toString()
}

/**
 * 格式化时间
 * @param date - 要格式化的日期
 * @param format - 格式化字符串，默认为 'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化后的日期字符串
 */
export function formatDate(
  date: Date | string | number,
  format: string = 'YYYY-MM-DD HH:mm:ss'
): string {
  return dayjs(date).format(format)
}
