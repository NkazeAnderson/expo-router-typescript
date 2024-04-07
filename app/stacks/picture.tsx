import { View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { domain } from 'utilities/useFetch'
import PictureComponent from 'src/components/PictureComponent'
// import estatePlaceholder2 from '../../src/assets/images/house2.png'

const picture = () => {
  const { url } = useLocalSearchParams<{ url: string }>()
  console.log(url)
  return (
    <View className="flex flex-1">
      <PictureComponent url={url ? `${domain}${url}` : 'none'} />
    </View>
  )
}

export default picture
