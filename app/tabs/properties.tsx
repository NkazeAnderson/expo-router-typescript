import { View, Pressable } from 'react-native'
import React from 'react'
import { Tabs, router } from 'expo-router'
import { typograhpy } from 'src/config/theme'
import ButtonComponent from 'src/components/ButtonComponent'
import SectionHeading from 'src/components/SectionHeading'
import { ScrollView } from 'react-native'
import LongPropertyCard from 'src/components/LongPropertyCard'
import { Icon } from 'react-native-paper'
import { properties } from 'src/config/constants'
// import { properties } from 'src/config/constants'
const propertiesPage = () => {
  return (
    <View className="flex flex-1">
      <ScrollView showsVerticalScrollIndicator={false} className="flex flex-1 px-4">
        <View>
          <SectionHeading title="My Properties" />
          <LongPropertyCard isPoster={true} property={properties[1]} />
        </View>

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
            title: 'Properties',
            headerTitleStyle: typograhpy.h3
          }}
        />
      </ScrollView>
      <View className="w-full p-2 pb-4">
        <ButtonComponent text="Add" icon="plus" color="whiteText" background="primary" action={() => router.push('/tabs/manageProperty')} />
      </View>
    </View>
  )
}

export default propertiesPage
