export interface DictType {
  dictId?: string
  dictName: string
  dictType: string
  status: string
  createBy?: string
  createTime?: string
  updateBy?: string
  updateTime?: string | null
  remark?: string
}
export interface DictDataType {
  dictCode: string
  dictSort: number
  dictLabel: string
  dictValue: string
  dictType: string
  cssClass: string
  listClass: string
  isDefault: string
  status: string
  createBy: string
  createTime: string
  updateBy: string
  updateTime: string | null
  remark: string
}
