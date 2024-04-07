import 'expo-dev-client'
import { View } from 'react-native'
import { Stack } from 'expo-router'
import { RootSiblingParent } from 'react-native-root-siblings'
import { PaperProvider } from 'react-native-paper'
import { create } from 'zustand'
import { user_sample } from 'src/config/constants'

export interface GlobalState {
  userInfo: typeof user_sample | undefined
  setUserInfo: (user: typeof user_sample) => void
}
export const globalState = create<GlobalState>((set) => ({
  userInfo: undefined,
  setUserInfo: (user) => set(() => ({ userInfo: user }))
}))
export default function AppLayout() {
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
