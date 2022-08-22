/* eslint-disable jsx-a11y/alt-text */
import {
  View,
  H1,
  ScrollView,
  SafeAreaView,
  H2,
  Text,
  Row,
  Pressable,
  Image,
} from 'dripsy'
import { useProductConnectionQuery } from 'app/generated/hooks'
import Layout from 'app/layout/Layout'
import { Container } from 'app/components/Container'
import { Link } from 'solito/link'
import { useRouter } from 'solito/router'
import { IProduct } from 'app/generated/gql-types'

interface ProductCardProps {
  product: IProduct
}
const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter()
  return (
    <Pressable
      sx={{
        position: 'relative',
        width: 250,
        height: 250,
      }}
      onPress={() => router.push(`/products/${product.id}`)}
    >
      <Image source={{ uri: product.img }} sx={{ width: 250, height: 250 }} />
      <Row
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          alignItems: 'center',
        }}
      >
        <Text
          sx={{
            textAlign: 'center',
            width: '100%',
            fontWeight: 'bold',
            fontSize: 16,
            pt: 2,
          }}
        >
          {product.name}
        </Text>
      </Row>
    </Pressable>
  )
}

const HomePage = () => {
  const { data, error } = useProductConnectionQuery()

  return (
    <Layout
      sx={{
        flex: 1,
        backgroundColor: 'lightBlack',
      }}
    >
      <ScrollView
        sx={{
          flex: 1,
        }}
      >
        <Container sx={{ mb: 5 }}>
          <View sx={{ mt: 5, mb: 2 }}>
            <H1 sx={{ textAlign: 'center', color: 'white', mb: 1 }}>
              Not Your Average Astronaut
            </H1>
            <H2
              sx={{
                textAlign: 'center',
                color: 'white',
                fontStyle: 'italic',
                fontSize: 14,
              }}
            >
              Hand crafted astronaut art that you don&apos;t have to spend
              thousands of dollars worth of crypto to own. Best of all its
              physical!
            </H2>
          </View>
          <Row sx={{ justifyContent: 'center' }}>
            {data?.products && (
              <ProductCard product={data?.products.edges[2]!.node} />
            )}
          </Row>
        </Container>
        <Container>
          <Link href="/products">
            <Text sx={{ color: 'white', fontWeight: 'bold', mb: 2, ml: 1 }}>
              Browse Collection
            </Text>
          </Link>
        </Container>
        <ScrollView
          horizontal
          scrollEnabled
          scrollToOverflowEnabled
          showsHorizontalScrollIndicator={false}
          contentOffset={{ x: 0, y: 0 }}
        >
          {data?.products.edges.map((e) => (
            <ProductCard key={e!.node.id} product={e!.node} />
          ))}
        </ScrollView>
      </ScrollView>
    </Layout>
  )
}

export default HomePage
