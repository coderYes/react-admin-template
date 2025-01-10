import request from '@/service'

/**
 * 获取字典数据
 * @param dictCode 字典类型
 * @returns
 */
export function getDictByKey(dictCode: string) {
  return request.get({
    url: `/system/dict/data/type/${dictCode}`
  })
}

/**
 * 获取字典列表
 * @returns
 */
export function getDict(params: any) {
  return request.get({
    url: '/system/dict/type/list',
    params
  })
}

/**
 * 新增字典类型
 * @returns
 */
export function addDict(data: any) {
  return request.post({
    url: '/system/dict/type',
    data
  })
}

/**
 * 删除字典类型
 * @returns
 */
export function delDict(ids: string) {
  return request.delete({
    url: '/system/dict/type/' + ids
  })
}

/**
 * 修改字典类型
 * @returns
 */
export function updateDict(data: any) {
  return request.put({
    url: '/system/dict/type',
    data
  })
}
