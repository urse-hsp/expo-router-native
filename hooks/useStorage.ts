import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_NAME } from '@/constants/config'
const STORAGE_PREFIX = APP_NAME + '_';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export default function useStorage() {
  // 获取数据
  const loadData = async (Callback = (data: any) => { }) => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_PREFIX + 'appInfo');
      if (stored !== null) {
        Callback?.(stored)// 如果有数据，则更新状态
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  // 保存数据
  const saveData = async (data: any, Callback = () => { }) => {
    try {
      await AsyncStorage.setItem(STORAGE_PREFIX + 'appInfo', data);
      Callback?.()
      return
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  };
  return { saveData, loadData }
}

