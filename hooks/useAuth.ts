import { AppContext } from '@/models/app'
import { useContext } from 'react'
import { Platform } from 'react-native'

export const useAuth = () => {
  const { appInfo }: any = useContext(AppContext)

  if (Platform.OS === 'web') {
    // Windows 环境，使用本地获取方案
    let data =
      window.localStorage.getItem('TrustBase_appInfo') ||
      window.localStorage.getItem('TrustBase_appInfo')
    const token = data ? JSON.parse(data).token : null

    return token || false
  } else {
    // 非 Windows 环境，使用上下文中的数据
    return appInfo?.token || false
  }
}

export default useAuth
