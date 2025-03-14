import { useGetRequest, useTriggerRequest } from '@/hooks/useRequest'
import apiList from '@/utils/apiList'

// 获取用户信息
export const useInfoAccount = (id?: number | string) => {
  return useGetRequest({
    ...apiList.infoAccount,
  })
}
