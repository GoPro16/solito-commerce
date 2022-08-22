/* eslint-disable jsx-a11y/alt-text */
import { Button } from 'app/components/Button'
import { Container } from 'app/components/Container'
import {
  useAddToCartMutation,
  useCartConnectionQuery,
  useProductNodeQuery,
} from 'app/generated/hooks'
import Layout from 'app/layout/Layout'
import {
  Image,
  Pressable,
  Row,
  SafeAreaView,
  ScrollView,
  Text,
  useSx,
  View,
} from 'dripsy'
import { createParam } from 'solito'

const { useParam } = createParam<{ product_id: string }>()

const ProductPage = () => {
  const [productId] = useParam('product_id')
  const sx = useSx()
  const { data } = useProductNodeQuery({
    variables: { id: productId as string },
    skip: !productId,
  })
  const { refetch } = useCartConnectionQuery()
  const [addToCart, { loading: addingToCart }] = useAddToCartMutation({
    onCompleted: () => {
      refetch()
    },
  })

  if (!data) {
    return (
      <Layout>
        <Text>Loading</Text>
      </Layout>
    )
  }

  return (
    <Layout>
      <ScrollView sx={{ flex: 1 }}>
        <Container>
          <View
            sx={{
              flex: 1,
              alignItems: 'center',
              marginTop: [0, 4],
            }}
          >
            <Image
              source={{
                uri: data?.node?.img,
              }}
              sx={{ aspectRatio: 1, width: ['100%', '400px'], marginBottom: 3 }}
            />
          </View>
          <View
            sx={{
              px: 2,
              alignItems: ['stretch', 'center'],
              marginBottom: 2,
            }}
          >
            <Text
              sx={{
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
                marginBottom: 2,
              }}
            >
              {data?.node?.name}
            </Text>
            <Text sx={{ color: '#333333', marginBottom: 2 }}>
              {data?.node?.description}
            </Text>
            <Text
              sx={{ color: 'white', marginBottom: 3, textAlign: 'center' }}
              testID="price"
            >
              ${(data.node!.price / 100).toFixed(2)}
            </Text>
          </View>
          <Row sx={{ justifyContent: 'center' }}>
            <Button
              disabled={addingToCart}
              onPress={() => {
                addToCart({
                  variables: {
                    productId: productId as string,
                  },
                })
              }}
            >
              {addingToCart ? 'Adding' : 'Add to Bag'}
            </Button>
          </Row>
        </Container>
      </ScrollView>
    </Layout>
  )
}

export default ProductPage
