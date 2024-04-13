import { FlatList, Image, Pressable, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Icon } from 'react-native-paper'
//import estatePlaceholder from '../assets/images/estatePlaceholder.jpg'
import playVideo from '../assets/images/icons8-play-video-64.png'
import { colors, typograhpy } from 'src/config/theme'
import { apartment_Results_Sample } from 'src/config/constants'
import millify from 'millify'
import { router } from 'expo-router'
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av'
//import { globalStates } from 'app/tabs/home'
import { domain } from 'utilities/useFetch'

function PropertyCard({
  property,
  withImages,
  videoSharedRef
}: {
  property: typeof apartment_Results_Sample
  withImages?: boolean
  videoSharedRef?: React.MutableRefObject<Video | null>
}) {
  const viewPropertyDetails = () => {
    router.push(`/stacks/propertyDetails?propertyID=${property.id}`)
  }

  const [videoStatus, setVideoStatus] = useState<AVPlaybackStatus>()

  //const setVideoState = globalStates((state) => state.setVideoState)
  // useCallback(() => {
  //   if (videoSharedRef instanceof Video) {
  //     setVideoState(videoSharedRef)
  //   }
  // }, [videoSharedRef])

  return (
    <Pressable
      onPress={!withImages ? viewPropertyDetails : () => {}}
      className={`bg-lightBackground ${!withImages ? 'p-3 my-2' : 'pb-3 mb-2'} rounded-2xl  border-b-4 border-b-primary`}>
      {withImages ? (
        <View>
          <Video
            ref={videoSharedRef}
            source={{
              uri: `${domain}/${property.video_link}`
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            style={{ width: '100%', height: 250 }}
            usePoster
            posterStyle={{ objectFit: 'contain', width: '100%', height: '100%' }}
            onPlaybackStatusUpdate={(status) => setVideoStatus(() => status)}
          />
          {videoStatus?.isLoaded && !videoStatus.isPlaying && videoSharedRef && (
            <View className={`absolute w-full  h-full `}>
              <Pressable
                onPress={() => {
                  videoStatus.positionMillis === videoStatus.playableDurationMillis
                    ? videoSharedRef.current?.replayAsync()
                    : videoSharedRef.current?.playAsync()
                }}
                className="my-auto mx-auto">
                <Image source={playVideo} />
              </Pressable>
            </View>
          )}
        </View>
      ) : (
        <View>
          <Image
            className="w-[100%] h-[25vh] rounded-lg"
            source={{
              uri: `${domain}/${property.primary_link}`
            }}
          />
        </View>
      )}

      {!withImages && (
        <>
          <View className="flex flex-row justify-between items-center px-1">
            <Text className="capitalize" style={typograhpy.h2}>
              {property.category_detail}
            </Text>
            <Text style={typograhpy.regularText}>
              {property.for_sale ? `FCFA ${millify(property.price)}` : ` FCFA ${millify(property.price)} / mo`}
            </Text>
          </View>
          <View className="flex flex-row items-center space-x-2 px-1">
            <Icon source={'map-marker'} size={18} />
            <Text className="capitalize" style={typograhpy.h3}>
              {property.street}
            </Text>
          </View>
        </>
      )}
      <View className="mt-2 space-y-4">
        {withImages ? (
          <View className="mt-3 space-y-1 px-2">
            <View className="flex flex-row justify-between items-center px-1">
              <Text className="capitalize" style={typograhpy.h2}>
                {property.category_detail}
              </Text>
              <Text style={typograhpy.regularText}>
                {property.for_sale ? `FCFA ${millify(property.price)}` : ` FCFA ${millify(property.price)} / mo`}
              </Text>
            </View>
            <View className="flex flex-row items-center space-x-2 px-1">
              <Icon source={'map-marker'} size={18} />
              <Text className="capitalize" style={typograhpy.h3}>
                {property.street}
              </Text>
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={[{ url: `${property.primary_link}` }, ...property.images_link]}
              renderItem={({ item, index }) => (
                <Pressable
                  key={index}
                  className=" h-[35vh] "
                  onPress={() => {
                    videoSharedRef && videoSharedRef.current?.pauseAsync()
                    router.push(`/stacks/picture?url=${item.url}`)
                  }}>
                  <Image
                    className="rounded-lg h-full w-[70vw]"
                    source={{
                      uri: `${domain}/${item.url}`
                    }}
                    resizeMode="cover"
                  />
                </Pressable>
              )}
              ItemSeparatorComponent={() => {
                return (
                  <View className="w-4">
                    <Text className="opacity-0"> emptyness </Text>
                  </View>
                )
              }}
            />

            <View className="flex flex-row flex-wrap">
              {['bed', 'sitting', 'kitchen', 'toilet'].map((item, index) => (
                <View key={index} className="flex flex-row items-center mx-2 my-2 p-1 border border-grayText rounded-md">
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
                    {` ${item}`}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ) : (
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
                  {item === 'bed'
                    ? property.bed_rooms
                    : item === 'sitting'
                      ? property.sitting_rooms
                      : item === 'kitchen'
                        ? property.internal_kitchens
                        : property.internal_toilets}
                  {` ${item}`}
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </Pressable>
  )
}

export default PropertyCard
