import React from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

interface IndexType {
  isVisible?: boolean;
  onClose?: () => any;
}

const Index: React.FC<IndexType> = (props) => {
  return (
    <ThemedView>
      <ThemedText>order</ThemedText>
    </ThemedView>
  );
};
export default Index;
