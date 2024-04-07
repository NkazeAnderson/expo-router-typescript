import { View, Text } from 'react-native'
import React from 'react'
import UserAvatar from './UserAvatar'
import { colors, typograhpy } from 'src/config/theme'
import { IconButton } from 'react-native-paper'

const UserCard = ({ isUser }: { isUser?: boolean }) => {
  return (
    <View className="w-full">
      <View className="flex flex-row">
        <View className="relative">
          <UserAvatar />
          {!isUser && <View className="w-3 h-3 bg-green rounded-full border-2 border-grayText absolute right-0 bottom-3"></View>}
        </View>
        <View className="ml-2">
          <Text className="text-grayText" style={typograhpy.h3}>
            Bless Ndi
          </Text>
          <Text className="text-grayText" style={typograhpy.lableText}>
            {isUser ? '683 478 098' : 'online'}
          </Text>
        </View>
        <View className="ml-auto">
          <IconButton icon={isUser ? 'pen' : 'phone'} iconColor={colors.whiteText} containerColor={colors.primary} />
        </View>
      </View>
    </View>
  )
}

export default UserCard
