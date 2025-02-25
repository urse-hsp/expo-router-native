import { StyleSheet, Image, Platform, ScrollView } from 'react-native';

import PagesScrollView from '@/components/PagesScrollView';


export default function LoginScreen() {
  return <PagesScrollView>1</PagesScrollView>
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
