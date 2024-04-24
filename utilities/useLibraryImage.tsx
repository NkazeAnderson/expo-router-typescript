import * as ImagePicker from 'expo-image-picker'

export const mediaPicker = async (isVideo?: boolean) => {
  // No permissions request is necessary for launching the image library
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: isVideo ? ImagePicker.MediaTypeOptions.Videos : ImagePicker.MediaTypeOptions.Images,
    aspect: [4, 3],
    quality: 1,
    allowsMultipleSelection: !isVideo
  })
  return result
}
