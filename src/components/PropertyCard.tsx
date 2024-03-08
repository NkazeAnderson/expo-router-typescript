import { FlatList, Image, Pressable, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { Icon } from 'react-native-paper'
import estatePlaceholder from '../assets/images/estatePlaceholder.jpg'
import estatePlaceholder1 from '../assets/images/house1.png'
import estatePlaceholder2 from '../assets/images/house2.png'
import playVideo from '../assets/images/icons8-play-video-64.png'
import { colors, typograhpy } from 'src/config/theme'
import { properties } from 'src/config/constants'
import millify from 'millify'
import { router } from 'expo-router'
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av'

function PropertyCard({ property, withImages }: { property: (typeof properties)[1]; withImages?: boolean }) {
  const viewPropertyDetails = () => {
    router.push(`/stacks/propertyDetails?propertyID=${property.id}`)
  }
  const videoRef: React.MutableRefObject<Video | null> = useRef(null)
  const [videoStatus, setVideoStatus] = useState<AVPlaybackStatus>()
  console.log(videoStatus?.isLoaded && videoStatus.isPlaying)

  return (
    <Pressable
      onPress={!withImages ? viewPropertyDetails : () => {}}
      className={`bg-lightBackground ${!withImages ? 'p-3 my-2' : 'pb-3 mb-2'} rounded-2xl  border-b-4 border-b-primary`}>
      {withImages ? (
        <View>
          <Video
            ref={videoRef}
            source={{
              uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            style={{ width: '100%', height: 250 }}
            posterSource={estatePlaceholder}
            usePoster
            posterStyle={{ objectFit: 'contain', width: '100%', height: '100%' }}
            onPlaybackStatusUpdate={(status) => setVideoStatus(() => status)}
          />
          {videoStatus?.isLoaded && !videoStatus.isPlaying && (
            <View className={`absolute w-full  h-full `}>
              <Pressable onPress={() => videoRef.current?.playAsync()} className="my-auto mx-auto">
                <Image source={playVideo} />
              </Pressable>
            </View>
          )}
        </View>
      ) : (
        <View>
          <Image className="w-[100%] h-[25vh] rounded-lg" source={estatePlaceholder} />
        </View>
      )}

      {!withImages && (
        <>
          <View className="flex flex-row justify-between items-center px-1">
            <Text className="capitalize" style={typograhpy.h2}>
              {property.subCategory}
            </Text>
            <Text style={typograhpy.regularText}>
              {property.isForSale ? `FCFA ${millify(property.price)}` : ` FCFA ${millify(property.price)} / mo`}
            </Text>
          </View>
          <View className="flex flex-row items-center space-x-2 px-1">
            <Icon source={'map-marker'} size={18} />
            <Text className="capitalize" style={typograhpy.h3}>
              {property.address}
            </Text>
          </View>
        </>
      )}
      <View className="mt-2 space-y-4">
        {withImages ? (
          <View className="mt-3 space-y-1 px-2">
            <View className="flex flex-row justify-between items-center px-1">
              <Text className="capitalize" style={typograhpy.h2}>
                {property.subCategory}
              </Text>
              <Text style={typograhpy.regularText}>
                {property.isForSale ? `FCFA ${millify(property.price)}` : ` FCFA ${millify(property.price)} / mo`}
              </Text>
            </View>
            <View className="flex flex-row items-center space-x-2 px-1">
              <Icon source={'map-marker'} size={18} />
              <Text className="capitalize" style={typograhpy.h3}>
                {property.address}
              </Text>
            </View>
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
                  <Pressable key={index} className=" h-[35vh]" onPress={() => router.push('/stacks/picture')}>
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

            <View className="flex flex-row flex-wrap">
              {['bed', 'sitting', 'kitchen', 'toilet'].map((item, index) => (
                <View key={index} className="flex flex-row items-center mx-2 my-2 p-1 border border-grayText rounded-md">
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
                  {`${
                    //@ts-expect-error: keys of item
                    property[item]
                  } ${item}`}
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
