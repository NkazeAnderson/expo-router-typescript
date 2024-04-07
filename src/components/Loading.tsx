import { View } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'

const Loading = () => {
  return (
    <View className="flex flex-1 items-center bg-grayBackground">
      <View className="my-auto">
        <ActivityIndicator />
      </View>
    </View>
  )
}

export default Loading
