import { Image, Pressable, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import { ScrollView } from 'react-native'
import { Icon, IconButton } from 'react-native-paper'
import UserCard from 'src/components/UserCard'
import MessageCard from 'src/components/MessageCard'
import InputComponent from 'src/components/InputComponent'
import { user_sample } from 'src/config/constants'
import { globalState } from 'app/_layout'
import { domain, get, post, put } from 'utilities/useFetch'
import { colors } from 'src/config/theme'
import Toast from 'react-native-root-toast'
import { ImagePickerAsset } from 'expo-image-picker'
import { mediaPicker } from 'utilities/useLibraryImage'
import ButtonComponent from 'src/components/ButtonComponent'
import { Text } from 'react-native'

const Messages = () => {
  const user = globalState((state) => state.userInfo)
  const ws = globalState((state) => state.ws)
  const ws_messages = globalState((state) => state.ws_messages)
  const set_ws_messages = globalState((state) => state.set_ws_messages)
  const set_opened_chat = globalState((state) => state.set_opened_chat)
  const [messages, setMessages] = useState<undefined | MessageT[]>(undefined)
  const [newMessage, setNewMessage] = useState<string>('')
  const [pictures, setPictures] = useState<ImagePickerAsset[]>([])

  const ScrollViewElement = useRef<ScrollView | null>(null)

  const { otherMember } = useLocalSearchParams()
  const { chatId } = useLocalSearchParams()

  let otherMemberInfo: undefined | typeof user_sample = undefined
  if (otherMember && !(otherMember instanceof Array)) {
    otherMemberInfo = JSON.parse(otherMember)
    if (otherMemberInfo && otherMemberInfo.profile_picture) {
      otherMemberInfo.profile_picture = domain + otherMemberInfo.profile_picture
    }
  } else {
    router.back()
  }
  if (chatId && !(chatId instanceof Array)) {
    set_opened_chat(parseInt(chatId))
  }

  const scrollToButtom = () => {
    setTimeout(() => {
      ScrollViewElement.current?.scrollToEnd()
    }, 100)
  }

  const sendPictures = () => {
    if (pictures.length > 0 && chatId && !(chatId instanceof Array)) {
      pictures.forEach((asset) => {
        const formData = new FormData()
        formData.append('conversation', chatId)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formData.append('photo', { uri: asset.uri, name: asset.fileName, type: asset.mimeType } as any)
        post('/message/', formData).then(() => {
          console.log('Sent')
          setNewMessage('')
          ws?.send(JSON.stringify({ type: 'New_Message', message: { data: chatId } }))
        })
      })
      setPictures([])
      scrollToButtom()
    }
  }

  const addPicture = () => {
    mediaPicker().then((results) => {
      if (!results.canceled) {
        pictures.length > 0 ? setPictures([...pictures, ...results.assets]) : setPictures([...results.assets])
        scrollToButtom()
      }
    })
  }

  const removePictures = (i: number) => {
    const newPictures: ImagePickerAsset[] = []
    pictures.forEach((asset, index) => {
      i !== index && newPictures.push(asset)
    })
    setPictures(newPictures)
  }

  const sendMessage = () => {
    if (newMessage !== '' && chatId && !(chatId instanceof Array)) {
      const formData = new FormData()
      formData.append('conversation', chatId)
      formData.append('message', newMessage)
      post('/message/', formData).then(() => {
        console.log('Sent')
        setNewMessage('')
        ws?.send(JSON.stringify({ type: 'New_Message', message: { data: chatId } }))
      })
    } else {
      const formData = new FormData()
      user && formData.append('second_member', user.id.toString())
      !chatId
        ? post('/conversation/', formData).then((res) => {
            console.log('created chat')
            res instanceof Response &&
              res.json().then((s) => {
                router.setParams({ otherMember: JSON.stringify(otherMemberInfo), chatId: s.id })
              })

            //ws?.send(JSON.stringify({ type: 'New_Message', message: { data: chatId } }))
          })
        : Toast.show('Type a message to send')
    }
  }

  const getMessages = () => {
    get(`/message/?conversationId=${chatId}`).then((res) => {
      setMessages(res.data)
      scrollToButtom()
      const formData = new FormData()
      formData.append('id', 'chatId')
      put(`/conversation/${chatId}/`, formData)
        .then(() => {
          ws?.send(JSON.stringify({ type: 'Read_Message', message: { data: { chatId, by: user?.id } } }))
          console.log('Read ws sent')
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }

  useEffect(() => {
    console.log('effect chatid')
    console.log(chatId)

    !messages && chatId && getMessages()
    if (ws_messages.some((item) => item.type === 'New_Message')) {
      const new_ws_messages = ws_messages.filter((message) => message.type !== 'New_Message' && message.message['data'] == chatId)
      set_ws_messages(new_ws_messages)
      getMessages()
    }
    if (ws_messages.some((item) => item.type === 'Read_Message')) {
      user && ws_messages.some((item) => item.message['by'] != user.id.toString())
      if (messages)
        messages
          .filter((message) => message.read === false)
          .forEach((message) => {
            message.read = true
          })
      const new_ws_messages = ws_messages.filter((message) => message.type !== 'Read_Message')
      set_ws_messages(new_ws_messages)
    }

    return set_opened_chat(null)
  }, [messages, ws_messages])

  return (
    <View className="flex flex-1">
      <ScrollView ref={(ref) => (ScrollViewElement.current = ref)} showsVerticalScrollIndicator={false} className="flex flex-1 px-2">
        {messages ? (
          messages.map((message, index) => {
            return (
              <MessageCard
                key={index}
                message={message.photo !== null ? message.photo : message.message !== null ? message.message : ''}
                isSender={message.sender === user?.id}
                isPhoto={message.photo !== null}
                time={message.created_date}
                read={message.read}
              />
            )
          })
        ) : (
          <Text> Send a message</Text>
        )}
        {pictures &&
          pictures.map((asset, index) => (
            <View className="ml-auto my-1 bg-secondary w-[250px] border-2 border-secondary relative" key={index}>
              <Image className="w-[250px] h-[250px]" source={{ uri: asset.uri }} />
              <IconButton
                className="mx-auto my-2"
                icon={'delete'}
                containerColor={colors.danger}
                onPress={() => {
                  removePictures(index)
                }}
              />
            </View>
          ))}
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
            headerRight: () => <View className="w-[80vw]">{otherMemberInfo && <UserCard userData={otherMemberInfo} />}</View>,
            title: ''
          }}
        />
      </ScrollView>
      <View className="flex flex-row">
        <View className="flex-grow max-w-[80%]">
          {pictures.length === 0 ? (
            <InputComponent lines={3} value={newMessage} setValue={setNewMessage} placeholder="Type your message" icon="message" />
          ) : (
            <ButtonComponent text="Send Photos" color="whiteText" background="primary" action={sendPictures} />
          )}
        </View>
        <IconButton
          className="my-auto"
          icon={newMessage === '' ? 'camera' : 'send'}
          size={34}
          iconColor={colors.lightBackground}
          containerColor={colors.primary}
          onPress={() => {
            newMessage === '' ? addPicture() : sendMessage()
          }}
        />
      </View>
    </View>
  )
}

export default Messages
