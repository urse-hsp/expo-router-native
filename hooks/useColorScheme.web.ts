import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';
import { themeType } from '@/constants/config'

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 * 为了支持静态渲染，需要在 Web 的客户端重新计算此值
 */
export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  // const colorScheme = useRNColorScheme();
  // if (hasHydrated) {
  //   return colorScheme;
  // }

  return themeType; //'light';
}
