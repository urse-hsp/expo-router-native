import { StyleSheet } from 'react-native';
import PagesScrollView from '@/components/PagesScrollView';
import {  View } from '@ant-design/react-native';


export default function LoginScreen() {

  return <PagesScrollView options={{
    title: '登录',
    headerShown: true
  }}>

    <View>123455</View>
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