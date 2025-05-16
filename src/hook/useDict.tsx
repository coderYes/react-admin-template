import { useState, useEffect, useMemo } from 'react'
import { getDictByCode } from '@/api/dict'
import { DictValueType } from '@/store/dict'
import rootStore from '@/store'
import { IDictDataType } from '@/types/dict'

export function useDict(dictCode: string) {
  const { dictStore } = rootStore

  const [dictData, setDictData] = useState<DictValueType[]>(() => {
    const dicts = dictStore.getDict(dictCode)
    return dicts || []
  })

  useEffect(() => {
    if (dictData.length === 0) {
      getDictByCode(dictCode).then((res) => {
        const newDictData = res.data.map((p: IDictDataType) => ({
          label: p.dictLabel,
          value: p.dictValue,
          desc: p.dictDesc,
          sort: p.sort,
          status: p.status
        }))
        if (newDictData.length > 0) {
          setDictData(newDictData)
          dictStore.setDict(dictCode, newDictData)
        }
      })
    }
  }, [dictCode, dictData.length, dictStore])

  return useMemo(() => dictData, [dictData])
}
