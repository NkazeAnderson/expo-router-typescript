import { Pressable, Text, View } from 'react-native'
import React from 'react'
import { Tabs, router, useLocalSearchParams } from 'expo-router'
import { colors, typograhpy } from 'src/config/theme'
import SectionHeading from 'src/components/SectionHeading'
import PropertyCard from 'src/components/PropertyCard'
import { ScrollView } from 'react-native'
import LongPropertyCard from 'src/components/LongPropertyCard'
import { Icon, IconButton } from 'react-native-paper'
import Amenities from 'src/components/Amenities'
import { properties, users } from 'src/config/constants'
import AgentCard from 'src/components/AgentCard'
import ButtonComponent from 'src/components/ButtonComponent'

const propertDetails = () => {
  const { propertyID } = useLocalSearchParams<{ propertyID: string }>()
  const isPoster = false
  //   const property = properties[0]
  const property = properties[parseInt(propertyID ? propertyID : '0')]
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex flex-1">
      <View>
        <Text className="text-center text-primary" style={typograhpy.h3}>
          {property.name}
        </Text>
        <PropertyCard property={property} withImages />
      </View>
      <View className="px-6">
        <View>
          <SectionHeading title="Amenities" />
          <Text className="" style={typograhpy.lableText}>
            This Property has the following amenities
          </Text>
          <Amenities amenities={property.amenities} />
        </View>
        <View className="mt-3">
          <SectionHeading title="Posted By" />
          <AgentCard agent={users[1]} description={property.description} />
        </View>
        <View className="space-y-2 mb-3">
          {isPoster ? (
            <View>
              <ButtonComponent
                text="Edit"
                color="whiteText"
                background="primary"
                action={() => router.replace(`/tabs/messages?conversationId=1&propertyID=${propertyID}`)}
              />
            </View>
          ) : (
            <>
              <View>
                <ButtonComponent
                  text="Message Agent"
                  color="whiteText"
                  background="primary"
                  action={() => router.replace(`/tabs/messages?conversationId=1&propertyID=${propertyID}`)}
                />
              </View>
              <View>
                <ButtonComponent text="Save and Pay" color="whiteText" background="secondary" action={() => router.navigate('/tabs/payments')} />
              </View>
            </>
          )}
        </View>
      </View>

      <View className="px-1">
        <SectionHeading title="Others By Poster" link="View all" />
        <LongPropertyCard property={property} />
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
          title: 'Property Details',
          headerTitleStyle: typograhpy.h3,
          headerRight: () => <IconButton icon={isPoster ? 'pen' : 'book-variant'} iconColor={colors.primary} size={30} />
        }}
      />
    </ScrollView>
  )
}

export default propertDetails
