import React, { createContext, useState, useContext, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useStorage from '@/hooks/useStorage'
import { dataType } from '@/utils/apiList'

// 创建 Context
export const AppContext = createContext();

// AppProvider 组件，用来包裹需要使用状态的组件
const AppProvider = ({ children }: any) => {
  const { saveData, loadData } = useStorage()
  const [appInfo, setAppInfo] = useState<dataType<any> | null>(null);

  const toggleApp = (data: dataType<any>) => {
    saveData(data, () => {
      setAppInfo(data);  // 如果有数据，则更新状态
    })
  };

  useEffect(() => {
    // 组件加载时读取数据
    loadData((stored) => {
      setAppInfo(stored)
    })
  }, []);

  return (
    <AppContext.Provider value={{ appInfo, toggleApp }}>
      {children}
    </AppContext.Provider>
  );
};

// 使用 AppContext 的组件
// const { App, toggleApp } = useContext(AppContext);
export default AppProvider