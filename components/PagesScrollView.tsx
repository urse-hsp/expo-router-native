// 公共页面。
import type { PropsWithChildren } from 'react';
import { StyleSheet, ScrollView } from 'react-native';


import { ThemedView } from '@/components/ThemedView';


type Props = PropsWithChildren<{
  // headerImage?: ReactElement;
  // headerBackgroundColor: { dark: string; light: string };
}>;

export default function PagesScrollView({
  children,
}: Props) {

  return (
    <ThemedView style={styles.container}>
      <ScrollView
      >
        <ThemedView style={styles.content}>{children}</ThemedView>
      </ScrollView>
    </ThemedView>
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
