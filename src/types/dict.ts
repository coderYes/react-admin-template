export interface IDictType {
  id: number
  dictCode: string
  dictName: string
  remark?: string
  status: number
  createBy: string
  createTime: string
  updateBy: string
  updateTime: string | null
}
export interface IDictDataType {
  id?: number
  dictCode?: string
  dictLabel?: string
  dictValue?: string
  dictDesc?: string
  status?: number
  sort?: number
  createTime?: string
  createBy?: string
  updateTime?: string
  updateBy?: string
}
