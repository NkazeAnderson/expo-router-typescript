import { View, Text, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Tabs } from 'expo-router'
import { typograhpy } from 'src/config/theme'
import profilePlaceholder from '../../src/assets/images/profilePlaceHolder.png'
import InputComponent from 'src/components/InputComponent'
import ButtonComponent from 'src/components/ButtonComponent'
import SectionHeading from 'src/components/SectionHeading'
import PropertyCard from 'src/components/PropertyCard'
import { ScrollView } from 'react-native'
import LongPropertyCard from 'src/components/LongPropertyCard'
import { properties, propertyTypes, users } from 'src/config/constants'
import Filter from 'src/components/Filter'
import FilterIconButtons from 'src/components/FilterIconButtons'
import { FlatList } from 'react-native'
import { create } from 'zustand'
import { Video } from 'expo-av'
import { Badge } from 'react-native-paper'
import { router } from 'expo-router'
const user = users[0]
interface GlobalStates {
  videoState: Video | null
  setVideoState: (_state: Video | null) => void
}
function getTimePeriod(time: Date) {
  const hours = time.getHours()
  const minutes = time.getHours()
  if (hours <= 11 && minutes <= 59) {
    return 'morning'
  } else if (hours <= 16) {
    return 'afternoon'
  } else if (hours <= 22) {
    return 'evening'
  } else {
    return 'night'
  }
}

export const globalStates = create<GlobalStates>()((set) => ({
  videoState: null,
  setVideoState: (_state) => set(() => ({ videoState: _state }))
}))
const home = () => {
  const [toggleFilter, setToggleFilter] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    propertyType: 'Apartment',
    price: 15000,
    isMonthly: true,
    location: 'Bamenda',
    rooms: 1,
    toilet: 1,
    kitchen: 1
  })

  const time = new Date()
  return (
    <View className="flex flex-1 relative">
      <ScrollView showsVerticalScrollIndicator={false} className="flex flex-1 px-4 ">
        <View className="flex flex-row space-x-2 items-center">
          <View className="flex flex-grow">
            <InputComponent
              placeholder="Search"
              icon="home-search-outline"
              value={filters.location}
              setValue={(value) => {
                filters.location = value
                setFilters(filters)
                setRefresh(!refresh)
                //setToggleFilter(!toggleFilter)
              }}
            />
          </View>
          <View className="h-full py-2">
            <View className=" p-1 bg-primary rounded-2xl">
              <ButtonComponent
                text="Filter"
                action={() => setToggleFilter(!toggleFilter)}
                color="whiteText"
                background="primary"
                icon="filter-variant"
              />
            </View>
          </View>
        </View>

        <FlatList
          data={propertyTypes}
          horizontal
          renderItem={({ item, index }) => {
            return (
              <FilterIconButtons
                filter={filters}
                setFilters={(filter) => {
                  setFilters(filter)
                  setRefresh(!refresh)
                }}
                key={index}
                propertyType={item}
              />
            )
          }}
          contentContainerStyle={{ marginTop: 10 }}
        />

        <View className="mt-5">
          <SectionHeading title="Recommended" link="See all" />
          <PropertyCard property={properties[0]} />
          <PropertyCard property={properties[1]} />
        </View>

        <View>
          <SectionHeading title="Featured" />
          <LongPropertyCard property={properties[1]} />
        </View>
      </ScrollView>
      {toggleFilter && (
        <View className="flex flex-1 absolute w-screen h-screen">
          <Pressable onPress={() => setToggleFilter(!toggleFilter)} className="flex-grow bg-[#000000] " style={{ opacity: 0.6 }}></Pressable>
          <View className="flex absolute h-[55vh] w-full bottom-[100px] bg-lightBackground rounded-t-[50px] px-3" style={{ opacity: 1 }}>
            <View className="p-4">
              <Text className="text-center text-primary" style={typograhpy.h3}>
                Filter
              </Text>
            </View>
            <ScrollView className="flex-grow pb-4">
              <Filter
                filters={filters}
                setFilters={(filter) => {
                  setFilters(filter)
                }}
              />
            </ScrollView>
            <View className="p-2">
              <ButtonComponent action={() => setToggleFilter(!toggleFilter)} text="Find" color="whiteText" background="primary" />
            </View>
          </View>
        </View>
      )}
      <Tabs.Screen
        options={{
          headerLeft: () => (
            <View>
              <Text className="text-grayText" style={typograhpy.messageText}>
                {`Good ${getTimePeriod(time)}`}
              </Text>
              <Text className="capitalize" style={typograhpy.h2}>
                {' '}
                {user.name}
              </Text>
            </View>
          ),
          title: 'Home',
          headerTitleStyle: { display: 'none' },
          headerRight: () => (
            <Pressable
              onPress={() => {
                router.push('/tabs/settings')
              }}>
              <Badge style={{ top: 10, zIndex: 5 }}>3</Badge>
              <Image className="w-[50px] h-[50px] rounded-full object-cover" source={profilePlaceholder} />
            </Pressable>
          )
        }}
      />
    </View>
  )
}

export default home
