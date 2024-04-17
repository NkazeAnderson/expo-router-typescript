import { Pressable, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Tabs, router } from 'expo-router'
import { typograhpy } from 'src/config/theme'

import { ScrollView } from 'react-native'

import { Icon } from 'react-native-paper'
import BalanceCard from 'src/components/BalanceCard'
import SectionHeading from 'src/components/SectionHeading'
import PaymentCard from 'src/components/PaymentCard'
import { apartment_Results_Sample } from 'src/config/constants'
import { get } from 'utilities/useFetch'
import Toast from 'react-native-root-toast'

// import UserCard from 'src/components/UserCard'

const payments = () => {
  const [properties, setProperties] = useState<undefined | (typeof apartment_Results_Sample)[]>(undefined)

  const removeProperty = (id: number) => {
    get(`/property/apartment/${id}/interested/`).then((result) => {
      if (result.data.action === 'removed') {
        Toast.show('Removed')
        setProperties(undefined)
      }
    })
  }
  useEffect(() => {
    !properties &&
      get('/property/interested/').then((res) => {
        setProperties(res.data)
      })
  }, [properties])
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex flex-1 px-2">
      <BalanceCard />
      <View className="mt-2">
        <SectionHeading title="Properties Pending Payments" />
        {properties ? (
          properties.map((property) => (
            <PaymentCard
              key={property.id}
              property={property}
              remove={() => {
                removeProperty(property.id)
              }}
            />
          ))
        ) : (
          <View>
            <Text>No Interested properties</Text>
          </View>
        )}
      </View>
      <View className="mt-2">
        <SectionHeading title="Processed Payments" />
        {properties && <PaymentCard property={properties[0]} isPaid />}
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
          title: 'Payments',
          headerTitleStyle: typograhpy.h3
        }}
      />
    </ScrollView>
  )
}

export default payments
