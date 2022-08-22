import { Pressable, StyledProps, Text, useSx } from 'dripsy'
import { PropsWithChildren } from 'react'
import { PressableProps } from 'react-native'

export const Button = ({
  children,
  sx: sxProps,
  ...props
}: PropsWithChildren<StyledProps<'buttons'> & PressableProps>) => {
  const sx = useSx()
  return (
    <Pressable
      {...props}
      style={({ hovered }) =>
        sx({
          ...sxProps,
          borderRadius: 6,
          backgroundColor: hovered ? '#333333' : '#0070f3',
          py: 2,
          px: 4,
          alignSelf: 'flex-start',
        })
      }
    >
      <Text
        sx={{
          color: 'white',
          fontSize: 20,
          textAlign: 'center',
        }}
      >
        {children}
      </Text>
    </Pressable>
  )
}
