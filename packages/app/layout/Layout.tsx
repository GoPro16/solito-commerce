import { Container } from 'app/components/Container'
import { TopNav } from '../navigation/web'
import { DripsyFinalTheme, ScrollView, StyledProps, View } from 'dripsy'
import { PropsWithChildren } from 'react'
import { Footer } from './Footer/Footer'

const Layout = ({
  children,
  sx,
  ...props
}: PropsWithChildren<StyledProps<'layout'>>) => {
  return (
    <View
      sx={{
        ...sx,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'lightBlack',
        height: '100%',
      }}
      {...props}
    >
      <TopNav />
      {children}
      <Footer />
    </View>
  )
}

export default Layout
