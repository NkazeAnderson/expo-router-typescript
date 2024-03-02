import { Pressable, Text, View } from 'react-native'
import React from 'react'
import { Tabs, router } from 'expo-router'
import { typograhpy } from 'src/config/theme'

import { ScrollView } from 'react-native'

import { Icon } from 'react-native-paper'
import UserCard from 'src/components/UserCard'

// import UserCard from 'src/components/UserCard'

const settings = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex flex-1 px-2">
      <UserCard />
      <View className="flex flex-row justify-between my-2 border border-2 rounded-md py-2">
        <View className="flex flex-row items-center">
          <Icon source={'bell'} size={20} />
          <Text className="text-grayText pl-2" style={typograhpy.buttonText}>
            Notifications
          </Text>
        </View>
        <View className="flex flex-row items-center">
          <View className="w-8 h-8 rounded-full mr-2 bg-primary flex items-center ">
            <Text className="text-whiteText my-auto" style={typograhpy.buttonText}>
              1
            </Text>
          </View>
          <Icon source={'chevron-right'} size={29} />
        </View>
      </View>
      <Tabs.Screen
        options={{
          headerLeft: () => (
            <Pressable
              onPress={() => {
                router.back()
              }}>
              <Icon source={'chevron-left'} size={30} />
            </Pressable>
          ),
          headerTitleStyle: typograhpy.h3
        }}
      />
    </ScrollView>
  )
}

export default settings
