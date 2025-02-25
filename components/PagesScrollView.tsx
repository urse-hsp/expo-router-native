// 公共页面。
import type { PropsWithChildren } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import { Flex, View } from '@ant-design/react-native';


type Props = PropsWithChildren<{
  // headerImage?: ReactElement;
  // headerBackgroundColor: { dark: string; light: string };
}>;

export default function PagesScrollView({
  children,
}: Props) {

  return (
    <SafeAreaView
      style={{ flex: 1 }}
    >
      <ThemedView style={styles.container}>
        <ScrollView
        >
          <ThemedView style={styles.content}>{children}</ThemedView>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
    gap: 16,
    overflow: 'hidden',
  },
});
