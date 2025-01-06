/**
 * 缓存文件
 * 提供了与浏览器 localStorage 交互的功能，用于存储和检索数据。
 */

/**
 * 将键值对存储到 localStorage 中
 * @param key - 存储键。
 * @param value - 存储值
 */
export function setCache(key: string, value: any) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

/**
 * 从 localStorage 中获取存储的值
 * @param key - 要获取的存储项的键名。
 * @returns 解析后的 JavaScript 对象，如果没有找到对应的键，则返回 null。
 */
export function getCache(key: string) {
  const value = window.localStorage.getItem(key)
  if (!value) return undefined

  try {
    if (value === 'true') return true
    if (value === 'false') return false
    if (value === 'null') return null
    return JSON.parse(value)
  } catch (error) {
    if (error instanceof SyntaxError) {
      return value
    }
    throw error
  }
}

/**
 * 从 localStorage 中移除指定的键值对。
 * @param key - 要移除的存储项的键名。
 */
export function deleteCache(key: string) {
  window.localStorage.removeItem(key)
}

/**
 * 清空整个 localStorage。
 */
export function clearCache() {
  window.localStorage.clear()
}
