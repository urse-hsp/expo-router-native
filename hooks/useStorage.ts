import AsyncStorage from '@react-native-async-storage/async-storage'
import { APP_NAME } from '@/constants/config'
export const STORAGE_PREFIX = APP_NAME + '_'

/**
 *
 * @param name 必填 存储的名称
 * @returns
 */
export default function useStorage(name: string) {
  // 获取数据

  const loadData = async (then = (data: any) => {}, err = () => {}) => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_PREFIX + name)
      if (stored !== null) {
        then?.(JSON.parse(stored)) // 如果有数据，则更新状态
      } else {
        err?.()
      }
    } catch (error) {
      console.error('Failed to load data:', error)
    }
  }

  // 保存数据
  const saveData = async (data: any, Callback = () => {}) => {
    try {
      await AsyncStorage.setItem(STORAGE_PREFIX + name, JSON.stringify(data))
      Callback?.()
      return
    } catch (error) {
      console.error('Failed to save data:', error)
    }
  }

  // 删除数据
  const deleteData = async (Callback = () => {}) => {
    try {
      await AsyncStorage.removeItem(STORAGE_PREFIX + name)
      Callback?.()
      return
    } catch (error) {
      console.error('Failed to delete data:', error)
    }
  }

  return { saveData, loadData, deleteData }
}
