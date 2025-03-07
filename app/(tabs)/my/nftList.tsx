import React from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';

interface IndexType {
  isVisible?: boolean;
  onClose?: () => any;
}

const Index: React.FC<IndexType> = (props) => {
  return (
    <ThemedView>
      <FlatList
        data={['Reading', 'Traveling', 'Photography', 'Cooking', 'Music']}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.interestItem]}>
            <ThemedText>{item}</ThemedText>
          </TouchableOpacity>
        )}
        // keyExtractor={(item) => item}
      />
    </ThemedView>
  );
};
export default Index;

const styles = StyleSheet.create({
  interestItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
});
