import { useGetRequest, usePaginationRequest } from '@/hooks/useRequest'
import apiList from '@/utils/apiList'

// 获取商品列表
export const useListGoods = (id?: number | string) => {
  return usePaginationRequest({
    options: apiList.listGoods,
  })
}

// 获取商品列表
export const useInfoGoods = (id?: number | string) => {
  return useGetRequest({
    ...apiList.infoGoods,
    data: { sup_id: id },
  })
}
