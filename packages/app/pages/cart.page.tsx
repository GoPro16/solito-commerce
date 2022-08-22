/* eslint-disable jsx-a11y/alt-text */
import { Button } from 'app/components/Button'
import { Container } from 'app/components/Container'
import {
  useCartConnectionQuery,
  useRemoveFromCartMutation,
} from 'app/generated/hooks'
import Layout from 'app/layout/Layout'
import {
  Image,
  Pressable,
  Row,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'dripsy'
import { PropsWithChildren } from 'react'

interface CartItemProps {
  cartItem: ICartItem
}
const CheckoutItem = ({ cartItem }: CartItemProps) => {
  const { refetch } = useCartConnectionQuery()
  const [removeFromCart, { loading: removingFromCart }] =
    useRemoveFromCartMutation({
      onCompleted: () => {
        refetch()
      },
    })
  return (
    <Row
      sx={{
        justifyContent: 'space-between',
        backgroundColor: '#333333',
        borderRadius: 6,
        marginBottom: 2,
      }}
    >
      <Row>
        <Image
          source={{ uri: cartItem.product.img }}
          sx={{ width: 80, height: 80 }}
        />
        <View sx={{ p: 2 }}>
          <Text sx={{ color: 'white' }}>{cartItem.product.name}</Text>
          <Text sx={{ color: 'white' }}>
            {cartItem.product.shortDescription}
          </Text>
          {cartItem.quantity > 1 && (
            <Text sx={{ color: 'white', fontSize: 12, marginTop: 2 }}>
              Quantity {cartItem.quantity} | Item Price: $
              {(cartItem.product.price / 100).toFixed(2)}
            </Text>
          )}
        </View>
      </Row>
      <View sx={{ p: 2 }}>
        <Text sx={{ color: 'white', marginBottom: 1 }}>
          ${((cartItem.product.price * cartItem.quantity) / 100).toFixed(2)}
        </Text>
        <Pressable
          disabled={removingFromCart}
          onPress={() => {
            removeFromCart({
              variables: {
                productId: cartItem.product.id,
              },
            })
          }}
          testID="remove-from-cart"
        >
          <Text sx={{ color: 'blue', textDecorationLine: 'underline' }}>
            {removingFromCart ? 'Removing' : 'Remove'}
          </Text>
        </Pressable>
      </View>
    </Row>
  )
}

const SummaryItem = ({
  children,
  label,
}: PropsWithChildren<{ label: string }>) => {
  return (
    <Row sx={{ justifyContent: 'space-between', marginBottom: 1 }}>
      <Text sx={{ color: 'white' }}>{label}</Text>
      <Text sx={{ color: 'white' }} testID={label}>
        {children}
      </Text>
    </Row>
  )
}

const CartPage = () => {
  const { data } = useCartConnectionQuery()

  const cartTotal =
    data?.cart?.edges.reduce((sum, e) => {
      return sum + e!.node.product.price * e!.node.quantity
    }, 0) || 0
  return (
    <Layout>
      <SafeAreaView sx={{ flex: 1 }}>
        <Container sx={{ flex: [1, 'initial'] }}>
          <Text
            sx={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 30,
              m: 2,
            }}
          >
            Cart
          </Text>
          <ScrollView>
            {data?.cart?.edges.map((e) => (
              <CheckoutItem cartItem={e!.node} key={e?.node.product.id} />
            ))}
          </ScrollView>
          <View
            sx={{
              p: 2,
              backgroundColor: ['#222222', 'transparent'],
              borderTopWidth: 1,
              borderTopColor: 'black',
            }}
          >
            <SummaryItem label="Estimated Tax">$0.00</SummaryItem>
            <SummaryItem label="Subtotal">
              ${(cartTotal / 100).toFixed(2)}
            </SummaryItem>
            <Text sx={{ color: '#CCCCCC', fontSize: 12 }}>
              Your bag qualifies for free shipping.
            </Text>
            <Row
              sx={{
                justifyContent: 'flex-end',
                pt: 2,
              }}
            >
              <Button sx={{ width: '50%' }}>Check Out</Button>
            </Row>
          </View>
        </Container>
      </SafeAreaView>
    </Layout>
  )
}

export default CartPage
