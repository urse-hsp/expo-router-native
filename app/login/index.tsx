import { StyleSheet } from 'react-native';
import PagesScrollView from '@/components/PagesScrollView';
import { View } from '@ant-design/react-native';
import React, { createContext, useState, useContext } from 'react';
import { AppContext } from '@/models/app';


export default function LoginScreen() {
  const { appInfo, toggleApp }: any = useContext(AppContext);
  console.log(appInfo, 'App');

  return <PagesScrollView options={{
    title: '登录',
    headerShown: true
  }}>

    <View onPress={() => toggleApp(2)}>123455</View>
  </PagesScrollView>
}

const styles = StyleSheet.create({
  // headerImage: {
  //   color: '#808080',
  //   bottom: -90,
  //   left: -35,
  //   position: 'absolute',
  // },
  // titleContainer: {
  //   flexDirection: 'row',
  //   gap: 8,
  // },
});