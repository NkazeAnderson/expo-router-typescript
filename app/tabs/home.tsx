import { View, Text, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Tabs } from 'expo-router'
import { typograhpy } from 'src/config/theme'
import profilePlaceholder from '../../src/assets/images/profilePlaceHolder.png'
import InputComponent from 'src/components/InputComponent'
import ButtonComponent from 'src/components/ButtonComponent'
import SectionHeading from 'src/components/SectionHeading'
import PropertyCard from 'src/components/PropertyCard'
import { ScrollView } from 'react-native'
import LongPropertyCard from 'src/components/LongPropertyCard'
import { apartment_Results_Sample, propertyTypes } from 'src/config/constants'
import Filter from 'src/components/Filter'
import FilterIconButtons from 'src/components/FilterIconButtons'
import { FlatList } from 'react-native'
import { Badge } from 'react-native-paper'
import { router } from 'expo-router'
import { get, refreshToken } from 'utilities/useFetch'
import Toast from 'react-native-root-toast'
import { globalState } from 'app/_layout'
import Loading from 'src/components/Loading'

type Apartment = (typeof apartment_Results_Sample)[]
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

const home = () => {
  const [toggleFilter, setToggleFilter] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(true)
  const [apartments, setApartments] = useState<undefined | Apartment>(undefined)
  const user = globalState((state) => state.userInfo)
  const setUser = globalState((state) => state.setUserInfo)

  const [filters, setFilters] = useState<Filters>({
    propertyType: 'Apartment',
    price: 15000,
    isMonthly: true,
    location: 'Bamenda',
    rooms: 1,
    toilet: 1,
    kitchen: 1
  })

  const getApartments = async () => {
    try {
      const userInfo = await get('/user/myinfo/')
      setUser(userInfo.data[0])
      const apartmentData = await get('/property/apartment/')
      setApartments(apartmentData.data.results)
      setLoading(false)
    } catch (error) {
      //
      refreshToken()
        .then(() => {
          setRefresh(!refresh)
        })
        .catch(() => {
          router.replace('/login')
          Toast.show('You are not logged in.', {
            duration: Toast.durations.LONG,
            backgroundColor: '#4a43eb'
          })
        })

      // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
      // setTimeout(function hideToast() {
      //   Toast.hide(toast)
      // }, 500)
    }
  }

  useEffect(() => {
    !apartments && getApartments()
  }, [refresh])

  const time = new Date()
  if (loading) {
    return <Loading />
  }
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
        {apartments && (
          <>
            <View className="mt-5">
              <SectionHeading title="Recommended" link="See all" />
              {apartments.map((apartment, index) => (
                <PropertyCard key={index} property={apartment} />
              ))}
            </View>

            <View>
              <SectionHeading title="Featured" />
              <LongPropertyCard property={apartments[0]} />
            </View>
          </>
        )}
      </ScrollView>
      {toggleFilter && (
        <View className="flex flex-1 absolute w-screen h-screen">
          <Pressable onPress={() => setToggleFilter(!toggleFilter)} className="flex-grow bg-[#000000] " style={{ opacity: 0.6 }}></Pressable>
          <View className="flex absolute h-[75vh] w-full bottom-[100px] bg-lightBackground rounded-t-[50px] px-3" style={{ opacity: 1 }}>
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
              <ButtonComponent
                action={() => {
                  setToggleFilter(!toggleFilter)
                  get(`/property/apartment/?location=${filters.location}`).then((res) => {
                    setApartments(res.data.results)
                  })
                }}
                text="Find"
                color="whiteText"
                background="primary"
              />
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
                {user?.first_name}
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
              <Badge style={{ right: -5, zIndex: 5, position: 'absolute' }}>3</Badge>
              <Image className="w-[50px] h-[50px] rounded-full object-cover" source={profilePlaceholder} />
            </Pressable>
          )
        }}
      />
    </View>
  )
}

export default home
