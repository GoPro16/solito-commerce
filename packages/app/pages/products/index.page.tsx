/* eslint-disable jsx-a11y/alt-text */
import { IProductConnectionQuery } from 'app/generated/gql-types'
import { useProductConnectionQuery } from 'app/generated/hooks'
import { Entypo } from '@expo/vector-icons'
import Layout from 'app/layout/Layout'
import {
  FlatList,
  Image,
  Pressable,
  Row,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  useDripsyTheme,
  useSx,
  View,
} from 'dripsy'
import { ListRenderItemInfo } from 'react-native'
import { useRouter } from 'solito/router'
import { Container } from 'app/components/Container'

type ProductNode = IProductConnectionQuery['products']['edges'][number]

const ProductsPage = () => {
  const { data } = useProductConnectionQuery()
  const router = useRouter()
  const sx = useSx()

  return (
    <Layout>
      <SafeAreaView sx={{ flex: 1, marginBottom: 50, marginTop: [4, 20, 50] }}>
        <Container>
          <Row
            sx={{
              paddingX: 1,
              paddingBottom: 2,
              marginBottom: 2,
            }}
          >
            <Row
              sx={{
                flex: 1,
                backgroundColor: 'black',
              }}
            >
              <Entypo
                name="magnifying-glass"
                color="gray"
                size={15}
                style={sx({ p: 3 })}
              />
              <TextInput
                placeholder="Search Collection..."
                placeholderTextColor="gray"
                keyboardType="default"
                sx={{
                  outlineColor: '#333333',
                  color: 'white',
                  flex: 1,
                  p: 3,
                  pl: 0,

                  marginLeft: 2,
                }}
              />
            </Row>
          </Row>
          <ScrollView>
            <View
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
              testID="products-list"
            >
              {data &&
                data.products.edges.map((item) => (
                  <Pressable
                    testID={item!.node.id}
                    key={item!.node.id}
                    onPress={() => router.push(`/products/${item!.node.id}`)}
                    sx={{
                      width: ['50%', '33%'],
                      display: 'flex',
                      justifyContent: 'center',
                      borderBottomWidth: 1,
                      borderColor: '#333333',
                      borderWidth: 1,
                      paddingBottom: 4,
                    }}
                  >
                    <View sx={{ margin: 4, marginBottom: 1 }}>
                      <Image
                        source={{ uri: item!.node.img }}
                        sx={{ aspectRatio: 1 }}
                      />
                    </View>
                    <Text sx={{ color: 'white', textAlign: 'center' }}>
                      {item!.node.name}
                    </Text>
                    <Text sx={{ color: 'white', textAlign: 'center' }}>
                      ${(item!.node.price / 100).toFixed(2)}
                    </Text>
                  </Pressable>
                ))}
            </View>
          </ScrollView>
        </Container>
      </SafeAreaView>
    </Layout>
  )
}

export default ProductsPage
