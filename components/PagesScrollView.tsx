// 公共页面。
import type { PropsWithChildren } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import { ScreenProps, Stack } from 'expo-router';


// 用于使用了顶部栏的页面 headerShown: true
export const ScrollViews = ({ children }: any) => {
  return <ThemedView style={styles.container}>
    <ScrollView
    >
      <ThemedView style={styles.content}>{children}</ThemedView>
    </ScrollView>
  </ThemedView>
}


// SafeAreaView 使用需要搭配没有顶部导航栏的页面 headerShown: false
type Props = PropsWithChildren<{
  options?: ScreenProps['options']
}>;

export default function PagesScrollView({
  children, options = undefined
}: Props) {
  const newOp: any = options
  return (
    <>
      {options && <Stack.Screen options={options} />}
      {newOp?.headerShown === true ? <ScrollViews>{children}</ScrollViews> :
        <SafeAreaView
          style={{ flex: 1 }}
        >
          <ScrollViews>{children}</ScrollViews>
        </SafeAreaView>}
    </>
  );
}

const styles = StyleSheet.create({

  container: {
    // 设置页面高度
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
    gap: 16,
    overflow: 'hidden',
  },
});
