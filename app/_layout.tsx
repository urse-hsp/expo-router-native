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
import AppProvider from '@/models/app';
import {
  Provider as AtdProvider
} from '@ant-design/react-native'
// Prevent the splash screen from auto-hiding before asset loading is complete.
import { antd_theme, themeColor, Colors } from '@/constants/Colors'
import { themeType } from '@/constants/config'
import 'expo-dev-client';
import Constants from "expo-constants";

SplashScreen.preventAutoHideAsync();


export default function RootLayout() {

  console.log(process.env, '123');

  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  // 登录权限
  // const { user } = useAuth();
  // if (!user) {
  //   return <Redirect href="/login" />;
  // }

  console.log(colorScheme, 'colorScheme');

  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme
  const MyTheme = {
    ...theme,
    colors: {
      ...theme.colors,
      background: 'rgb(140, 201, 125)',
      primary: themeColor,
    },
    dark: true,
  };

  return (
    <AppProvider>
      <SafeAreaProvider initialMetrics={null}>
        <ThemeProvider value={MyTheme}>
          <AtdProvider theme={antd_theme[colorScheme ?? themeType]} >
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
          </AtdProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </AppProvider>
  );
}
