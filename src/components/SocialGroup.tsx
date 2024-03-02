import { Image, View } from 'react-native'
import React, { Component } from 'react'
import Apple from '../assets/images/ap1.png'
import Google from '../assets/images/gg1.png'
import Facebook from '../assets/images/fb1.png'
export class SocialGroup extends Component {
  render() {
    return (
      <View className="  flex flex-row justify-around">
        <View className="w-12 h-12 rounded-full bg-whiteText p-1">
          <Image className="mx-auto my-auto" source={Facebook} />
        </View>
        <View className="w-12 h-12 rounded-full bg-whiteText p-1">
          <Image className="mx-auto my-auto" source={Google} />
        </View>
        <View className="w-12 h-12 rounded-full bg-whiteText p-1">
          <Image className="mx-auto my-auto" source={Apple} />
        </View>
      </View>
    )
  }
}

export default SocialGroup
