import { Pressable, View } from 'react-native'
import React from 'react'
import { Tabs, router, useLocalSearchParams } from 'expo-router'

import { ScrollView } from 'react-native'

import { Icon } from 'react-native-paper'
import UserCard from 'src/components/UserCard'
import MessageCard from 'src/components/MessageCard'
import InputComponent from 'src/components/InputComponent'

const Conversations = () => {
  const { propertyID } = useLocalSearchParams<{ propertyID: string }>()
  return (
    <View className="flex flex-1">
      <ScrollView showsVerticalScrollIndicator={false} className="flex flex-1 px-2">
        <MessageCard />
        <MessageCard isSender />
        <MessageCard isSender />

        <Tabs.Screen
          options={{
            headerLeft: () => (
              <Pressable
                onPress={() => {
                  propertyID ? router.push(`tabs/propertyDetails?propertyID=${propertyID}`) : router.push('tabs/conversations')
                }}>
                <Icon source={'chevron-left'} size={30} />
              </Pressable>
            ),
            headerTitleContainerStyle: { display: 'none' },
            headerRight: () => <UserCard />
          }}
        />
      </ScrollView>
      <View className="">
        <InputComponent placeholder="Send Message" icon="camera" />
      </View>
    </View>
  )
}

export default Conversations
