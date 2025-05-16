import request, { IResponseType } from '@/service'
import { IDictDataType } from '@/types/dict'

/**
 * 获取字典数据
 * @param dictCode 字典类型
 * @returns
 */
export function getDictByCode(dictCode: string) {
  return request.get<IResponseType<IDictDataType>>({
    url: `/system/dict/data/code/${dictCode}`
  })
}

/**
 * 获取字典列表
 * @returns
 */
export function getDict(params: any) {
  return request.get({
    url: '/system/dict/list',
    params
  })
}

/**
 * 新增字典类型
 * @returns
 */
export function addDict(data: any) {
  return request.post({
    url: '/system/dict/add',
    data
  })
}

/**
 * 删除字典类型
 * @returns
 */
export function delDict(ids: string) {
  return request.delete({
    url: '/system/dict/delete/' + ids
  })
}

/**
 * 修改字典类型
 * @returns
 */
export function updateDict(data: any) {
  return request.put({
    url: '/system/dict/edit',
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
 * @param dictCode 字典编码
 * @returns
 */
export function getDictCode(dictCode: string) {
  return request.get({
    url: `/system/dict/${dictCode}`
  })
}

/**
 * 刷新字典缓存
 * @returns
 */
export function refreshCache() {
  return request.delete({
    url: '/system/dict/refreshCache'
  })
}

/**
 * 批量操作字典数据
 * @param dictCode 字典编码
 * @param data 字典数据
 * @returns
 */
export function batchDictData(dictCode: string, data: IDictDataType[]) {
  return request.post({
    url: `/system/dict/data/batchDictData/${dictCode}`,
    data
  })
}
