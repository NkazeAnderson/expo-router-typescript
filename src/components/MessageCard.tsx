import { View, Text } from 'react-native'
import React from 'react'
import UserAvatar from './UserAvatar'
import { typograhpy } from 'src/config/theme'

const MessageCard = ({ isSender = false }: { isSender?: boolean }) => {
  return (
    <View className="w-full py-2">
      <View className={`${isSender ? 'ml-auto w-[80%]' : 'w-[70%]'} flex flex-row `}>
        {!isSender && <UserAvatar />}
        <View className="ml-2 ">
          <View className={`p-2 ${isSender ? 'bg-primary' : 'bg-lightBackground'} rounded-lg`}>
            <Text className={`${isSender ? 'text-whiteText' : ''} `} style={typograhpy.messageText}>
              Yoo brother i need this house asap where are you
            </Text>
          </View>
          <View className="w-full">
            <Text className="text-right" style={{ ...typograhpy.lableText }}>
              11:00 am
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default MessageCard
