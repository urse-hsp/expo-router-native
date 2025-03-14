import { API_BASE_URL } from '@/constants/config'
import { Toast } from '@ant-design/react-native'
import { AppContext } from '@/models/app'
import { useContext } from 'react'
import useAuth from '@/hooks/useAuth'
import { setGetPath } from '@/utils'
import { methodType } from '@/utils/apiList'

export const useFetcher = () => {
  const { exit }: any = useContext(AppContext)
  const token = useAuth()

  const request = async (
    endpoint: string,
    method: methodType = 'GET',
    body = {}, // POST/PUT 的时候需要填写
  ) => {
    try {
      // 处理URL参数
      const path = setGetPath(endpoint ?? '', {
        url: endpoint,
        method: method,
        data: body,
      })

      const response = await fetch(`${API_BASE_URL}${path}`, {
        method,
        headers: {
          // 'Content-Type': 'application/json',
          access_token: token,
        },
        body: body ? JSON.stringify(body) : null,
      })
      const result = await response.json()
      if (result?.code === 401) {
        Toast.show({
          type: 'error',
          content: 'token',
        })
        // 权限过期
        exit()
        return result
      }

      // 报错
      if (result?.code !== 0) {
        Toast.show({
          type: 'error',
          content: result?.msg,
        })
        return result
      }

      return result
    } catch (error) {
      console.error('Request error:', error)
      throw error // 可以根据需要自定义错误处理
    }
  }
  return request
}

// export const get = (endpoint: string) => request(endpoint, 'GET')
// export const post = (endpoint: string, body: any) =>
//   request(endpoint, 'POST', body)
// export const put = (endpoint: string, body: any) =>
//   request(endpoint, 'PUT', body)
// export const del = (endpoint: string) => request(endpoint, 'DELETE')
