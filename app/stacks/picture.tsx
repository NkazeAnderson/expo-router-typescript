import { View, Image } from 'react-native'
import React from 'react'
import estatePlaceholder from '../../src/assets/images/house1.png'
// import estatePlaceholder2 from '../../src/assets/images/house2.png'

const picture = () => {
  return (
    <View className="flex flex-1">
      <View className="absolute w-full h-screen ">
        <Image source={estatePlaceholder} style={{ width: '100%', height: '100%', objectFit: 'fill', opacity: 0.04 }} />
      </View>
      <View className=" absolute w-full h-full my-auto  py-[100px]">
        <View className="my-auto w-full">
          <Image source={estatePlaceholder} style={{ width: '100%', objectFit: 'contain' }} />
        </View>
      </View>
    </View>
  )
}

export default picture
