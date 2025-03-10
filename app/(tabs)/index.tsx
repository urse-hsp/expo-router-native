import PagesScrollView from '@/components/PagesScrollView'
import { ThemedText } from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import { Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
import { useRouter } from 'expo-router'

const initialData = [
  {
    spu_id: 2,
    spu_no: '234',
    goods_name: '水果13水果13水果13水果13水果13水果13水果13水果13',
    low_price: '998.88',
    image_file:
      'https://tse1-mm.cn.bing.net/th/id/OIP-C.jdP04yEoxG10mcywseQj7gAAAA?w=173&h=180&c=7&r=0&o=5&pid=1.7',
  },
  {
    spu_id: 1,
    spu_no: '123',
    goods_name: '大菠萝3',
    low_price: '499',
    image_file:
      'https://tse1-mm.cn.bing.net/th/id/OIP-C.jdP04yEoxG10mcywseQj7gAAAA?w=173&h=180&c=7&r=0&o=5&pid=1.7',
  },
]

export default function HomeScreen({ navigate }: any) {
  const [data, setData] = useState(initialData)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const fetchMoreData = async () => {
    if (loading) return
    setLoading(true)

    // 模拟数据请求
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const newData: any = [
      {
        spu_id: data.length + 1,
        spu_no: '123',
        goods_name: '大菠萝3',
        low_price: '499',
        image_file:
          'https://tse1-mm.cn.bing.net/th/id/OIP-C.jdP04yEoxG10mcywseQj7gAAAA?w=173&h=180&c=7&r=0&o=5&pid=1.7',
      },
    ]

    setData([...data, ...newData])
    setPage(page + 1)
    setLoading(false)
  }

  const RenderItem = ({ item }: any) => {
    console.log('item')

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push(`/details/${item.spu_id}`)}
      >
        <Image source={{ uri: item.image_file }} style={styles.image} />
        <ThemedView>
          <ThemedText
            style={styles.name}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.goods_name}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.description}>
          <ThemedText style={styles.price}>价格: {item.low_price}</ThemedText>
        </ThemedView>
      </TouchableOpacity>
    )
  }

  return (
    <PagesScrollView style={styles.container}>
      <FlatList
        data={data}
        renderItem={RenderItem}
        keyExtractor={(item) => item.spu_id.toString()}
        // onEndReached={fetchMoreData}
        onEndReachedThreshold={0.5}
        horizontal={false}
        numColumns={2}
        ListFooterComponent={
          loading ? <ThemedText>加载中...</ThemedText> : null
        }
        columnWrapperStyle={styles.list}
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
    borderRadius: 20,
    // alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 10,
    flex: 1,
    maxWidth: '48%', // 确保每行两个项目
    padding: 7,
    borderWidth: 1, // 添加边框宽度
    borderColor: '#444444', // 添加边框颜色
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 15,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 8,
    height: 48,
  },
  description: {
    marginTop: 4,
  },
  price: {
    fontSize: 14,
    color: '#666',
  },
})
