import { Image, Text, View } from 'react-native'
import React from 'react'
// import { Icon } from 'react-native-paper'
import estatePlaceholder from '../assets/images/estatePlaceholder.jpg'
import { typograhpy } from 'src/config/theme'

function Amenities({ amenities }: { amenities: string[] }) {
  return (
    <View className="bg-lightBackground p-3 rounded-lg my-2">
      <View className="mt-3 space-y-4">
        <View className="flex flex-row flex-wrap">
          {amenities.map((item, index) => {
            return (
              <View key={index} className="basis-1/3 p-2">
                <View className="flex items-center space-y-4 p-1 border border-grayText rounded-md">
                  <Image className="w-[50px] h-[50px]" source={estatePlaceholder} />
                  <Text className="text-grayText" style={typograhpy.lableText}>
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
