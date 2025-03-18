import React, { useContext } from 'react'
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native'
import Card from '@/components/Card'
import { ThemedText } from '@/components/ThemedText'
import PagesScrollView from '@/components/PagesScrollView'
import appinfo from '@/app.json'
import { AppContext } from '@/models/app'
import { ScreenProps, Stack } from 'expo-router'

const DATA: any = [
  // {
  //   id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
  //   title: 'First Item',
  // },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: '当前版本',
    value: appinfo.expo.version,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: '退出登录',
    type: 'exit',
  },
]

type ItemProps = { title: string; value: string; type?: string }

const Item = ({ data }: { data: ItemProps }) => {
  const { exit }: any = useContext(AppContext)

  const onClick = () => {
    if (data?.type && data.type === 'exit') {
      console.log('tuic', data)
      exit?.()
    }
  }
  return (
    <Card>
      <TouchableOpacity onPress={onClick} style={styles.item}>
        <ThemedText style={styles.title}>{data.title}</ThemedText>
        {data.value && (
          <ThemedText style={styles.title}>{data.value}</ThemedText>
        )}
      </TouchableOpacity>
    </Card>
  )
}

const App = () => {
  return (
    <PagesScrollView
      options={{
        title: '',
      }}
    >
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item data={item} />}
        keyExtractor={(item) => item.id}
      />
    </PagesScrollView>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
  },
})

export default App
