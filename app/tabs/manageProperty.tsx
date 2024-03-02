import { Pressable, Text } from 'react-native'
import React from 'react'
import { Tabs, router, useLocalSearchParams } from 'expo-router'
import { typograhpy } from 'src/config/theme'

import { ScrollView } from 'react-native'

import { Icon } from 'react-native-paper'
import InputComponent from 'src/components/InputComponent'
import { View } from 'react-native'

const manageProperty = () => {
  const { edit } = useLocalSearchParams()

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex flex-1 px-2">
      <View className="p-2 bg-primary rounded-lg">
        <Text className="bg-primary text-whiteText" style={typograhpy.h3}>
          City Name
        </Text>
        <InputComponent placeholder="Search for user or message" icon="home-city" />
      </View>

      <Tabs.Screen
        options={{
          headerLeft: () => (
            <Pressable
              onPress={() => {
                router.push('/tabs/properties')
              }}>
              <Icon source={'chevron-left'} size={30} />
            </Pressable>
          ),
          title: edit ? 'Edit Property' : 'Add Property',
          headerTitleStyle: typograhpy.h3
        }}
      />
    </ScrollView>
  )
}

export default manageProperty
