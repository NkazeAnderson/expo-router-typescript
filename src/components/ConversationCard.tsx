import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { typograhpy } from 'src/config/theme'
import UserAvatar from './UserAvatar'
import { router } from 'expo-router'
import { Badge } from 'react-native-paper'
import { useTimeAgo } from 'react-time-ago'
import { domain } from 'utilities/useFetch'

const ConversationCard = ({ conversation, isOnline }: { conversation: ConversationT; isOnline: boolean }) => {
  const date = new Date(conversation.last_message.date)
  const timeAgo = useTimeAgo({ date: date, locale: 'en-US' })
  const otherMember = JSON.stringify(conversation.other_member)
  const chatId = JSON.stringify(conversation.id)
  console.log(chatId)

  return (
    <Pressable
      onPress={() => router.navigate(`/stacks/messages?otherMember=${otherMember}&chatId=${chatId}`)}
      className="flex flex-row px-2 my-2 border-b-2 border-whiteText"
      style={{ width: '100%' }}>
      <View>
        <UserAvatar url={conversation.other_member.profile_picture ? domain + conversation.other_member.profile_picture : null} />
        {isOnline && <View className="w-3 h-3 bg-green rounded-full border-2 border-grayText absolute right-0 bottom-1"></View>}
      </View>
      <View className="flex-grow pl-3 w-[60%]">
        <Text className="capitalize" style={typograhpy.h3}>
          {`${conversation.other_member.first_name} ${conversation.other_member.last_name}`}
        </Text>
        <Text className="text-grayText">{timeAgo.formattedDate}</Text>
        <Text className="text-grayText" numberOfLines={1} style={{ ...typograhpy.messageText }}>
          {!conversation.last_message.is_photo ? conversation.last_message.message : 'photo'}
        </Text>
      </View>
      <View>
        {conversation.unread_messages > 0 && (
          <View className="my-2">
            <Badge>{conversation.unread_messages}</Badge>
          </View>
        )}
      </View>
    </Pressable>
  )
}

export default ConversationCard
