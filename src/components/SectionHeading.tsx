import { Pressable, Text, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-paper'
import { typograhpy } from 'src/config/theme'

const SectionHeading = ({ title, link, action }: { title: string; link?: string; action?: () => void }) => {
  return (
    <View className="flex flex-row justify-between items-center">
      <Text className=" text-primaryText" style={typograhpy.h3}>
        {title}
      </Text>
      {link && (
        <Pressable
          onPress={() => {
            action && action()
          }}
          className="flex flex-row space-x-1">
          <Text className="text-[#0a6b49]">{link}</Text>
          <View className="rotate-90">
            <Icon source={'triangle'} size={14} color="#0a6b49" />
          </View>
        </Pressable>
      )}
    </View>
  )
}

export default SectionHeading
