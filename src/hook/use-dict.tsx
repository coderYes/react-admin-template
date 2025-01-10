import { useState, useEffect, useMemo } from 'react'
import { getDictByKey } from '@/api/dict'
import { DictValueType } from '@/store/dict'
import rootStore from '@/store'

export function useDict(dictType: string) {
  const { dictStore } = rootStore

  const [dictData, setDictData] = useState<DictValueType[]>(() => {
    const dicts = dictStore.getDict(dictType)
    return dicts || []
  })

  useEffect(() => {
    if (dictData.length === 0) {
      getDictByKey(dictType).then((res) => {
        const newDictData = res.data.map((p: any) => ({
          label: p.dictLabel,
          value: p.dictValue,
          elTagType: p.listClass,
          elTagClass: p.cssClass
        }))
        if (newDictData.length > 0) {
          setDictData(newDictData)
          dictStore.setDict(dictType, newDictData)
        }
      })
    }
  }, [dictType, dictData.length, dictStore])

  return useMemo(() => dictData, [dictData])
}
