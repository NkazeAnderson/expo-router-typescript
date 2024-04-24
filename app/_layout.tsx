import 'expo-dev-client'
import { View } from 'react-native'
import { Stack } from 'expo-router'
import { RootSiblingParent } from 'react-native-root-siblings'
import { PaperProvider } from 'react-native-paper'
import { create } from 'zustand'
import { user_sample } from 'src/config/constants'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'
import { useEffect } from 'react'
import { websocketobj } from 'utilities/useWebsocket'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)
export interface GlobalState {
  userInfo: typeof user_sample | undefined
  setUserInfo: (user: typeof user_sample) => void
  ws_Status: boolean
  ws: undefined | WebSocket
  set_ws: (state: WebSocket) => void
  set_ws_Status: (state: boolean) => void
  ws_messages: { type: string; message: Record<string, string> }[]
  set_ws_messages: (state: { type: string; message: Record<string, string> }[]) => void
  opened_chat: number | null
  set_opened_chat: (state: null | number) => void
}
export const globalState = create<GlobalState>((set) => ({
  userInfo: undefined,
  setUserInfo: (user) => set(() => ({ userInfo: user })),
  ws_Status: false,
  ws: undefined,
  set_ws: (state: WebSocket) => set(() => ({ ws: state })),
  set_ws_Status: (state: boolean) => set(() => ({ ws_Status: state })),
  ws_messages: [],
  set_ws_messages: (state) => set(() => ({ ws_messages: state })),
  opened_chat: null,
  set_opened_chat: (state) => set(() => ({ opened_chat: state }))
}))
export default function AppLayout() {
  const set_ws_object = globalState((state) => state.set_ws)
  //const set_ws_Status = globalState((state) => state.set_ws_Status)
  const ws_messages = globalState((state) => state.ws_messages)
  const set_ws_messages = globalState((state) => state.set_ws_messages)

  const ws = globalState((state) => state.ws)
  useEffect(() => {
    if (ws) {
      ws.onopen = () => {
        console.log('connected to websocket')
        setTimeout(() => {
          ws.send(JSON.stringify({ type: 'join_notifications', message: { data: 1 } }))
        }, 5000)
        console.log('sent websocket')
      }

      ws.onerror = (e) => {
        console.log('websocket error', e)
      }

      ws.onmessage = (e) => {
        const data = JSON.parse(e.data)
        console.log(data)

        set_ws_messages([data, ...ws_messages])
      }

      ws.onclose = (e) => {
        console.log('websocket disconnected', e)
      }
    } else {
      const ws_object = websocketobj()
      set_ws_object(ws_object)
    }
    console.log(ws)
  }, [ws])
  return (
    <RootSiblingParent>
      <PaperProvider>
        <View className="flex flex-1 ">
          <Stack
            screenOptions={{
              headerShown: false
            }}
          />
        </View>
      </PaperProvider>
    </RootSiblingParent>
  )
}
