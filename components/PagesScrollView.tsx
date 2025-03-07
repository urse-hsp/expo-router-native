// 公共页面。
import type { PropsWithChildren } from 'react';
import { StyleSheet, ScrollView, StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import { ScreenProps, Stack } from 'expo-router';


// 用于使用了顶部栏的页面 headerShown: true
export const ScrollViews = ({ children, style }: any) => {
  return <ThemedView style={styles.container}>
    <ScrollView
      contentContainerStyle={{ minHeight: '100%' }}
    >
      <ThemedView style={{ ...styles.content, ...style }}>{children}</ThemedView>
    </ScrollView>
  </ThemedView>
}


// SafeAreaView 使用需要搭配没有顶部导航栏的页面 headerShown: false
type Props = PropsWithChildren<{
  options?: ScreenProps['options']
  style?: StyleProp<ViewStyle> | undefined;
}>;

export default function PagesScrollView({
  children, options = undefined,
  style
}: Props) {
  const newOp: any = options
  const View_ = <ScrollViews style={style}>{children}</ScrollViews>
  return (
    <>
      {options && <Stack.Screen options={options} />}
      {newOp?.headerShown === true ? View_ :
        <SafeAreaView
          style={{ flex: 1 }}
        >
          {View_}
        </SafeAreaView>}
    </>
  );
}

const styles = StyleSheet.create({

  container: {
    // 设置页面高度
    flex: 1,
    backgroundColor: 'yellow'
  },
  content: {
    flex: 1,
    padding: 16,
    // gap: 16,
    overflow: 'hidden',
  },
});
