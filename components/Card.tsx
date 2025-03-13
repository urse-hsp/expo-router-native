import React from 'react'
import ThemedView from '@/components/ThemedView'
import { StyleSheet } from 'react-native'
import type { PropsWithChildren } from 'react'
import { StyleProp, ViewStyle } from 'react-native'

type Props = PropsWithChildren<{
  style?: StyleProp<ViewStyle>
}>

const Index: React.FC<Props> = ({ children, style }) => {
  return (
    <ThemedView style={{ ...styles.container, ...style }}>
      {children}
    </ThemedView>
  )
}
export default Index

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#1D1D1D',
    borderRadius: 12,
    marginTop: 12,
    color: '#FFFFFF',
    fontSize: 14,
  },
})
