import 'expo-dev-client'
import { View } from 'react-native'
import { Tabs } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Icon } from 'react-native-paper'
import { colors } from 'src/config/theme'

export default function TabLayout() {
  return (
    <View className="flex flex-1 ">
      <Tabs
        screenOptions={{
          headerStyle: { backgroundColor: 'transparent' },
          headerLeftContainerStyle: { paddingLeft: 16 },
          headerRightContainerStyle: { paddingRight: 16 },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.grayText,

          tabBarHideOnKeyboard: true
        }}>
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ color, focused }) => {
              if (focused) {
                return (
                  <View className="relative">
                    <View className="relative w-[50] h-[50] bottom-2 mx-auto p-1 rounded-full bg-primary">
                      <View className="flex my-auto items-center">
                        <Icon source={'home'} size={40} color={colors.whiteText} />
                      </View>
                    </View>
                  </View>
                )
              }
              return <Icon source={'home'} size={35} color={color} />
            },
            title: 'Home'
          }}
        />
        <Tabs.Screen
          name="conversations"
          options={{
            title: 'Inbox',
            tabBarIcon: ({ color, focused }) => {
              if (focused) {
                return (
                  <View className="relative">
                    <View className="relative w-[50] h-[50] bottom-2 mx-auto p-1 rounded-full bg-primary">
                      <View className="flex my-auto items-center">
                        <Icon source={'phone-message'} size={40} color={colors.whiteText} />
                      </View>
                    </View>
                  </View>
                )
              }
              return <Icon source={'phone-message'} size={35} color={color} />
            }
          }}
        />
        <Tabs.Screen
          name="payments"
          options={{
            title: 'Payments',
            tabBarIcon: ({ color, focused }) => {
              if (focused) {
                return (
                  <View className="relative">
                    <View className="relative w-[50] h-[50] bottom-2 mx-auto p-1 rounded-full bg-primary">
                      <View className="flex my-auto items-center">
                        <Icon source={'hand-coin'} size={40} color={colors.whiteText} />
                      </View>
                    </View>
                  </View>
                )
              }
              return <Icon source={'hand-coin'} size={35} color={color} />
            }
          }}
        />

        <Tabs.Screen
          name="properties"
          options={{
            title: 'Properties',
            tabBarIcon: ({ color, focused }) => {
              if (focused) {
                return (
                  <View className="relative">
                    <View className="relative w-[50] h-[50] bottom-2 mx-auto p-1 rounded-full bg-primary">
                      <View className="flex my-auto items-center">
                        <Icon source={'home-group'} size={40} color={colors.whiteText} />
                      </View>
                    </View>
                  </View>
                )
              }
              return <Icon source={'home-group'} size={35} color={color} />
            }
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, focused }) => {
              if (focused) {
                return (
                  <View className="relative">
                    <View className="relative w-[50] h-[50] bottom-2 mx-auto p-1 rounded-full bg-primary">
                      <View className="flex my-auto items-center">
                        <Icon source={'account-settings'} size={40} color={colors.whiteText} />
                      </View>
                    </View>
                  </View>
                )
              }
              return <Icon source={'account-settings'} size={35} color={color} />
            }
          }}
        />
        <Tabs.Screen name="propertyDetails" options={{ href: null }} />
        <Tabs.Screen name="messages" options={{ href: null }} />
        <Tabs.Screen name="manageProperty" options={{ href: null }} />
      </Tabs>
      <StatusBar style="auto" animated />
    </View>
  )
}
