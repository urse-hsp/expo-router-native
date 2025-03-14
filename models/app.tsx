import React, { createContext, useState, useEffect } from 'react'
import useStorage from '@/hooks/useStorage'
import { dataType } from '@/utils/apiList'
import { useRouter } from 'expo-router'
import Toast from 'react-native-toast-message'

export const APPSTORAGENAME = 'appInfo'

// 创建 Context
export const AppContext = createContext()

// AppProvider 组件，用来包裹需要使用状态的组件
const AppProvider = ({ children }: any) => {
  const { saveData, loadData, deleteData } = useStorage(APPSTORAGENAME)
  const [appInfo, setAppInfo] = useState<dataType<any> | null>(null)
  const router = useRouter()

  const setAppData = (data: dataType<any>) => {
    saveData(data, () => {
      setAppInfo(data) // 如果有数据，则更新状态
    })
  }

  useEffect(() => {
    // 组件加载时读取数据
    loadData(
      (stored) => {
        setAppInfo(stored)
      },
      () => {
        router.replace('/login')
      },
    )
  }, [])

  // 退出
  const exit = () => {
    deleteData(() => {
      setAppInfo(null)
      router.replace('/login')
      Toast.show({
        type: 'success',
        text1: '退出成功',
      })
    })
  }

  return (
    <AppContext.Provider value={{ appInfo, setAppData, exit }}>
      {children}
    </AppContext.Provider>
  )
}

// 使用 AppContext 的组件
// const { App, setAppData } = useContext(AppContext);
export default AppProvider
