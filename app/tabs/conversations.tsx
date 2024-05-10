import { Pressable, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Tabs, router } from 'expo-router'
import { typograhpy } from 'src/config/theme'

import { ScrollView } from 'react-native'

import { Icon } from 'react-native-paper'
import ConversationCard from 'src/components/ConversationCard'
import InputComponent from 'src/components/InputComponent'
import { get } from 'utilities/useFetch'
import { Text } from 'react-native'
import { globalState } from 'app/_layout'

const Conversations = () => {
  const ws_messages = globalState((state) => state.ws_messages)
  const set_ws_messages = globalState((state) => state.set_ws_messages)
  const set_opened_chat = globalState((state) => state.set_opened_chat)
  const opened_chat = globalState((state) => state.opened_chat)
  //const ws = globalState((state) => state.ws)
  set_opened_chat(null)
  useEffect(() => {}, [ws_messages])

  const [conversations, setConversations] = useState<undefined | ConversationT[]>(undefined)

  const refreshConversations = () => {
    if (ws_messages.some((item) => item.type === 'New_Message')) {
      const new_ws_messages = ws_messages.filter((message) => message.type !== 'New_Message' && message.message['data'] != opened_chat?.toString())
      set_ws_messages(new_ws_messages)
      getConversations()
    }
  }

  const getConversations = () => {
    get('/conversation/').then((res) => {
      setConversations(res.data)
    })
  }

  useEffect(() => {
    !conversations && getConversations()
    conversations && refreshConversations()
    console.log(conversations)
  }, [conversations, ws_messages])

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex flex-1 px-2">
      <InputComponent placeholder="Search for user or message" icon="account-search" />
      {conversations ? (
        conversations.map((conversation) => <ConversationCard key={conversation.id} isOnline={false} conversation={conversation} />)
      ) : (
        <View>
          <Text>No Conversation</Text>
        </View>
      )}

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
