import { Pressable, Text } from 'react-native'
import React from 'react'
import { colors, typograhpy } from 'src/config/theme'
import { View } from 'react-native-animatable'
import { Icon } from 'react-native-paper'
import { ButtonProps } from './components.types'

const ButtonComponent = ({ action, background, text, color, icon }: ButtonProps) => {
  const performAction = () => {
    action ? action() : console.log('No action')
  }
  // const style = { ...typograhpy.buttonText }
  // type style = typeof style;
  // type StyleWit
  // console.log(` text-${color ? color : 'grayText'}`)
  return (
    <View className={`w-full py-2 px-3 rounded-2xl`} style={{ backgroundColor: background ? colors[background] : 'transparent' }}>
      <Pressable className="flex flex-row space-x-2 items-center " onPress={() => performAction()}>
        {icon && <Icon source={icon} size={20} color={colors[color]} />}
        <Text className={`text-center mx-auto`} style={{ ...typograhpy.buttonText, color: colors[color] }}>
          {text}
        </Text>
      </Pressable>
    </View>
  )
}

export default ButtonComponent
