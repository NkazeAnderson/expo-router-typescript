import { Pressable } from 'react-native'
import React from 'react'
import { Tabs, router } from 'expo-router'
import { typograhpy } from 'src/config/theme'

import { ScrollView } from 'react-native'

import { Icon } from 'react-native-paper'
import ConversationCard from 'src/components/ConversationCard'
import InputComponent from 'src/components/InputComponent'

const Conversations = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex flex-1 px-2">
      <InputComponent placeholder="Search for user or message" icon="account-search" />
      <ConversationCard partner="ndi bless" time="11 mins ago" lastMessage="Yoo bro I need that place" />
      <ConversationCard isOnline partner="Frank bro" time="16 mins ago" lastMessage="Hey man I need that place" />

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
          title: 'Inbox',
          headerTitleStyle: typograhpy.h3
        }}
      />
    </ScrollView>
  )
}

export default Conversations
