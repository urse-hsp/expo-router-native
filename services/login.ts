import { useGetRequest, useTriggerRequest } from '@/hooks/useRequest'
import apiList from '@/utils/apiList'

export const useTopicDetails = (id?: number | string) => {
  return useGetRequest({
    ...apiList.demo,
    // data: { id },
  })
}

export const useTopicDetailsTrigger = () => {
  return useTriggerRequest({
    ...apiList.demo,
  })
}

// 登录
export const useTopicLogin = () => {
  return useTriggerRequest({
    ...apiList.login,
  })
}

// 发送邮箱验证码
export const useSendEmailVerification = () => {
  return useTriggerRequest({
    ...apiList.sendEmailVerification,
  })
}

// 用户注册
export const useRegister = () => {
  return useTriggerRequest({
    ...apiList.register,
  })
}
