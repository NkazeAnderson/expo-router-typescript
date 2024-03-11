import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import { colors, typograhpy } from 'src/config/theme'
import ButtonComponent from './ButtonComponent'
import Slider from '@react-native-community/slider'
import sliderThumb from '../assets/images/icons8-left-right-arrow-48.png'
import InputComponent from './InputComponent'
import { propertyTypes } from 'src/config/constants'
import millify from 'millify'

const Filter = ({ filters, setFilters }: { filters: Filters; setFilters: (filter: Filters) => void }) => {
  const [price, setPrice] = useState(filters.price)
  const [bed, setBed] = useState(1)
  const [kitchen, setKitchen] = useState(1)
  const [bath, setBath] = useState(1)
  const [propertyType, setPropertyType] = useState(filters.propertyType)
  const [location, setLocation] = useState(filters.location)

  return (
    <View className="mb-5">
      <Text style={typograhpy.h3}>Looking for:</Text>
      <FlatList
        data={propertyTypes}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View className="mr-2" key={index}>
            <ButtonComponent
              action={() => {
                filters.propertyType = item
                filters.price = item === 'Land' ? 500000 : 5000
                setPropertyType(item)
                setPrice(filters.price)
                setFilters(filters)
              }}
              text={item}
              color={filters.propertyType === item ? 'whiteText' : 'primaryText'}
              background={filters.propertyType === item ? 'primary' : 'grayBackground'}
            />
          </View>
        )}
      />
      <View className="mt-4">
        <Text style={typograhpy.h3}>Located in:</Text>

        <InputComponent
          placeholder={location}
          icon="google-maps"
          value={location}
          setValue={(value: string) => {
            setLocation(value)
            filters.location = value
            setFilters(filters)
          }}
        />
      </View>
      <View className="mt-4">
        <Text style={typograhpy.h3}>Priced at:</Text>
        <Text style={{ ...typograhpy.regularText, paddingLeft: 15 }}>
          FCFA <Text style={typograhpy.h3}> {millify(price)} </Text> {propertyType !== 'Land' && '/ mo'}
        </Text>

        <Slider
          style={{ marginTop: 10 }}
          onValueChange={(value) => {
            setPrice(value)
            filters.price = value
            setFilters(filters)
          }}
          value={price}
          minimumValue={propertyType !== 'Land' ? 5000 : 500000}
          maximumValue={propertyType !== 'Land' ? 150000 : 5000000}
          thumbImage={sliderThumb}
          maximumTrackTintColor={colors.primary}
          minimumTrackTintColor={colors.primary}
          step={5000}
        />
      </View>

      {propertyType === 'Apartment' && (
        <View className="mt-6">
          <Text style={typograhpy.h3}>With:</Text>
          <View className="my-2">
            <Text className="text-center" style={{ ...typograhpy.regularText, paddingLeft: 15 }}>
              <Text style={typograhpy.h3}>{bed}</Text> Bed {bed <= 1 ? 'Room' : 'Rooms'}
            </Text>

            <Slider
              style={{ marginTop: 10 }}
              onValueChange={(value) => {
                setBed(value)
                if (filters.propertyType === 'Apartment') {
                  filters.rooms = value
                }
                setFilters(filters)
              }}
              value={bed}
              minimumValue={1}
              maximumValue={5}
              thumbImage={sliderThumb}
              maximumTrackTintColor={colors.primary}
              minimumTrackTintColor={colors.primary}
              step={1}
            />
          </View>
          <View className="my-2">
            <Text className="text-center" style={{ ...typograhpy.regularText, paddingLeft: 15 }}>
              <Text style={typograhpy.h3}>{kitchen}</Text> Internal {bed <= 1 ? 'Kitchen' : 'Kitchens'}
            </Text>

            <Slider
              style={{ marginTop: 10 }}
              onValueChange={(value) => {
                setKitchen(value)
                if (filters.propertyType === 'Apartment') {
                  filters.kitchen = value
                }
                setFilters(filters)
              }}
              value={kitchen}
              minimumValue={1}
              maximumValue={2}
              thumbImage={sliderThumb}
              maximumTrackTintColor={colors.primary}
              minimumTrackTintColor={colors.primary}
              step={1}
            />
          </View>
          <View className="my-2">
            <Text className="text-center" style={{ ...typograhpy.regularText, paddingLeft: 15 }}>
              <Text style={typograhpy.h3}>{bath}</Text> Internal {bed <= 1 ? 'Toilet' : 'Toilets'}
            </Text>

            <Slider
              style={{ marginTop: 10 }}
              onValueChange={(value) => {
                setBath(value)
                if (filters.propertyType === 'Apartment') {
                  filters.toilet = value
                }
                setFilters(filters)
              }}
              value={bath}
              minimumValue={1}
              maximumValue={2}
              thumbImage={sliderThumb}
              maximumTrackTintColor={colors.primary}
              minimumTrackTintColor={colors.primary}
              step={1}
            />
          </View>
        </View>
      )}
    </View>
  )
}

export default Filter
