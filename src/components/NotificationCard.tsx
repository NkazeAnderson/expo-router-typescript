import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-paper'
import { colors, typograhpy } from 'src/config/theme'

const NotificationCard = () => {
  return (
    <Pressable className="bg-secondary rounded-md my-2">
      <View className="flex flex-row rounded-md items-center w-full space-x-4 px-2">
        <Icon size={20} source={'chat'} color={colors.orange} />
        <Text className="text-whiteText" style={typograhpy.h3}>
          New Message
        </Text>
      </View>
      <View className="mx-4 my-1 rounded p-2 bg-lightBackground">
        <Text className="text-grayText" style={typograhpy.lableText}>
          You received a message from Frank
        </Text>
      </View>
    </Pressable>
  )
}

export default NotificationCard
