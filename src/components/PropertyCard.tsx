import { FlatList, Image, Pressable, Text, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-paper'
import estatePlaceholder from '../assets/images/estatePlaceholder.jpg'
import estatePlaceholder1 from '../assets/images/house1.png'
import estatePlaceholder2 from '../assets/images/house2.png'
import { colors, typograhpy } from 'src/config/theme'
import { properties } from 'src/config/constants'
import millify from 'millify'
import { router } from 'expo-router'

function PropertyCard({ property, withImages }: { property: (typeof properties)[1]; withImages?: boolean }) {
  const viewPropertyDetails = () => {
    router.push(`/tabs/propertyDetails?propertyID=${property.id}`)
  }

  return (
    <View className="bg-lightBackground p-3 rounded-2xl my-2 border-b-4 border-b-primary">
      <Pressable onPress={() => viewPropertyDetails()}>
        <Image className="w-[100%] h-[25vh] rounded-lg" source={estatePlaceholder} />
      </Pressable>
      <View className="flex flex-row justify-between items-center">
        <Text className="capitalize" style={typograhpy.h2}>
          {property.subCategory}
        </Text>
        <Text style={typograhpy.regularText}>{property.isForSale ? `FCFA ${millify(property.price)}` : ` FCFA ${millify(property.price)} / mo`}</Text>
      </View>
      <View className="flex flex-row items-center space-x-2">
        <Icon source={'map-marker'} size={18} />
        <Text className="capitalize" style={typograhpy.h3}>
          {property.address}
        </Text>
      </View>
      <View className="mt-3 space-y-4">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={['bed', 'sitting', 'kitchen', 'toilet']}
          renderItem={({ item, index }) => (
            <View key={index} className="flex flex-row items-center mx-2 space-x-1 p-1 border border-grayText rounded-md">
              <Icon
                source={item === 'bed' ? 'bed' : item === 'sitting' ? 'chair-rolling' : item === 'kitchen' ? 'food-turkey' : 'toilet'}
                size={16}
                color={colors.orange}
              />
              <Text className="text-grayText" style={typograhpy.lableText}>
                {`${
                  //@ts-expect-error: keys of item
                  property[item]
                } ${item}`}
              </Text>
            </View>
          )}
        />

        {withImages && (
          <View className="mt-3 space-y-1">
            <Text className="text-center underline text-primary" style={typograhpy.h2}>
              Pictures
            </Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={property.images}
              renderItem={({ item, index }) => {
                let img = estatePlaceholder1
                if (item !== 'house.png') {
                  img = estatePlaceholder2
                }
                return (
                  <Pressable key={index} className=" h-[35vh]">
                    <Image className="rounded-lg h-full w-[70vw]" source={img} />
                  </Pressable>
                )
              }}
              ItemSeparatorComponent={() => {
                return (
                  <View className="w-4">
                    <Text className="opacity-0"> emptyness </Text>
                  </View>
                )
              }}
            />
          </View>
        )}
      </View>
    </View>
  )
}

export default PropertyCard
