import { Text, Image, Pressable } from 'react-native'
import apartment from '../assets/images/house.png'
import land from '../assets/images/land.png'
import businessPlace from '../assets/images/store.png'
import selfContent from '../assets/images/selfContent.png'
import React from 'react'
import { typograhpy } from 'src/config/theme'

const FilterIconButtons = ({
  propertyType,
  filter,
  setFilters
}: {
  filter: Filters
  propertyType: propertyTypes
  setFilters: (filter: Filters) => void
}) => {
  let icon = null
  switch (propertyType) {
    case 'Apartment':
      icon = apartment
      break
    case 'Land':
      icon = land
      break
    case 'Business Place':
      icon = businessPlace
      break

    default:
      icon = selfContent
      break
  }
  return (
    <Pressable
      onPress={() => {
        filter.propertyType = propertyType
        setFilters(filter)
      }}
      className={`w-[100] mx-2 bg-lightBackground border rounded-md ${filter.propertyType === propertyType && 'border-primary'}`}>
      <Image className="w-[50] h-[50] rounded-md mx-auto" source={icon} />
      <Text className="text-center" style={typograhpy.lableText}>
        {propertyType}
      </Text>
    </Pressable>
  )
}

export default FilterIconButtons
