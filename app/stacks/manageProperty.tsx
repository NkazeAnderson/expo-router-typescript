import { Pressable, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, router, useLocalSearchParams } from 'expo-router'
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
import { get } from 'utilities/useFetch'

const manageProperty = () => {
  const { edit } = useLocalSearchParams()
  const [image, setImage] = useState<string[] | null>(null)
  const [primaryPic, setPrimaryPic] = useState<number>(0)
  const [video, setVideo] = useState<string | null>(null)
  const [amenitiesRef, setAmenitiesRef] = useState<{ id: number; name: string }[]>([])
  const [categoryRef, setCategoryRef] = useState<{ id: number; name: string }[]>([])
  const [locationRef, setLocationRef] = useState<{ id: number; name: string; city_name: string }[]>([])
  const [name, setName] = useState<string>('')
  const [street, setStreet] = useState<string>('')
  const [town, setTown] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [forSale, setForSale] = useState<string>('')
  const [bed, setBed] = useState<string>('')
  const [sitting, setSitting] = useState<string>('')
  const [i_kitchen, setI_kitchen] = useState<string>('')
  const [i_toilets, setI_toilets] = useState<string>('')
  const [amenities, setAmenities] = useState<number[]>([])

  const addOrRemoveAmenity = (value: number) => {
    console.log(amenities)
    const exist = amenities.some((item) => value === item)
    if (!exist) {
      const newAmenities = [...amenities]
      newAmenities.push(value)
      setAmenities(newAmenities)
    } else {
      const newAmenities: number[] = amenities.filter((id) => id !== value)
      setAmenities(newAmenities)
    }
  }

  useEffect(() => {
    console.log(amenitiesRef)
    console.log(categoryRef)
    console.log(locationRef)

    amenitiesRef.length === 0 &&
      get('/amenities/').then((response) => {
        setAmenitiesRef(response.data)
      })
    categoryRef.length === 0 &&
      get('/categories/').then((response) => {
        setCategoryRef(response.data)
      })
    locationRef.length === 0 &&
      get('/locations/').then((response) => {
        setLocationRef(response.data)
      })
  }, [amenitiesRef, categoryRef, locationRef])

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
        <InputComponent placeholder="City of Peace" icon="home-city" value={name} setValue={setName} />
      </View>

      <View className="p-2 bg-primary rounded-lg">
        <Text className="bg-primary text-whiteText" style={typograhpy.h3}>
          Street
        </Text>
        <InputComponent placeholder="Mile 6, Nkwen" icon="home-city" value={street} setValue={setStreet} />
      </View>

      <View className="p-2 bg-primary rounded-lg">
        <Text className="bg-primary text-whiteText" style={typograhpy.h3}>
          Town
        </Text>
        <InputComponent placeholder="Bamenda - North West" icon="home-city" value={town} setValue={setTown} />
      </View>
      <View className="p-2 bg-primary rounded-lg">
        <Text className="bg-primary text-whiteText" style={typograhpy.h3}>
          Description
        </Text>
        <InputComponent lines={4} placeholder="This house i the best house" icon="home-city" value={description} setValue={setDescription} />
      </View>
      <View className="p-2 bg-primary rounded-lg">
        <Text className="bg-primary text-whiteText" style={typograhpy.h3}>
          Price
        </Text>
        <InputComponent placeholder="35,000" icon="home-city" value={price} setValue={setPrice} />
      </View>

      <View className="p-2 bg-primary rounded-lg">
        <Text className="bg-primary text-whiteText" style={typograhpy.h3}>
          Category
        </Text>
        <View className="bg-lightBackground rounded-md">
          <RadioButton.Group
            onValueChange={(value) => {
              setCategory(value)
            }}
            value={category}>
            {categoryRef.map((cat) => (
              <RadioButton.Item key={cat.id} label={cat.name} value={String(cat.id)} labelStyle={{ textAlign: 'left' }} position="leading" />
            ))}
          </RadioButton.Group>
        </View>
      </View>

      <View className="p-2 bg-primary rounded-lg">
        <Text className="bg-primary text-whiteText" style={typograhpy.h3}>
          Available For
        </Text>
        <View className="bg-lightBackground rounded-md">
          <RadioButton.Group
            onValueChange={(value) => {
              setForSale(value)
            }}
            value={forSale}>
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
          <RadioButton.Group
            onValueChange={(value) => {
              setBed(value)
            }}
            value={bed}>
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
          <RadioButton.Group
            onValueChange={(value) => {
              setSitting(value)
            }}
            value={sitting}>
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
          <RadioButton.Group
            onValueChange={(value) => {
              setI_kitchen(value)
            }}
            value={i_kitchen}>
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
          <RadioButton.Group
            onValueChange={(value) => {
              setI_toilets(value)
            }}
            value={i_toilets}>
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
          {amenitiesRef.map((item) => (
            <Checkbox.Item
              key={item.id}
              status={amenities.some((id) => id === item.id) ? 'checked' : 'unchecked'}
              labelStyle={{ textAlign: 'left' }}
              label={item.name}
              position="leading"
              onPress={() => {
                addOrRemoveAmenity(item.id)
              }}></Checkbox.Item>
          ))}
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
                  <View className="flex flex-row items-center justify-start absolute bottom-2 z-50">
                    <IconButton
                      icon={'star'}
                      containerColor={index === primaryPic ? colors.primary : colors.grayBackground}
                      iconColor={colors.lightBackground}
                      onPress={() => {
                        setPrimaryPic(index)
                      }}
                    />
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
          title: edit ? 'Edit Property' : 'Add Property',
          headerTitleStyle: typograhpy.h3
        }}
      />
    </ScrollView>
  )
}

export default manageProperty
