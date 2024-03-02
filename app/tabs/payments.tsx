import { Pressable, View } from 'react-native'
import React from 'react'
import { Tabs, router } from 'expo-router'
import { typograhpy } from 'src/config/theme'

import { ScrollView } from 'react-native'

import { Icon } from 'react-native-paper'
import BalanceCard from 'src/components/BalanceCard'
import SectionHeading from 'src/components/SectionHeading'
import PaymentCard from 'src/components/PaymentCard'
import { properties } from 'src/config/constants'

// import UserCard from 'src/components/UserCard'

const payments = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex flex-1 px-2">
      <BalanceCard />
      <View className="mt-2">
        <SectionHeading title="Pending" />
        <PaymentCard property={properties[1]} />
      </View>
      <View className="mt-2">
        <SectionHeading title="Processed" />
        <PaymentCard property={properties[0]} isPaid />
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
