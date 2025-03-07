import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import PagesScrollView from '@/components/PagesScrollView';
import { ThemedText } from '@/components/ThemedText';
import ExternalLink from '@/components/ExternalLink';

export default function HomeScreen() {
  return (
    <PagesScrollView style={styles.container}>
      <ThemedText>Home</ThemedText>
      <ExternalLink href="/details/1">
        <ThemedText>View first user details</ThemedText>
      </ExternalLink>
      <ExternalLink href="/details/2">
        <ThemedText>View second user details</ThemedText>
      </ExternalLink>
      <ExternalLink
        href={{
          pathname: '/details/[id]',
          params: { id: 'bacon' },
        }}
      >
        <ThemedText>View user details</ThemedText>
      </ExternalLink>
    </PagesScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
