import { Container } from 'app/components/Container'
import { Text, View } from 'dripsy'

export const Footer = () => {
  return (
    <View
      sx={{
        backgroundColor: 'black',
        borderTopWidth: 1,
        borderTopColor: '#333333',
      }}
    >
      <Container sx={{ py: 4 }}>
        <Text sx={{ color: 'white', fontSize: 12 }}>
          Copyright © 2022 NYAA Inc. All rights reserved.
        </Text>
      </Container>
    </View>
  )
}
