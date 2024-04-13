/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pressable, Text } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
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
import { destroy, domain, get, post, put } from 'utilities/useFetch'
import Toast from 'react-native-root-toast'
import { apartment_Results_Sample } from 'src/config/constants'
const FormData = global.FormData

const manageProperty = () => {
  const { edit } = useLocalSearchParams()
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset[]>([])
  const [primaryPic, setPrimaryPic] = useState<number>(0)
  const [video, setVideo] = useState<ImagePicker.ImagePickerAsset | undefined>(undefined)
  const [amenitiesRef, setAmenitiesRef] = useState<{ id: number; name: string }[]>([])
  const [categoryRef, setCategoryRef] = useState<{ id: number; name: string }[]>([])
  const [locationRef, setLocationRef] = useState<{ id: number; name: string; city_name: string }[]>([])
  const [name, setName] = useState<string>('')
  const [street, setStreet] = useState<string>('')
  const [town, setTown] = useState<string>('')
  const [selectedLocation, setSelectedLocation] = useState<number | undefined>(undefined)
  const [description, setDescription] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [caution, setCaution] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [forSale, setForSale] = useState<string>('0')
  const [bed, setBed] = useState<string>('1')
  const [sitting, setSitting] = useState<string>('1')
  const [i_kitchen, setI_kitchen] = useState<string>('1')
  const [i_toilets, setI_toilets] = useState<string>('1')
  const [amenities, setAmenities] = useState<number[]>([1])
  const [filteredLocation, setFilteredLocation] = useState<typeof locationRef>([])
  const [uploadedMedia, setUploadedMedia] = useState<{ uri: string; type: string; id?: number }[]>([])
  const [uploadedVideo, setUploadedVideo] = useState<undefined | string>(undefined)
  const [error, setError] = useState<string[]>([])
  const [toBeDeleted, setToBeDeleted] = useState<number[]>([])
  const [deletePromptVisible, setDeletePromptVisible] = useState<boolean>(false)

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

  const filterAddress = (value: string) => {
    const loc = locationRef.filter((item) => {
      console.log('Value ....', value)
      console.log(item.name.toLowerCase())
      console.log(item.name.toLowerCase().includes(value.toLowerCase()))

      return item.name.toLowerCase().includes(value.toLowerCase()) || item.city_name.toLowerCase().includes(value.toLowerCase())
    })
    console.log(loc.slice(0, 3))

    setTown(value)
    setFilteredLocation(loc)
  }

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
        const newImages: ImagePicker.ImagePickerAsset[] = []
        result.assets.forEach((asset) => {
          newImages.push(asset)
        })
        image ? setImage([...newImages, ...image]) : setImage(newImages)
      } else {
        setVideo(result.assets[0])
      }
    }
  }

  function removeMedia(link: string, type: string, index: number) {
    index < primaryPic && type !== 'video' && setPrimaryPic(primaryPic - 1)
    if (type === 'images') {
      const newImages = image.filter((value) => value.uri !== link)
      setImage(newImages)
    } else if (type === 'uploaded_image') {
      const toBeDeletedItem = uploadedMedia.find((value) => value.uri === link)
      const newImages = uploadedMedia.filter((value) => value.uri !== link)
      setUploadedMedia(newImages)
      if (toBeDeletedItem && toBeDeletedItem.id) {
        setToBeDeleted([...toBeDeleted, toBeDeletedItem.id])
      }
    } else {
      setVideo(undefined)
      setUploadedVideo(undefined)
    }
  }
  const initialImages = useRef<null | { uri: string; type: string; id?: number }[]>(null)

  const getNewPrimary = () => {
    let primaryID: number | undefined = undefined

    if (primaryPic <= uploadedMedia.length - 1) {
      primaryID = uploadedMedia[primaryPic].id ? uploadedMedia[primaryPic].id : undefined
    }
    const deletedOld = uploadedMedia[0].type !== 'primary pic'

    return { primaryID, deletedOld }
  }
  useEffect(() => {
    if (error.length > 0) {
      let errorList = error
      errorList = name ? errorList.filter((value) => value !== 'name') : errorList
      errorList = description ? errorList.filter((value) => value !== 'description') : errorList
      errorList = street ? errorList.filter((value) => value !== 'street') : errorList
      errorList = selectedLocation ? errorList.filter((value) => value !== 'town') : errorList
      errorList = price ? errorList.filter((value) => value !== 'price') : errorList
      errorList = video ? errorList.filter((value) => value !== 'video') : errorList
      errorList = image ? errorList.filter((value) => value !== 'image') : errorList
      errorList = category ? errorList.filter((value) => value !== 'category') : errorList

      setError(errorList)
    }
  }, [name, street, town, description, price, video, image, category])
  function ErrorExit({ name }: { name: string }) {
    if (error.some((value) => value === name)) {
      return <Text className="text-danger pl-4">Add {name}</Text>
    }
    return <></>
  }

  const submit = async () => {
    const formData = new FormData()
    const errorList = []

    if (!edit) {
      !name && errorList.push('name')
      !description && errorList.push('description')
      !street && errorList.push('street')
      !selectedLocation && errorList.push('town')
      !category && errorList.push('category')
      !bed && errorList.push('bed')
      !sitting && errorList.push('sitting')
      !i_toilets && errorList.push('i_toilets')
      !i_kitchen && errorList.push('i_kitchen')
      !price && errorList.push('price')
      !forSale && errorList.push('forSale')
      image.length < 2 && errorList.push('image')
      !video && errorList.push('video')
    }

    if (errorList.length > 0) {
      console.log(errorList)

      setError(errorList)
      Toast.show('Missing Required Fields', {
        backgroundColor: colors.danger,
        position: Toast.positions.TOP
      })
      return
    } else {
      if (!edit) {
        formData.append('name', name)
        formData.append('description', description)
        formData.append('street', street)
        formData.append('price', price)
        formData.append('caution', caution)
        formData.append('location', selectedLocation ? selectedLocation.toString() : '1')
        formData.append('bed_rooms', bed)
        formData.append('sitting_rooms', sitting)
        formData.append('internal_kitchens', i_kitchen)
        formData.append('internal_toilets', i_toilets)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formData.append('primary_image', { uri: image[primaryPic].uri, name: image[primaryPic].fileName, type: image[primaryPic].mimeType } as any)
        amenities.forEach((item) => {
          formData.append('amenities', item.toString())
        })
        for (let index = 0; index < image.length; index++) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          index !== primaryPic &&
            formData.append('images', { uri: image[index].uri, name: image[index].fileName, type: image[index].mimeType } as any)
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        video && formData.append('video', { uri: video.uri, name: video.fileName, type: video.mimeType } as any)
        post('/property/apartment/', formData)
          .then(() => {
            router.push('/tabs/home')
            Toast.show('Added a new property', {
              duration: Toast.durations.SHORT,
              backgroundColor: colors.primary,
              position: Toast.positions.TOP
            })
          })
          .catch((err) => {
            console.log(JSON.stringify(err))
            Toast.show('Failed', {
              duration: Toast.durations.SHORT,
              backgroundColor: colors.danger,
              position: Toast.positions.TOP
            })
          })
      } else {
        /// put
        console.log('Put Section')

        formData.append('name', name)
        formData.append('description', description)
        formData.append('street', street)
        formData.append('price', price)
        formData.append('caution', caution)
        formData.append('location', selectedLocation ? selectedLocation.toString() : '1')
        formData.append('bed_rooms', bed)
        formData.append('sitting_rooms', sitting)
        formData.append('internal_kitchens', i_kitchen)
        formData.append('internal_toilets', i_toilets)

        const primaryStatus = getNewPrimary()

        if (primaryStatus.primaryID) {
          formData.append('new_primary', primaryStatus.primaryID.toString())
        } else {
          image.length > 0 &&
            primaryPic > uploadedMedia.length - 1 &&
            formData.append('primary_image', {
              uri: image[primaryPic - uploadedMedia.length].uri,
              name: image[primaryPic - uploadedMedia.length].fileName,
              type: image[primaryPic - uploadedMedia.length].mimeType
            } as any)
        }

        primaryStatus.deletedOld && formData.append('primary_deleted', '1')

        amenities.forEach((item) => {
          formData.append('amenities', item.toString())
        })
        if (image.length > 0) {
          for (let index = 0; index < image.length; index++) {
            if (index !== primaryPic - uploadedMedia.length) {
              formData.append('images', { uri: image[index].uri, name: image[index].fileName, type: image[index].mimeType } as any)
            }
          }
        }

        video && formData.append('video', { uri: video.uri, name: video.fileName, type: video.mimeType } as any)

        toBeDeleted.length > 0 &&
          toBeDeleted.forEach((value) => {
            formData.append('images_delete', value.toString())
          })
        console.log('Submiting...........', formData)

        console.log(formData)

        put(`/property/apartment/${edit}/`, formData)
          .then(() => {
            router.push('/tabs/home')
            Toast.show('Updated property property', {
              duration: Toast.durations.SHORT,
              backgroundColor: colors.primary,
              position: Toast.positions.TOP
            })
          })
          .catch((err) => {
            console.log(JSON.stringify(err))
            Toast.show('Failed', {
              duration: Toast.durations.SHORT,
              backgroundColor: colors.danger,
              position: Toast.positions.TOP
            })
          })
      }
    }
  }

  useEffect(() => {
    amenitiesRef.length === 0
      ? get('/amenities/').then((response) => {
          setAmenitiesRef(response.data)
        })
      : categoryRef.length === 0
        ? get('/categories/').then((response) => {
            setCategoryRef(response.data)
          })
        : locationRef.length === 0
          ? get('/locations/').then((response) => {
              setLocationRef(response.data)
            })
          : edit &&
            uploadedMedia.length === 0 &&
            get(`/property/apartment/${edit}/`)
              .then((response) => {
                const apartment: typeof apartment_Results_Sample = response.data

                setName(apartment.name)
                setStreet(apartment.street)
                setTown(apartment.area)
                setDescription(apartment.description)
                setPrice(String(apartment.price))
                setCaution(String(apartment.caution))
                setBed(apartment.bed_rooms.toString())
                setSitting(apartment.sitting_rooms.toString())
                setI_kitchen(apartment.internal_kitchens.toString())
                setI_toilets(apartment.internal_toilets.toString())
                const uploaded: { uri: string; type: string; id?: number }[] = [{ uri: domain + '/' + apartment.primary_link, type: 'primary pic' }]

                apartment.images_link.forEach((link) => {
                  uploaded.push({ uri: domain + link.url, type: 'uploaded_image', id: link.id })
                })

                //apartment.amenities_details.forEach((amentity) => {})
                setUploadedMedia(uploaded)
                initialImages.current = uploaded
                setUploadedVideo(apartment.video_link)
              })
              .catch((err) => {
                console.log(err)
              })
  }, [amenitiesRef, categoryRef, locationRef, uploadedMedia])

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex flex-1 px-2 space-y-2">
      <View className="p-2 bg-primary rounded-lg">
        <Text className="bg-primary text-whiteText" style={typograhpy.h3}>
          City Name
        </Text>
        <InputComponent placeholder="City of Peace" icon="home-city" value={name} setValue={setName} />
        <ErrorExit name="name" />
      </View>

      <View className="p-2 bg-primary rounded-lg">
        <Text className="bg-primary text-whiteText" style={typograhpy.h3}>
          Street
        </Text>
        <InputComponent placeholder="Bocom, Mile 6" icon="home-city" value={street} setValue={setStreet} />
        <ErrorExit name="street" />
      </View>

      <View className="p-2 bg-primary rounded-lg">
        <Text className="bg-primary text-whiteText" style={typograhpy.h3}>
          Town
        </Text>
        <InputComponent placeholder="Nkwen - Bamenda" icon="home-city" value={town} setValue={filterAddress} />
        <ErrorExit name="town" />
        <View className="bg-lightBackground">
          {filteredLocation.length > 0 && <Text className="text-center">Select a location...</Text>}
          {filteredLocation.map((location) => (
            <Pressable
              onPress={() => {
                setTown(`${location.name}, ${location.city_name.split(',')[0]}`)
                setSelectedLocation(location.id)
              }}
              className="bg-lightBackground border border-y-2  m-1 p-2 rounded-lg border-secondary"
              key={location.id}>
              <Text>{`${location.name}, ${location.city_name}`}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      <View className="p-2 bg-primary rounded-lg">
        <Text className="bg-primary text-whiteText" style={typograhpy.h3}>
          Description
        </Text>
        <InputComponent lines={4} placeholder="This house i the best house" icon="home-city" value={description} setValue={setDescription} />
        <ErrorExit name="description" />
      </View>

      <View className="p-2 bg-primary rounded-lg">
        <Text className="bg-primary text-whiteText" style={typograhpy.h3}>
          Price
        </Text>
        <InputComponent placeholder="35,000" icon="home-city" value={price} setValue={setPrice} keyboard="numeric" />
        <ErrorExit name="price" />
      </View>

      <View className="p-2 bg-primary rounded-lg">
        <Text className="bg-primary text-whiteText" style={typograhpy.h3}>
          Caution
        </Text>
        <InputComponent placeholder="15,000" icon="home-city" value={caution} setValue={setCaution} keyboard="number-pad" />
        <ErrorExit name="caution" />
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
        <ErrorExit name="category" />
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
            <RadioButton.Item label="For Rent" value="0" labelStyle={{ textAlign: 'left' }} position="leading" />
            <RadioButton.Item label="For Sale" value="1" labelStyle={{ textAlign: 'left' }} position="leading" />
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
        {video || uploadedVideo ? (
          <>
            <View className="flex flex-row items-center justify-center">
              <IconButton
                icon={'delete'}
                containerColor={colors.danger}
                iconColor={colors.lightBackground}
                onPress={() => {
                  removeMedia('', 'video', 99999)
                }}
              />
            </View>

            <View className={` w-full h-[250px] bg-[#000000] my-2 rounded-md`}>
              <Video
                source={{ uri: uploadedVideo ? domain + '/' + uploadedVideo : video ? video.uri : '' }}
                style={{ width: '100%', height: 250, borderRadius: 15 }}
                resizeMode={ResizeMode.COVER}
                shouldPlay={video ? true : false}
                useNativeControls
              />
            </View>
          </>
        ) : (
          <Pressable onPress={() => pickMedia(true)}>
            <View className="w-full h-[250px] bg-[#000000] my-2 rounded-md"></View>
            <ErrorExit name="video" />
          </Pressable>
        )}

        <View>
          <ButtonComponent icon="image" text="Add Picture(s)" color="lightBackground" background="primary" action={() => pickMedia()} />
        </View>
        <View>
          {image.length > 0 || uploadedMedia.length > 0 ? (
            <FlatList
              horizontal
              data={[...uploadedMedia, ...image]}
              renderItem={({ item, index }) => (
                <View className="mr-2 ">
                  <View className="flex flex-row items-center justify-start absolute top-2 z-50">
                    <IconButton
                      icon={'delete'}
                      containerColor={colors.danger}
                      iconColor={colors.lightBackground}
                      onPress={() => {
                        removeMedia(item.uri, item.type == 'uploaded_image' || item.type == 'primary pic' ? 'uploaded_image' : 'images', index)
                      }}
                    />
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

                  <Image key={index} source={{ uri: item.uri }} style={{ width: 200, height: 200 }} />
                </View>
              )}
            />
          ) : (
            <Pressable onPress={() => pickMedia()}>
              <Image source={imagePlaceHolder} style={{ width: '100%', height: 200 }} />

              <ErrorExit name="image" />
            </Pressable>
          )}
        </View>
        <View className="my-2">
          <ButtonComponent text="Submit property" color="lightBackground" background="primary" action={submit} />
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
          headerTitleStyle: typograhpy.h3,
          headerRight: () =>
            edit ? (
              <IconButton
                icon={'delete'}
                containerColor={colors.danger}
                iconColor={colors.lightBackground}
                onPress={() => {
                  setDeletePromptVisible(true)
                }}
              />
            ) : (
              <></>
            )
        }}
      />
      <View className={`w-full h-[95vh] absolute flex flex-1 rounded-xl p-4 bg-danger ${deletePromptVisible ? '' : 'hidden'}`}>
        <View className="w-[75%] my-auto bg-lightBackground rounded-xl  mx-auto p-2">
          <Text style={typograhpy.h3}>Are you sure you want to delete this property?</Text>

          <ButtonComponent
            text="Yes"
            color="whiteText"
            background="danger"
            action={() => {
              destroy(`/property/apartment/${edit}/`, true)
                .then(() => {
                  setDeletePromptVisible(false)
                  Toast.show('Deleted', {
                    backgroundColor: colors.danger,
                    position: Toast.positions.TOP
                  })
                  router.push('/tabs/properties')
                })
                .catch(() => {
                  console.log('Error deleting')
                })
            }}
          />
          <ButtonComponent
            text="No"
            color="primary"
            action={() => {
              setDeletePromptVisible(false)
            }}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default manageProperty
