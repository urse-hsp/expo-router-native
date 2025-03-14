import React, { useState, useContext } from 'react'
import { Image, StyleSheet } from 'react-native'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { Tabs } from '@ant-design/react-native'
import { themeColor } from '@/constants/Colors'
import OrderList from '@/app/my/orderList'
import NftList from '@/app/my/nftList'
import { View, TouchableOpacity } from 'react-native'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { useColorScheme } from '@/hooks/useColorScheme'
import { Colors } from '@/constants/Colors'
import { themeType } from '@/constants/config'
import { useRouter } from 'expo-router'
import { useInfoAccount } from '@/services/my'
import { AppContext } from '@/models/app'

const ProfileScreen = ({ navigation }: any) => {
  const { data } = useInfoAccount()
  const { appInfo }: any = useContext(AppContext)

  const user = {
    name: appInfo?.nick_name,
    email: appInfo?.email,
    avatar: 'https://a.520gexing.com/uploads/allimg/2021042109/uqaqhuvavt0.jpg', // 用户头像的URL
  }

  const tabs = [
    { title: '我的藏品', value: 0 },
    { title: '订单列表', value: 1 },
  ]
  const [initialPage, setInitialPage] = useState(0)
  const colorScheme = useColorScheme()
  const router = useRouter()

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
          <View style={styles.right}>
            <TouchableOpacity onPress={() => router.push('/my/settings')}>
              <IconSymbol
                size={28}
                name="dehaze:fill"
                color={Colors[colorScheme ?? themeType].tint}
              />
            </TouchableOpacity>
          </View>
        </View>
      }
    >
      <View>
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
      </View>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  right: {
    flex: 1,
    alignItems: 'flex-end',
    height: '100%',
    justifyContent: 'flex-start',
  },
})

export default ProfileScreen
