import React, { useState } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { Tabs } from '@ant-design/react-native'
import { themeColor } from '@/constants/Colors'
import OrderList from './orderList'
import NftList from './nftList'

const ProfileScreen = ({ navigation }: any) => {
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+123456789',
    avatar: 'https://a.520gexing.com/uploads/allimg/2021042109/uqaqhuvavt0.jpg', // 用户头像的URL
    interests: ['Reading', 'Traveling', 'Photography'], // 用户的兴趣爱好
  }

  const tabs = [
    { title: '我的藏品', value: 0 },
    { title: '订单列表', value: 1 },
  ]
  const [initialPage, setInitialPage] = useState(0)

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <View style={styles.header}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View>
            <ThemedText style={styles.name}>{user.name}</ThemedText>
            <ThemedText style={styles.email}>{user.email}</ThemedText>
          </View>
        </View>
      }
    >
      <Tabs
        tabs={tabs}
        page={initialPage}
        onTabClick={(page: any) => {
          setInitialPage(page.value)
        }}
        tabBarBackgroundColor="transparent"
        tabBarActiveTextColor={themeColor}
        tabBarInactiveTextColor="#333"
        // tabBarTextStyle={{ fontSize: 16 }}
        style={{ padding: 0, width: '100%' }}
      />
      <View style={styles.content}>
        {initialPage === 0 ? <NftList /> : <OrderList />}
      </View>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },

  interestItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },

  //
  header: {
    height: '100%',
    padding: 22,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  content: {
    paddingTop: 10,
  },
})

export default ProfileScreen
