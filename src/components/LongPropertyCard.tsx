import { FlatList, Image, Pressable, Text, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-paper'
import estatePlaceholder from '../assets/images/estatePlaceholder.jpg'
import { colors, typograhpy } from 'src/config/theme'
import { properties } from 'src/config/constants'
import millify from 'millify'
import { router } from 'expo-router'
import ButtonComponent from './ButtonComponent'

function LongPropertyCard({ property, isPoster }: { property: (typeof properties)[1]; isPoster?: boolean }) {
  const viewPropertyDetails = () => {
    router.push(`/stacks/propertyDetails?propertyID=${property.id}`)
  }

  return (
    <Pressable onPress={() => viewPropertyDetails()} className=" flex flex-row bg-lightBackground p-3 rounded-2xl my-2 border-b-4 border-b-secondary">
      <View>
        <Image className="w-[80] h-[80] rounded-lg" source={estatePlaceholder} />
      </View>
      <View className="pl-2">
        <View className="flex flex-row justify-between items-center">
          <Text className="capitalize" style={typograhpy.h3}>
            {property.subCategory}
          </Text>
          <Text className="text-grayText" style={typograhpy.lableText}>
            {property.isForSale ? `FCFA ${millify(property.price)}` : ` FCFA ${millify(property.price)} / mo`}
          </Text>
        </View>
        <View className="flex flex-row items-center space-x-2">
          <Icon source={'map-marker'} size={18} color={colors.grayText} />
          <Text className="capitalize text-grayText" style={typograhpy.regularText}>
            {property.address}
          </Text>
        </View>
        <View className="mt-0">
          {isPoster ? (
            <View>
              <ButtonComponent
                text="Manage"
                color="whiteText"
                background="primary"
                action={() => {
                  router.push(`/stacks/manageProperty?edit=${property.id}`)
                }}
              />
            </View>
          ) : (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={['bed', 'sitting', 'kitchen', 'toilet']}
              renderItem={({ item, index }) => (
                <View key={index} className="flex flex-row items-center mx-2 space-x-1 p-1">
                  <Icon
                    source={item === 'bed' ? 'bed' : item === 'sitting' ? 'chair-rolling' : item === 'kitchen' ? 'food-turkey' : 'toilet'}
                    size={16}
                    color={colors.orange}
                  />
                  <Text className="text-grayText" style={typograhpy.lableText}>
                    {
                      //@ts-expect-error: keys of item
                      property[item]
                    }
                  </Text>
                </View>
              )}
            />
          )}
        </View>
      </View>
    </Pressable>
  )
}

export default LongPropertyCard
