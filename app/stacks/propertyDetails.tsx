import { Pressable, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import { colors, typograhpy } from 'src/config/theme'
import SectionHeading from 'src/components/SectionHeading'
import PropertyCard from 'src/components/PropertyCard'
import { ScrollView } from 'react-native'
import LongPropertyCard from 'src/components/LongPropertyCard'
import { Icon, IconButton } from 'react-native-paper'
import Amenities from 'src/components/Amenities'
import { apartment_Results_Sample } from 'src/config/constants'
import AgentCard from 'src/components/AgentCard'
import ButtonComponent from 'src/components/ButtonComponent'
import { get } from 'utilities/useFetch'
import { Video } from 'expo-av'
import Loading from 'src/components/Loading'
import { globalState } from 'app/_layout'

const propertDetails = () => {
  const user = globalState((state) => state.userInfo)
  const videoSharedRef: React.MutableRefObject<Video | null> = useRef(null)
  const { propertyID } = useLocalSearchParams<{ propertyID: string }>()
  const [apartment, setApartment] = useState<undefined | typeof apartment_Results_Sample>(undefined)
  const [otherProperties, setOtherProperties] = useState<undefined | (typeof apartment_Results_Sample)[]>(undefined)
  //   const property = properties[0]
  useEffect(() => {
    !apartment && getApartments()
    apartment &&
      get(`/user/${apartment?.posted_by.id}/properties/`)
        .then((result: { data: { results: (typeof apartment_Results_Sample)[] } }) => {
          setOtherProperties(result.data.results)
        })
        .catch((e) => {
          console.log(e)
        })
  }, [apartment])

  const getApartments = () => {
    get(`/property/apartment/${propertyID}`)
      .then((result: { data: typeof apartment_Results_Sample }) => {
        setApartment(result.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  if (!apartment) {
    return <Loading />
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex flex-1">
      <View>
        <Text className="text-center  text-primary" style={typograhpy.h3}>
          {apartment.name}
        </Text>
        <PropertyCard property={apartment} withImages videoSharedRef={videoSharedRef} />
      </View>
      <View className="px-6">
        <View>
          <SectionHeading title="Amenities" />
          <Text className="" style={typograhpy.lableText}>
            This Property has the following amenities
          </Text>
          <Amenities amenities={apartment.amenities_details} />
        </View>
        <View className="mt-3">
          <SectionHeading title="Posted By" />
          <AgentCard agent={apartment.posted_by} description={apartment.description} />
        </View>
        <View className="space-y-2 mb-3">
          {user?.id === apartment.posted_by.id ? (
            <View>
              <ButtonComponent
                text="Edit"
                color="whiteText"
                background="primary"
                action={() => router.push(`/stacks/manageProperty?edit=${apartment.id}`)}
              />
            </View>
          ) : (
            <>
              <View>
                <ButtonComponent
                  text="Message Agent"
                  color="whiteText"
                  background="primary"
                  action={() => {
                    videoSharedRef.current?.pauseAsync()
                    router.push(`/stacks/messages?conversationId=1&propertyID=${propertyID}`)
                  }}
                />
              </View>
              <View>
                <ButtonComponent
                  text="Save and Pay"
                  color="whiteText"
                  background="secondary"
                  action={() => {
                    videoSharedRef.current?.pauseAsync()
                    router.push('/tabs/payments')
                  }}
                />
              </View>
            </>
          )}
        </View>
      </View>

      {otherProperties && (
        <View className="px-1">
          <SectionHeading title="Others By Poster" link="View all" />
          {otherProperties.map((property) => (
            <LongPropertyCard key={property.id} property={property} />
          ))}
        </View>
      )}

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
          title: 'Property Details',
          headerTitleStyle: typograhpy.h3,
          headerRight: () => <IconButton icon={user?.id === apartment.posted_by.id ? 'pen' : 'book-variant'} iconColor={colors.primary} size={30} />
        }}
      />
    </ScrollView>
  )
}

export default propertDetails
