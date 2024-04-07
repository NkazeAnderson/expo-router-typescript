import { Pressable } from 'react-native'
import React from 'react'
import { Stack, router } from 'expo-router'
import { typograhpy } from 'src/config/theme'
import { ScrollView } from 'react-native'
import { Icon } from 'react-native-paper'
import NotificationCard from 'src/components/NotificationCard'

const receipt = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex flex-1 px-2 space-y-2">
      <NotificationCard />

      <Stack.Screen
        options={{
          headerLeft: () => (
            <Pressable
              onPress={() => {
                router.back()
              }}>
              <Icon source={'chevron-left'} size={30} />
            </Pressable>
          ),
          title: 'Notifications',
          headerTitleStyle: typograhpy.h3
        }}
      />
    </ScrollView>
  )
}

export default receipt
