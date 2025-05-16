import { DictValueType } from '@/store/dict'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 根据字典值翻译字典名称
 * @param DictData 字典数据集合
 * @param value 字典值
 * @param isNumber 是否启用数字匹配模式
 * @returns 匹配到的字典名称，未找到时返回空字符串
 */
export function getDictionaryTextByValue(
  DictData: DictValueType[],
  value: string | number,
  isNumber = false
) {
  // 处理空值情况
  if (!DictData?.length || value === undefined || value === null) {
    return ''
  }

  // 统一转换为字符串进行比较
  const stringValue = String(value).trim()

  // 查找匹配项
  const foundItem = DictData.find((item) => {
    // 根据 isNumber 标志决定比较方式
    if (isNumber) {
      // 数字比较：尝试转换双方为数字
      const itemNumber = Number(item.value)
      const valueNumber = Number(value)
      return !isNaN(itemNumber) && !isNaN(valueNumber) && itemNumber === valueNumber
    }

    // 字符串比较：忽略前后空格
    return String(item.value).trim() === stringValue
  })

  // 返回匹配项的标签或空字符串
  return foundItem?.label || ''
}

/**
 * 数据源检查重复值校验
 * @param data 要校验的数组
 * @param field 要校验的字段名
 * @returns 有重复返回false，无重复返回true
 */
export function checkDuplicate<T>(data: T[], field: keyof T) {
  const values = data.map((item) => item[field])
  const isUnique = new Set(values).size === values.length
  return isUnique
}
