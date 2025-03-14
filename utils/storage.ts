import AsyncStorage from '@react-native-async-storage/async-storage'
import { Platform } from 'react-native'

const isWeb = Platform.OS === 'web'

const Storage = {
  getItem: async (key: string) => {
    if (isWeb) {
      return sessionStorage.getItem(key) || localStorage.getItem(key)
    } else {
      return AsyncStorage.getItem(key)
    }
  },
  setItem: async (key: string, value: string) => {
    if (isWeb) {
      sessionStorage.setItem(key, value)
      localStorage.setItem(key, value)
    } else {
      return AsyncStorage.setItem(key, value)
    }
  },
  removeItem: async (key: string) => {
    if (isWeb) {
      sessionStorage.removeItem(key)
      localStorage.removeItem(key)
    } else {
      return AsyncStorage.removeItem(key)
    }
  },
}

export default Storage
