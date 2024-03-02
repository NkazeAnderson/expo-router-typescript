import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import { typograhpy } from 'src/config/theme'
import ButtonComponent from './ButtonComponent'
import Slider from '@react-native-community/slider'

const Filter = () => {
  const [price, setPrice] = useState(5000)
  return (
    <View>
      <Text style={typograhpy.h3}>Property Types</Text>
      <FlatList
        data={['Apartment', 'Land', 'Studio']}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View className="mr-2" key={index}>
            <ButtonComponent text={item} color="whiteText" background="secondary" />
          </View>
        )}
      />
      <View className="mt-4">
        <Text style={typograhpy.h3}>Price</Text>
        <Text style={{ ...typograhpy.regularText, paddingLeft: 15 }}>FCFA {price} / mo</Text>

        <Slider
          style={{ marginTop: 10 }}
          onValueChange={(value) => {
            setPrice(value)
          }}
          value={price}
          minimumValue={5000}
          maximumValue={300000}
          step={5000}
        />
      </View>
    </View>
  )
}

export default Filter
