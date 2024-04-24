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
  keyboard,
  onSubmit,
  onSubmitType
}: {
  placeholder: string
  icon: string
  value?: string
  setValue?: (text: string) => void
  lines?: number
  keyboard?: KeyboardTypeOptions
  onSubmit?: () => void
  onSubmitType?: string
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
        returnKeyType={onSubmitType && onSubmitType === 'search' ? 'search' : 'default'}
        keyboardType={keyboard ? keyboard : 'default'}
        multiline={lines ? true : false}
        numberOfLines={lines ? 2 : 4}
        onChangeText={(text) => setValue(text)}
        onSubmitEditing={() => onSubmitType && onSubmitType === 'search' && onSubmit && onSubmit()}
      />
    </View>
  )
}

export default InputComponent
