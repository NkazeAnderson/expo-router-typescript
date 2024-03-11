import { Pressable, Text } from 'react-native'
import React, { useState } from 'react'
import { Tabs, router, useLocalSearchParams } from 'expo-router'
import { colors, typograhpy } from 'src/config/theme'

import { ScrollView } from 'react-native'

import { Checkbox, Icon, IconButton, RadioButton } from 'react-native-paper'
import InputComponent from 'src/components/InputComponent'
import { View } from 'react-native'
import ButtonComponent from 'src/components/ButtonComponent'
import * as ImagePicker from 'expo-image-picker'
import { Image } from 'react-native'
import { Video, ResizeMode } from 'expo-av'
import { FlatList } from 'react-native'
import imagePlaceHolder from '../../src/assets/images/estatePlaceholder.jpg'

const manageProperty = () => {
  const { edit } = useLocalSearchParams()
  const [image, setImage] = useState<string[] | null>(null)
  const [video, setVideo] = useState<string | null>(null)
  const pickMedia = async (isVideo?: boolean) => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: isVideo ? ImagePicker.MediaTypeOptions.Videos : ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: !isVideo
    })

    if (!result.canceled) {
      if (!isVideo) {
        const newImages: string[] = []
        result.assets.forEach((asset) => {
          newImages.push(asset.uri)
        })
        image ? setImage([...newImages, ...image]) : setImage(newImages)
      } else {
        setVideo(result.assets[0].uri)
      }
    }
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex flex-1 px-2 space-y-2">
      <View className="p-2 bg-primary rounded-lg">
        <Text className="bg-primary text-whiteText" style={typograhpy.h3}>
          City Name
        </Text>
        <InputComponent placeholder="City of Peace" icon="home-city" />
      </View>

      <View className="p-2 bg-primary rounded-lg">
        <Text className="bg-primary text-whiteText" style={typograhpy.h3}>
          Street Address
        </Text>
        <InputComponent placeholder="Mile 6, Nkwen" icon="home-city" />
      </View>

      <View className="p-2 bg-primary rounded-lg">
        <Text className="bg-primary text-whiteText" style={typograhpy.h3}>
          Town
        </Text>
        <InputComponent placeholder="Bamenda - North West" icon="home-city" />
      </View>
      <View className="p-2 bg-primary rounded-lg">
        <Text className="bg-primary text-whiteText" style={typograhpy.h3}>
          Description
        </Text>
        <InputComponent
          value="Base URL for your site. Can be considered as the path after the host. For example, /metro/ is the base URL of https://facebook.github.io/metro/. For URLs that have no path, the baseUrl should be set to /. This field is related to the url field. Always has both leading and trailing slash."
          lines={4}
          placeholder="This house i the best house"
          icon="home-city"
        />
      </View>
      <View className="p-2 bg-primary rounded-lg">
        <Text className="bg-primary text-whiteText" style={typograhpy.h3}>
          Price
        </Text>
        <InputComponent placeholder="35,000" icon="home-city" />
      </View>

      <View className="p-2 bg-primary rounded-lg">
        <Text className="bg-primary text-whiteText" style={typograhpy.h3}>
          Category
        </Text>
        <View className="bg-lightBackground rounded-md">
          <RadioButton.Group onValueChange={() => {}} value="0">
            <RadioButton.Item label="Apartment" value="0" labelStyle={{ textAlign: 'left' }} position="leading" />

            <RadioButton.Item label="Land" value="1" labelStyle={{ textAlign: 'left' }} position="leading" />
            <RadioButton.Item label="Business Place" value="2" labelStyle={{ textAlign: 'left' }} position="leading" />
            <RadioButton.Item label="Self Content" value="3" labelStyle={{ textAlign: 'left' }} position="leading" />
          </RadioButton.Group>
        </View>
      </View>

      <View className="p-2 bg-primary rounded-lg">
        <Text className="bg-primary text-whiteText" style={typograhpy.h3}>
          Sub Category
        </Text>
        <View className="bg-lightBackground rounded-md">
          <RadioButton.Group onValueChange={() => {}} value="0">
            <RadioButton.Item label="Duplex" value="0" labelStyle={{ textAlign: 'left' }} position="leading" />
            <RadioButton.Item label="Suite" value="1" labelStyle={{ textAlign: 'left' }} position="leading" />
            <RadioButton.Item label="Guest House" value="2" labelStyle={{ textAlign: 'left' }} position="leading" />
            <RadioButton.Item label="Hotel" value="3" labelStyle={{ textAlign: 'left' }} position="leading" />
          </RadioButton.Group>
        </View>
      </View>

      <View className="p-2 bg-primary rounded-lg">
        <Text className="bg-primary text-whiteText" style={typograhpy.h3}>
          Available
        </Text>
        <View className="bg-lightBackground rounded-md">
          <RadioButton.Group onValueChange={() => {}} value="0">
            <RadioButton.Item label="For Sale" value="0" labelStyle={{ textAlign: 'left' }} position="leading" />

            <RadioButton.Item label="For Rent" value="1" labelStyle={{ textAlign: 'left' }} position="leading" />
          </RadioButton.Group>
        </View>
      </View>

      <View className="p-2 bg-primary rounded-lg">
        <Text className="bg-primary text-whiteText" style={typograhpy.h3}>
          Number of Bed Rooms
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
          Number of Sitting Rooms
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
          Number of Internal Kitchens
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
          Number of Internal Toilets
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
          Amenities Included
        </Text>
        <View className="bg-lightBackground p-1 rounded-md">
          <Checkbox.Item status="checked" labelStyle={{ textAlign: 'left' }} label="Gym" position="leading"></Checkbox.Item>
          <Checkbox.Item status="checked" labelStyle={{ textAlign: 'left' }} label="Constant Water" position="leading"></Checkbox.Item>
          <Checkbox.Item status="checked" labelStyle={{ textAlign: 'left' }} label="StandBy Generator" position="leading"></Checkbox.Item>
          <Checkbox.Item status="checked" labelStyle={{ textAlign: 'left' }} label="Solar" position="leading"></Checkbox.Item>
          <Checkbox.Item status="checked" labelStyle={{ textAlign: 'left' }} label="Bore-hole / Well" position="leading"></Checkbox.Item>
          <Checkbox.Item status="checked" labelStyle={{ textAlign: 'left' }} label="Swimming pool" position="leading"></Checkbox.Item>
          <Checkbox.Item status="checked" labelStyle={{ textAlign: 'left' }} label="Fence" position="leading"></Checkbox.Item>
          <Checkbox.Item status="checked" labelStyle={{ textAlign: 'left' }} label="Wifi" position="leading"></Checkbox.Item>
          <Checkbox.Item status="checked" labelStyle={{ textAlign: 'left' }} label="Parking space" position="leading"></Checkbox.Item>
        </View>
      </View>

      <View className="space-y-2">
        <View>
          <ButtonComponent icon="youtube-tv" text="Add Video" color="lightBackground" background="primary" action={() => pickMedia(true)} />
        </View>
        {video && (
          <View className="flex flex-row items-center justify-center">
            <IconButton icon={'delete'} containerColor={colors.danger} iconColor={colors.lightBackground} />
          </View>
        )}
        <View className={` w-full h-[250px] bg-[#000000] my-2 rounded-md`}>
          {video && (
            <Video
              source={{ uri: video }}
              style={{ width: '100%', height: 250, borderRadius: 15 }}
              resizeMode={ResizeMode.COVER}
              shouldPlay
              useNativeControls
            />
          )}
        </View>
        <View>
          <ButtonComponent icon="image" text="Add Picture(s)" color="lightBackground" background="primary" action={() => pickMedia()} />
        </View>
        <View>
          {image ? (
            <FlatList
              horizontal
              data={image}
              renderItem={({ item, index }) => (
                <View className="mr-2 ">
                  <View className="flex flex-row items-center justify-start absolute top-2 z-50">
                    <IconButton icon={'delete'} containerColor={colors.danger} iconColor={colors.lightBackground} />
                  </View>

                  <Image key={index} source={{ uri: item }} style={{ width: 200, height: 200 }} />
                </View>
              )}
            />
          ) : (
            <Image source={imagePlaceHolder} style={{ width: '100%', height: 200 }} />
          )}
        </View>
        <View className="my-2">
          <ButtonComponent text="Submit property" color="lightBackground" background="primary" />
        </View>
      </View>
      <Tabs.Screen
        options={{
          headerLeft: () => (
            <Pressable
              onPress={() => {
                router.push('/tabs/properties')
              }}>
              <Icon source={'chevron-left'} size={30} />
            </Pressable>
          ),
          title: edit ? 'Edit Property' : 'Add Property',
          headerTitleStyle: typograhpy.h3
        }}
      />
    </ScrollView>
  )
}

export default manageProperty
