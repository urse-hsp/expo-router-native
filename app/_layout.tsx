// 跟目录
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context'; // 双端安全区
import { useColorScheme } from '@/hooks/useColorScheme';
import { Redirect } from 'expo-router';
import AppProvider from '@/models/app';
import {
  Provider
} from '@ant-design/react-native'
// Prevent the splash screen from auto-hiding before asset loading is complete.
import { antd_dark, themeColor } from '@/constants/Colors'

SplashScreen.preventAutoHideAsync();



export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }


  // 登录权限
  // const { user } = useAuth();
  // if (!user) {
  //   return <Redirect href="/login" />;
  // }



  return (
    <AppProvider>
      <SafeAreaProvider initialMetrics={null}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Provider theme={colorScheme === 'dark' ? antd_dark : {}} >
            {/* screenOptions标题栏 */}
            <Stack screenOptions={{
              headerStyle: {
                backgroundColor: themeColor,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerShown: false // 隐藏底部导航栏，PagesScrollView使用SafeAreaView统一处理安全区
            }}
            >
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'auto'} />
          </Provider>
        </ThemeProvider>
      </SafeAreaProvider>
    </AppProvider>
  );
}
