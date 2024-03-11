import { Pressable, Text } from 'react-native'
import React from 'react'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import { typograhpy } from 'src/config/theme'
import { ScrollView } from 'react-native'
import { Checkbox, Icon, RadioButton } from 'react-native-paper'
import { View } from 'react-native'
import ButtonComponent from 'src/components/ButtonComponent'
import { Image } from 'react-native'
import imagePlaceHolder from '../../src/assets/images/estatePlaceholder.jpg'
import orange from '../../src/assets/images/orange.png'
import mtn from '../../src/assets/images/mtn.png'

const completePayment = () => {
  const { edit } = useLocalSearchParams()

  return (
    <View className="flex flex-1">
      <View className="bg-primary">
        <Text className="text-center text-whiteText" style={typograhpy.h3}>
          {` Total: `}
          <Text className="" style={typograhpy.h2}>
            Fcfa 75,000
          </Text>
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="flex flex-1 px-2 space-y-2">
        <Text style={typograhpy.h3}>Select Payment Method</Text>
        <View className="flex flex-row space-x-2">
          <View className="basis-1/2">
            <View className="mx-auto w-[80%] p-2 border border-primary rounded-md">
              <Image source={mtn} style={{ width: '100%', height: 150, objectFit: 'contain' }} />
            </View>
          </View>
          <View className="basis-1/2">
            <View className="mx-auto w-[80%] p-2 border border-primary rounded-md">
              <Image source={orange} style={{ width: '100%', height: 150, objectFit: 'contain' }} />
            </View>
          </View>
        </View>

        <View>
          <View>
            <Image source={imagePlaceHolder} style={{ width: '100%', height: 200 }} />
          </View>
          <View>
            <Text style={typograhpy.buttonText}>
              Name:{' '}
              <Text className="text-green" style={typograhpy.buttonText}>
                City of Hope
              </Text>
            </Text>
          </View>
          <View>
            <Text style={typograhpy.buttonText}>
              Location:{' '}
              <Text className="text-green" style={typograhpy.buttonText}>
                Mile 6, Bamenda
              </Text>
            </Text>
          </View>
          <View>
            <Text style={typograhpy.buttonText}>
              Price:{' '}
              <Text className="text-green" style={typograhpy.buttonText}>
                15,000 per month
              </Text>
            </Text>
          </View>
        </View>

        <View className="p-2 bg-primary rounded-lg">
          <Text className="bg-primary text-whiteText" style={typograhpy.h3}>
            Number of months
          </Text>
          <View className="bg-lightBackground rounded-md">
            <RadioButton.Group onValueChange={() => {}} value="0">
              <RadioButton.Item label="0" value="0" labelStyle={{ textAlign: 'left' }} position="leading" />

              <RadioButton.Item label="1" value="1" labelStyle={{ textAlign: 'left' }} position="leading" />
              <RadioButton.Item label="2" value="2" labelStyle={{ textAlign: 'left' }} position="leading" />
            </RadioButton.Group>
          </View>
        </View>

        <View className="p-2 bg-primary rounded-lg">
          <Text className="bg-primary text-whiteText" style={typograhpy.h3}>
            Inclusive Payments
          </Text>
          <View className="bg-lightBackground p-1 rounded-md">
            <Checkbox.Item status="checked" labelStyle={{ textAlign: 'left' }} label="Water Bill" position="leading"></Checkbox.Item>
            <Checkbox.Item status="checked" labelStyle={{ textAlign: 'left' }} label="Electric Bill" position="leading"></Checkbox.Item>
            <Checkbox.Item status="checked" labelStyle={{ textAlign: 'left' }} label="Refundable Caution" position="leading"></Checkbox.Item>
            <Checkbox.Item status="checked" labelStyle={{ textAlign: 'left' }} label="Cable Bill" position="leading"></Checkbox.Item>
            <Checkbox.Item status="checked" labelStyle={{ textAlign: 'left' }} label="Wifi Bill" position="leading"></Checkbox.Item>
          </View>
        </View>

        <View className="my-2">
          <ButtonComponent text="Complete Payment" color="lightBackground" background="primary" />
        </View>
        <Stack.Screen
          options={{
            headerLeft: () => (
              <Pressable
                onPress={() => {
                  router.back()
                }}>
                <Icon source={'chevron-left'} size={30} />
              </Pressable>
            ),
            title: edit ? 'Edit Property' : 'Complete Payments',
            headerTitleStyle: typograhpy.h3
          }}
        />
      </ScrollView>
    </View>
  )
}

export default completePayment
