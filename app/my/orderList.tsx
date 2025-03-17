import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native'
import ai_img from '@/assets/images/ai.jpg'
import { Button as AntButton } from '@ant-design/react-native'
import EmptyComponent from '@/components/EmptyComponent'
import { useListOrder } from '@/services/my'

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
  const { data } = useListOrder()
  return (
    <ThemedView>
      <FlatList
        data={data ?? []}
        keyExtractor={(item) => item.spu_id.toString()}
        horizontal={false}
        ListEmptyComponent={EmptyComponent} // 添加空状态组件
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.interestItem}
            // onPress={() => router.push(`/details/${item.spu_id}`)}
          >
            <Image source={item.image_file} style={styles.image} />
            <View style={styles.mian}>
              <ThemedText
                style={styles.name}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {item.goods_name}
              </ThemedText>
              <View style={styles.btnList}>
                <AntButton style={styles.btn} size="small">
                  取消订单
                </AntButton>
                <AntButton style={styles.btn} size="small">
                  去支付
                </AntButton>
              </View>
            </View>
          </TouchableOpacity>
        )}
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
    display: 'flex',
    flexDirection: 'row',
  },
  image: {
    width: 80,
    height: 80,
  },
  mian: {
    padding: 10,
    width: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  btn: {
    height: 25,
    width: 70,
    borderRadius: 15,
    fontSize: 12,
  },
})
