import { Pressable, View } from 'react-native'
import React from 'react'
import { Stack, router } from 'expo-router'
import { ScrollView } from 'react-native'
import { Icon } from 'react-native-paper'
import UserCard from 'src/components/UserCard'
import MessageCard from 'src/components/MessageCard'
import InputComponent from 'src/components/InputComponent'

const Conversations = () => {
  return (
    <View className="flex flex-1">
      <ScrollView showsVerticalScrollIndicator={false} className="flex flex-1 px-2">
        <MessageCard />
        <MessageCard isSender />
        <MessageCard isSender />

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
