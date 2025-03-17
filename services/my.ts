import { useGetRequest, useTriggerRequest } from '@/hooks/useRequest'
import apiList from '@/utils/apiList'

// 获取用户信息
export const useInfoAccount = (id?: number | string) => {
  return useGetRequest({
    ...apiList.infoAccount,
  })
}

// 订单列表（购买NFT）
export const useListOrder = (id?: number | string) => {
  return useGetRequest({
    ...apiList.listOrder,
    data: {
      order_status: 0,
      // ord: 'desc',
      limit: 100,
      offset: 0,
    },
  })
}

// 订单详情
export const useInfoOrder = (id?: number | string) => {
  return useGetRequest({
    ...apiList.infoOrder,
  })
}

// 已购买NFT列表
export const useListNFT = (id?: number | string) => {
  return useGetRequest({
    ...apiList.listNFT,
    data: {
      nft_status: 0,
      // ord: 'desc',
      limit: 100,
      offset: 0,
    },
  })
}
