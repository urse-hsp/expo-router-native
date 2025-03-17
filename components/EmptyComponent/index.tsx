import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ThemedText } from '@/components/ThemedText'

const EmptyComponent = () => (
  <View style={styles.emptyContainer}>
    <ThemedText style={styles.emptyText}>暂无数据</ThemedText>
  </View>
)

export default EmptyComponent

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
})
