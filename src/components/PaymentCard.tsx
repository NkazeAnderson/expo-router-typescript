import { View, Text, Image } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-paper'
import { colors, typograhpy } from 'src/config/theme'
import estatePlaceholder from '../assets/images/estatePlaceholder.jpg'
import ButtonComponent from './ButtonComponent'
import { properties } from 'src/config/constants'
import millify from 'millify'
import { router } from 'expo-router'
const PaymentCard = ({ property, isPaid }: { property: (typeof properties)[0]; isPaid?: boolean }) => {
  return (
    <View className="flex flex-row w-full bg-lightBackground p-2 rounded-lg">
      <Image className="w-[25%] h-[10vh] rounded-lg" source={estatePlaceholder} />
      <View className="flex-grow pl-2">
        <Text numberOfLines={1} style={typograhpy.h3}>
          {property.name}
        </Text>
        <View className="flex flex-row">
          <Icon source={'map-marker'} size={18} color={colors.grayText} />
          <Text className="text-grayText" style={typograhpy.buttonText}>
            {property.address}
          </Text>
        </View>
        {!isPaid && (
          <Text className="text-primary" style={typograhpy.regularText}>
            {property.isForSale ? `FCFA ${millify(property.price)}` : ` FCFA ${millify(property.price)} -  mo`}
          </Text>
        )}
        <View className="flex flex-row space-x-3 ">
          {!isPaid ? (
            <>
              <View className="">
                <ButtonComponent text="Remove" color={'whiteText'} background="danger" />
              </View>
              <View className="w-[50%]">
                <ButtonComponent
                  text="Pay"
                  color={'whiteText'}
                  background="primary"
                  action={() => {
                    router.push('/stacks/completePayment')
                  }}
                />
              </View>
            </>
          ) : (
            <View>
              <ButtonComponent
                text="Get Receipt"
                icon="receipt"
                color={'secondary'}
                action={() => {
                  router.push('/stacks/receipt')
                }}
              />
            </View>
          )}
        </View>
      </View>
      {isPaid && <Icon source={'check-decagram'} size={30} color={colors.green} />}
    </View>
  )
}

export default PaymentCard
