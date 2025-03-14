import { API_BASE_URL } from '@/constants/config'
import { Toast } from '@ant-design/react-native'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import { STORAGE_PREFIX } from '@/hooks/useStorage'
// import { APPSTORAGENAME } from '@/models/app'
import { AppContext } from '@/models/app'
import { useContext } from 'react'

export const useFetcher = () => {
  const { exit }: any = useContext(AppContext)

  const request = async (
    endpoint: string,
    method = 'GET',
    body = null, // POST/PUT 的时候需要填写
  ) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers: {
          // 'Content-Type': 'application/json',
          // 如果需要添加 token 或其他认证信息，可以在这里加
          // 'Authorization': `Bearer ${token}`,
        },
        body: body ? JSON.stringify(body) : null,
      })
      const result = await response.json()
      if (result?.code === 401) {
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
