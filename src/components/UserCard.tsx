import { View, Text } from 'react-native'
import React from 'react'
import UserAvatar from './UserAvatar'
import { colors, typograhpy } from 'src/config/theme'
import { IconButton } from 'react-native-paper'
import { apartment_Results_Sample } from 'src/config/constants'
import { globalState } from 'app/_layout'
import { router } from 'expo-router'

const UserCard = ({ userData, isUser }: { userData?: typeof apartment_Results_Sample.posted_by; isUser?: boolean }) => {
  const user = globalState((state) => state.userInfo)
  return (
    <View className="w-full">
      <View className="flex flex-row">
        <View className="relative">
          <UserAvatar url={user ? user.profile_picture : null} />
          {!isUser && <View className="w-3 h-3 bg-green rounded-full border-2 border-grayText absolute right-0 bottom-3"></View>}
        </View>
        <View className="ml-2">
          <Text className="text-grayText" style={typograhpy.h3}>
            {isUser ? `${user?.first_name}` : `${userData?.first_name} `}
          </Text>
          <Text className="text-grayText" style={typograhpy.lableText}>
            {'online'}
          </Text>
        </View>
        <View className="ml-auto">
          <IconButton
            icon={isUser ? 'pen' : 'phone'}
            iconColor={colors.whiteText}
            containerColor={colors.primary}
            onPress={() => {
              isUser ? router.push('/stacks/updateUserInfo') : console.log('Pressed')
            }}
          />
        </View>
      </View>
    </View>
  )
}

export default UserCard
