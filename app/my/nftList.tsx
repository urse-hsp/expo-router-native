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
import { useListNFT } from '@/services/my'
import EmptyComponent from '@/components/EmptyComponent'

interface IndexType {
  isVisible?: boolean
  onClose?: () => any
}

const Index: React.FC<IndexType> = (props) => {
  const { data } = useListNFT()

  return (
    <ThemedView>
      <FlatList
        data={data ?? []}
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
        ListEmptyComponent={EmptyComponent} // 添加空状态组件
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
