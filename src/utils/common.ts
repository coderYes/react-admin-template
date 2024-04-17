/**
 * 导入图片
 * @param url 传入的路径
 * @returns
 */
export function requireAssetsImg(url: string) {
  return new URL(`../assets/${url}`, import.meta.url).href
}
