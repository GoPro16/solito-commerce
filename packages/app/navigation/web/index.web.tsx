import { Container } from 'app/components/Container'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { DripsyFinalTheme, Row, StyledProps, Text, View } from 'dripsy'
import { PropsWithChildren } from 'react'
import { Link } from 'solito/link'
import { useRouter } from 'next/router'
import { Badge } from 'app/components/Badge'
import { useCartConnectionQuery } from 'app/generated/hooks'

const NavLink = ({
  children,
  href,
  sx,
  ...props
}: PropsWithChildren<{ href: string } & StyledProps<'text'>>) => {
  const router = useRouter()
  return (
    <Link href={href}>
      <Text
        sx={{
          ...sx,
          color: 'white',
          fontWeight: router.pathname === href ? 'bold' : 'normal',
        }}
        {...props}
      >
        {children}
      </Text>
    </Link>
  )
}

export const TopNav = () => {
  const { data } = useCartConnectionQuery()

  const cartTotal =
    data?.cart?.edges.reduce((sum, e) => e!.node!.quantity + sum, 0) || 0
  return (
    <Row
      sx={{
        bg: 'black',
        borderBottomColor: '#333333',
        borderBottomWidth: 1,
      }}
    >
      <Container
        as={Row}
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 1,
          py: 3,
        }}
      >
        <View>
          <Link href="/">
            <Text
              sx={{
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
                fontStyle: 'italic',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              NYAA
              <MaterialCommunityIcons
                name="space-invaders"
                color="white"
                size={30}
              />{' '}
            </Text>
          </Link>
        </View>
        <Row
          sx={{
            gap: 3,
            alignItems: 'center',
          }}
        >
          <NavLink href="/">Home</NavLink>
          <NavLink href="/products">Products</NavLink>
          <NavLink href="/cart" sx={{ position: 'relative' }}>
            Cart
            {cartTotal > 0 && (
              <Badge
                sx={{
                  marginLeft: 1,
                }}
              >
                {cartTotal}
              </Badge>
            )}
          </NavLink>
        </Row>
      </Container>
    </Row>
  )
}
