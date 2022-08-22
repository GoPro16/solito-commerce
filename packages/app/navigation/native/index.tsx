import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Entypo } from '@expo/vector-icons'
import HomePage from '../../pages/index.page'
import CartPage from '../../pages/cart.page'
import ProductsPage from '../../pages/products/index.page'
import ProductPage from '../../pages/products/[product_id].page'
import { useSx, View } from 'dripsy'
import { Badge } from 'app/components/Badge'
import { useCartConnectionQuery } from 'app/generated/hooks'

const Tab = createBottomTabNavigator<{
  home: undefined
  products: {
    product_id: string
  }
  cart: undefined
}>()

const ProductStack = createNativeStackNavigator<{
  product: {
    product_id: string
  }
  productSearch: undefined
}>()

const ProductStackNavigation = () => {
  return (
    <ProductStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProductStack.Screen name="productSearch" component={ProductsPage} />
      <ProductStack.Screen name="product" component={ProductPage} />
    </ProductStack.Navigator>
  )
}

export function NativeNavigation() {
  const sx = useSx()
  const { data } = useCartConnectionQuery()

  const cartTotal =
    data?.cart?.edges.reduce((sum, e) => e!.node!.quantity + sum, 0) || 0
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: sx({
          color: 'white',
          elevation: 5,
          backgroundColor: 'black',

          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowColor: 'white',
          shadowOpacity: 0.05,
          shadowRadius: 3.5,
        }),
      }}
    >
      <Tab.Screen
        name="home"
        component={HomePage}
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: () => <Entypo name="home" size={24} color="white" />,
        }}
      />
      <Tab.Screen
        name="products"
        component={ProductStackNavigation}
        options={{
          title: 'Explore',
          headerShown: false,
          tabBarIcon: () => (
            <Entypo name="magnifying-glass" color="white" size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="cart"
        component={CartPage}
        options={{
          title: 'Cart',
          headerShown: false,
          tabBarIcon: () => (
            <View sx={{ position: 'relative' }}>
              <Entypo name="shopping-cart" color="white" size={24} />
              {cartTotal > 0 && (
                <Badge sx={{ position: 'absolute', right: -3, top: -2 }}>
                  {cartTotal}
                </Badge>
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  )
}
