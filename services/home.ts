import { useGetRequest, useTriggerRequest } from '@/hooks/useRequest'
import apiList from '@/utils/apiList'

// 获取商品列表
export const useListGoods = (id?: number | string) => {
  return useGetRequest({
    ...apiList.listGoods,
    data: { id: 1 },
  })
}
