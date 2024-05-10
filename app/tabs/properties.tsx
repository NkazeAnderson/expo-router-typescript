import { View, Pressable, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Tabs, router } from 'expo-router'
import { typograhpy } from 'src/config/theme'
import ButtonComponent from 'src/components/ButtonComponent'
import SectionHeading from 'src/components/SectionHeading'
import { ScrollView } from 'react-native'
import LongPropertyCard from 'src/components/LongPropertyCard'
import { Icon } from 'react-native-paper'
import { apartment_Results_Sample } from 'src/config/constants'
import { get } from 'utilities/useFetch'
import { globalState } from 'app/_layout'
// import { properties } from 'src/config/constants'
const propertiesPage = () => {
  const user = globalState((state) => state.userInfo)
  const [properties, setProperties] = useState<undefined | (typeof apartment_Results_Sample)[]>(undefined)
  useEffect(() => {
    user &&
      get(`/user/${user.id}/properties/`).then((response) => {
        setProperties(response.data)
      })
  }, [user])

  return (
    <View className="flex flex-1">
      <ScrollView showsVerticalScrollIndicator={false} className="flex flex-1 px-4">
        <SectionHeading title="My Properties" />
        {properties && properties.length > 0 ? (
          properties.map((property) => <LongPropertyCard key={property.id} isPoster={true} property={property} />)
        ) : (
          <View className="flex flex-1">
            <Text>You do not have any properties yet....</Text>
            <Text>Add One</Text>
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
            title: 'Properties',
            headerTitleStyle: typograhpy.h3
          }}
        />
      </ScrollView>
      <View className="w-full p-2 pb-4">
        <ButtonComponent text="Add" icon="plus" color="whiteText" background="primary" action={() => router.push('/stacks/manageProperty')} />
      </View>
    </View>
  )
}

export default propertiesPage
