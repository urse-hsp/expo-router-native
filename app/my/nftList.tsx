import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import ai_img from '@/assets/images/ai.jpg'

const initialData = [
  {
    spu_id: 1,
    spu_no: '234',
    goods_name: '水果13水果13水果13水果13水果13水果13水果13水果13',
    low_price: '998.88',
    image_file: ai_img,
  },
  {
    spu_id: 2,
    spu_no: '123',
    goods_name: '大菠萝3',
    low_price: '499',
    image_file: require('@/assets/images/ai.jpg'), // 使用 require 引用本地图片
  },
]

interface IndexType {
  isVisible?: boolean
  onClose?: () => any
}

const Index: React.FC<IndexType> = (props) => {
  return (
    <ThemedView>
      <FlatList
        data={initialData}
        numColumns={2} // 设置为2列
        keyExtractor={(item) => item.spu_id.toString()}
        horizontal={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.interestItem}
            // onPress={() => router.push(`/details/${item.spu_id}`)}
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
            </View>
          </TouchableOpacity>
        )}
        columnWrapperStyle={styles.row} // 添加列包装样式
      />
    </ThemedView>
  )
}
export default Index

const styles = StyleSheet.create({
  interestItem: {
    flex: 1,
    margin: 5,
    borderWidth: 1, // 添加边框宽度
    borderColor: '#444444', // 添加边框颜色
    backgroundColor: '#1D1D1D',
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
  },
  mian: {
    padding: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
})
