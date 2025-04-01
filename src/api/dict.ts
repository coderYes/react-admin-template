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

/**
 * 获取字典数据
 * @param dictId 字典编码
 * @returns
 */
export function getDictDataList(params: any) {
  return request.get({
    url: `/system/dict/data/list`,
    params
  })
}

/**
 * 查询字典类型详细
 * @param dictId 字典编码
 * @returns
 */
export function getDictType(dictId: string) {
  return request.get({
    url: `/system/dict/type/${dictId}`
  })
}

/**
 * 获取字典选择框列表
 * @returns
 */
export function getDictOptionselect() {
  return request.get({
    url: '/system/dict/type/optionselect'
  })
}

/**
 * 新增字典数据
 * @param data
 * @returns
 */
export function addDictData(data: any) {
  return request.post({
    url: '/system/dict/data',
    data
  })
}

/**
 * 修改字典数据
 * @param data
 * @returns
 */
export function updateData(data: any) {
  return request.put({
    url: '/system/dict/data',
    data
  })
}

/**
 * 删除字典数据
 * @param dictCode
 * @returns
 */
export function delDictData(dictCode: string) {
  return request.delete({
    url: `/system/dict/data/${dictCode}`
  })
}

/**
 * 刷新字典缓存
 * @returns
 */
export function refreshCache() {
  return request.delete({
    url: '/system/dict/type/refreshCache'
  })
}
