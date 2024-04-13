import { KeyboardTypeOptions, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'
import { colors } from 'src/config/theme'

const InputComponent = ({
  placeholder,
  icon,
  value = '',
  setValue = () => {},
  lines,
  keyboard
}: {
  placeholder: string
  icon: string
  value?: string
  setValue?: (text: string) => void
  lines?: number
  keyboard?: KeyboardTypeOptions
}) => {
  return (
    <View className="py-2 shadow shadow-lg">
      <TextInput
        left={<TextInput.Icon style={{ backgroundColor: colors['secondary'], opacity: 0.3 }} icon={icon} />}
        mode="outlined"
        placeholder={placeholder}
        outlineStyle={{ borderRadius: 15, borderColor: 'transparent' }}
        style={{ backgroundColor: 'white' }}
        value={value}
        keyboardType={keyboard ? keyboard : 'default'}
        multiline={lines ? true : false}
        numberOfLines={lines ? lines : 4}
        onChangeText={(text) => setValue(text)}
        onSubmitEditing={() => {
          setValue('')
        }}
      />
    </View>
  )
}

export default InputComponent
