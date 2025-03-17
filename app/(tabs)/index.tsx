import PagesScrollView from '@/components/PagesScrollView'
import { ThemedText } from '@/components/ThemedText'
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import { Link } from 'expo-router'
import { useListGoods } from '@/services/home'

export const Item = () => {}

export default function HomeScreen({ navigate }: any) {
  const router = useRouter()
  const { data: list, loading, Next } = useListGoods()

  const RenderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.card}
        onPress={() => router.push(`/details/${item.spu_id}`)}
      >
        <Image source={item.image_file} style={styles.image} />
        <View style={styles.mian}>
          <View>
            <ThemedText
              style={styles.name}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.goods_name}
            </ThemedText>
          </View>
          <View style={styles.description}>
            <ThemedText style={styles.price}>
              价格: {item?.low_price}
            </ThemedText>
            <ThemedText style={styles.status}>已开售</ThemedText>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <PagesScrollView style={styles.container}>
      <Link href="/modal">
        <ThemedText>Open modal</ThemedText>
      </Link>
      <TouchableOpacity onPress={Next}>
        <ThemedText>next</ThemedText>
      </TouchableOpacity>
      <FlatList
        data={list ?? []}
        renderItem={RenderItem}
        keyExtractor={(item) => item.spu_id.toString()}
        // onEndReached={fetchMoreData}
        onEndReachedThreshold={0.5}
        horizontal={false}
        // numColumns={1}
        ListFooterComponent={
          loading ? <ThemedText>加载中...</ThemedText> : null
        }
      />
    </PagesScrollView>
  )
}

const styles = StyleSheet.create({
  container: {},
  list: {
    justifyContent: 'space-between',
  },
  card: {
    borderRadius: 37,
    // alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 20,
    flex: 1,
    maxWidth: '100%', // 确保每行两个项目
    // padding: 7,
    borderWidth: 1, // 添加边框宽度
    borderColor: '#444444', // 添加边框颜色
    backgroundColor: '#1D1D1D',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 37,
  },
  mian: {
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    // height: 48,
  },
  description: {
    marginTop: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 15,
    color: '#666',
  },
  status: {
    fontSize: 15,
    color: 'rgb(255, 117, 74)',
  },
})
