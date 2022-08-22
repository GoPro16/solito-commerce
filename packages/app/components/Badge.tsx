import { StyledProps, Text, View } from 'dripsy'
import { PropsWithChildren } from 'react'

export const Badge = ({
  children,
  sx,
  ...props
}: PropsWithChildren<StyledProps<'layout'>>) => {
  return (
    <View
      sx={{
        py: 1,
        px: 2,
        borderRadius: 20,
        backgroundColor: '#0070f3',
        ...sx,
      }}
      {...props}
    >
      <Text sx={{ color: 'white' }}>{children}</Text>
    </View>
  )
}
