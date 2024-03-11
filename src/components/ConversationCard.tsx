import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { typograhpy } from 'src/config/theme'
import UserAvatar from './UserAvatar'
import { router } from 'expo-router'
type conversation = {
  partner: string
  lastMessage: string
  profile?: string
  time: string
  isOnline?: boolean
}
const ConversationCard = ({ partner, lastMessage, time, isOnline }: conversation) => {
  return (
    <View className="flex flex-row px-2 my-2 border-b-2 border-whiteText" style={{ width: '100%' }}>
      <View className="relative">
        <UserAvatar />
        {isOnline && <View className="w-3 h-3 bg-green rounded-full border-2 border-grayText absolute right-0 bottom-1"></View>}
      </View>
      <Pressable onPress={() => router.navigate('/stacks/messages')} className="flex-grow pl-3 w-[60%]">
        <Text className="capitalize" style={typograhpy.h3}>
          {partner}
        </Text>
        <Text className="text-grayText" numberOfLines={1} style={{ ...typograhpy.messageText }}>
          {lastMessage}
        </Text>
      </Pressable>
      <View>
        <Text>{time}</Text>
      </View>
    </View>
  )
}

export default ConversationCard
