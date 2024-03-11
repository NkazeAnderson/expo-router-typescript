import { Image, Text, View } from 'react-native'
import React from 'react'
// import { Icon } from 'react-native-paper'
import { typograhpy } from 'src/config/theme'
import pool from '../assets/images/icons8-swim-48.png'
import gate from '../assets/images/icons8-gate-64.png'
import water from '../assets/images/icons8-tap-water-67.png'
import generator from '../assets/images/icons8-electrical-generator-50.png'
import gym from '../assets/images/icons8-gym-50.png'
import parking from '../assets/images/icons8-parking-64.png'
import wifi from '../assets/images/icons8-wifi-96.png'

function Amenities({ amenities }: { amenities: string[] }) {
  return (
    <View className="bg-lightBackground p-3 rounded-lg my-2">
      <View className="mt-3 space-y-4">
        <View className="flex flex-row flex-wrap">
          {amenities.map((item, index) => {
            let icon = null
            switch (item) {
              case 'parking':
                icon = parking
                break
              case 'water':
                icon = water
                break
              case 'gate':
                icon = gate
                break
              case 'pool':
                icon = pool
                break
              case 'gym':
                icon = gym
                break
              case 'generator':
                icon = generator
                break
              case 'wifi':
                icon = wifi
                break
              default:
                break
            }
            return (
              <View key={index} className="basis-1/3 p-2">
                <View className="flex items-center space-y-4 p-1 border border-grayText rounded-md">
                  <Image className="w-[50px] h-[50px]" source={icon} />
                  <Text className="text-grayText capitalize" numberOfLines={1} style={typograhpy.lableText}>
                    {item}
                  </Text>
                </View>
              </View>
            )
          })}
        </View>
      </View>
    </View>
  )
}

export default Amenities
