import { FlatList, Image, Pressable, Text, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-paper'
import { colors, typograhpy } from 'src/config/theme'
import { apartment_Results_Sample } from 'src/config/constants'
import millify from 'millify'
import { router } from 'expo-router'
import ButtonComponent from './ButtonComponent'
import { domain } from 'utilities/useFetch'

function LongPropertyCard({ property, isPoster }: { property: typeof apartment_Results_Sample; isPoster?: boolean }) {
  const viewPropertyDetails = () => {
    router.push(`/stacks/propertyDetails?propertyID=${property.id}`)
  }

  return (
    <Pressable onPress={() => viewPropertyDetails()} className=" flex flex-row bg-lightBackground p-3 rounded-2xl my-2 border-b-4 border-b-secondary">
      <View>
        <Image className="w-[80] h-[80] rounded-lg" source={{ uri: `${domain}/${property.primary_link}` }} />
      </View>
      <View className="pl-2">
        <View className="flex flex-row justify-between items-center">
          <Text className="capitalize" style={typograhpy.h3}>
            {property.category_detail}
          </Text>
          <Text className="text-grayText" style={typograhpy.lableText}>
            {property.for_sale ? `FCFA ${millify(property.price)}` : ` FCFA ${millify(property.price)} / mo`}
          </Text>
        </View>
        <View className="flex flex-row items-center space-x-2">
          <Icon source={'map-marker'} size={18} color={colors.grayText} />
          <Text className="capitalize text-grayText" style={typograhpy.regularText}>
            {property.street}
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
                    {item === 'bed'
                      ? property.bed_rooms
                      : item === 'sitting'
                        ? property.sitting_rooms
                        : item === 'kitchen'
                          ? property.internal_kitchens
                          : property.internal_toilets}
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
