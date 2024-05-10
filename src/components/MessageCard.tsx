import { View, Text, Image } from 'react-native'
import React from 'react'
import UserAvatar from './UserAvatar'
import { colors, typograhpy } from 'src/config/theme'
import { useTimeAgo } from 'react-time-ago'
import { Icon } from 'react-native-paper'

const MessageCard = ({
  message,
  memberPic,
  isSender,
  isPhoto,
  time,
  read
}: {
  message: string
  memberPic?: string
  isSender?: boolean
  isPhoto: boolean
  time: string
  read: boolean
}) => {
  const date = new Date(time)
  const timeAgo = useTimeAgo({ date: date, locale: 'en-US' })
  return (
    <View className="w-full py-2">
      <View className={`flex w-full flex-row ${isSender ? 'justify-end' : ''}  `}>
        {!isSender && <UserAvatar url={memberPic ? memberPic : null} />}
        <View className="ml-2 ">
          <View className={` p-2 ${isSender ? 'bg-primary ml-auto ' : 'bg-lightBackground max-w-[80%]'} rounded-lg`}>
            {!isPhoto ? (
              <Text className={`${isSender ? 'text-whiteText' : ''} `} style={typograhpy.messageText}>
                {message}
              </Text>
            ) : (
              <Image className="w-[250px] h-[250px] object-contain" source={{ uri: message }} />
            )}
          </View>
          <View className={`flex w-content items-center flex-row ${isSender ? 'justify-end' : ''}  `}>
            <Text className="text-right mx-2" style={{ ...typograhpy.lableText }}>
              {timeAgo.formattedDate}
            </Text>
            {read ? <Icon source={'check-underline'} size={20} color={colors.primary} /> : <Icon source={'check-underline'} size={12} />}
          </View>
        </View>
      </View>
    </View>
  )
}

export default MessageCard
