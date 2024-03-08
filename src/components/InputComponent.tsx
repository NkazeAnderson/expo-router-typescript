import { View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'
import { colors } from 'src/config/theme'

const InputComponent = ({
  placeholder,
  icon,
  value = '',
  setValue = () => {}
}: {
  placeholder: string
  icon: string
  value?: string
  setValue?: (text: string) => void
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
        onChangeText={(text) => setValue(text)}
        onSubmitEditing={() => {
          setValue('')
        }}
      />
    </View>
  )
}

export default InputComponent
