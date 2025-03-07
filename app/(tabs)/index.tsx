import { Link } from 'expo-router'
import PagesScrollView from '@/components/PagesScrollView'
import { ThemedText } from '@/components/ThemedText'
import ExternalLink from '@/components/ExternalLink'
import { View, Text, Image, StyleSheet } from 'react-native'

interface NFT {
  id: number
  name: string
  imageUrl: string
  description: string
}

const data = [
  {
    id: 1,
    name: 'John Doe',
    age: 32,
    logo: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.jdP04yEoxG10mcywseQj7gAAAA?w=173&h=180&c=7&r=0&o=5&pid=1.7',
    number: 100,
    isK: true,
  },
  {
    id: 2,
    name: 'John Doe',
    age: 32,
    logo: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.jdP04yEoxG10mcywseQj7gAAAA?w=173&h=180&c=7&r=0&o=5&pid=1.7',
    number: 100,
    isK: true,
  },
]
export default function HomeScreen() {
  return (
    <PagesScrollView style={styles.container}>
      {/* <h1 className={styles.title}>NFT List</h1>
      <NFTList nfts={nftData} /> */}
      <View style={styles.list}>
        {data?.map((nft) => (
          <View key={nft.id} style={styles.card}>
            <Image source={{ uri: nft.logo }} style={styles.image} />
            <Text style={styles.name}>{nft.name}</Text>
            <Text style={styles.description}>{nft.name}</Text>
          </View>
        ))}
      </View>
    </PagesScrollView>
  )
}

const styles = StyleSheet.create({
  container: {},
  list: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  card: {
    // borderWidth: 1,
    backgroundColor: '#ddd',
    borderRadius: 30,
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 345,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
})
