import { View, StyleSheet } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import ThemedText from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import PagesScrollView from '@/components/PagesScrollView'
import { Image } from 'react-native'
import Card from '@/components/Card'
import footer_img from '@/assets/images/footer.png'
import { Button as AntButton } from '@ant-design/react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const data = {
  spu_id: 2,
  spu_no: '234',
  goods_name: '水果13水果13水果13水果13水果13水果13水果13水果13',
  low_price: '998.88',
  image_file:
    'https://tse1-mm.cn.bing.net/th/id/OIP-C.jdP04yEoxG10mcywseQj7gAAAA?w=173&h=180&c=7&r=0&o=5&pid=1.7',
}
export default function DetailsScreen() {
  const { id } = useLocalSearchParams()
  const insets = useSafeAreaInsets()

  return (
    <View style={styles.container}>
      <PagesScrollView options={{ headerShown: true, title: '作品详情' }}>
        <ThemedView style={styles.images}>
          <Image source={{ uri: data.image_file }} style={styles.img} />
        </ThemedView>

        <Card>
          <ThemedText type="title" style={styles.title}>
            作品介绍
          </ThemedText>
          <View style={styles.row}>
            <ThemedText>Token ID</ThemedText>
            <ThemedText>163d8Cf8a9.....b6_1</ThemedText>
          </View>
          <View style={styles.row}>
            <ThemedText>合约地址</ThemedText>
            <ThemedText>0x163d8Cf8.....8Eb6</ThemedText>
          </View>
        </Card>

        <Card>
          <ThemedText type="title" style={styles.title}>
            购买须知
          </ThemedText>
          <ThemedText>
            数字藏品为虚拟数字商品，而非实物，仅限实名认证为18岁以上的中国大陆用户购买。数字藏品的版权由发行方或原创者拥有，除另行取得版权拥有者书面同意外，用户不得将数字藏品用于任何商业用途。本商品一经售出，不支持退换。本商品源文件不支持本地下载。请勿对数字藏品进行炒作、场外交易，或任何其他非法形式使用。
          </ThemedText>
        </Card>

        <Image source={footer_img} style={styles.footerimg} />
      </PagesScrollView>

      <View style={{ ...styles.footer, marginBottom: insets.bottom }}>
        <ThemedText style={styles.price}>{data?.low_price}</ThemedText>
        {/* <TouchableOpacity
          onPress={() => {
            console.log('123')
          }}
          style={styles.footerBtn}
        >
          <Text style={styles.footerBtnText}>购买</Text>
        </TouchableOpacity> */}

        <AntButton style={styles.footerBtn} onPress={() => console.log('123')}>
          购买
        </AntButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  images: {
    height: 343,
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
  },

  footer: {
    position: 'sticky',
    bottom: 0,
    left: 0,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.47)',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
  },
  price: {
    color: '#fff',
    fontSize: 24,
  },
  footerimg: {
    width: 194,
    height: 18,
    margin: 'auto',
    marginTop: 10,
    marginBottom: 10,
  },

  footerBtn: {
    borderRadius: 20,
    width: 170,
  },
})
