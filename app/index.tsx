import { Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import boarding1 from 'src/assets/images/boarding1.png'
import { typograhpy } from 'src/config/theme'
import ButtonComponent from 'src/components/ButtonComponent'
import { router } from 'expo-router'
import { Poppins_400Regular, Poppins_700Bold, Poppins_500Medium, Poppins_400Regular_Italic, useFonts } from '@expo-google-fonts/poppins'
import { ActivityIndicator } from 'react-native-paper'
export default function BoardingScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_400Regular_Italic
  })
  if (!fontsLoaded) {
    return (
      <View className="flex flex-1 items-center bg-grayBackground">
        <View className="my-auto">
          <ActivityIndicator />
        </View>
      </View>
    )
  }
  //router.replace('/tabs/home')
  const gotoNextPage = () => {
    router.push('/boarding1')
  }
  const Skip = () => {
    router.replace('/login')
  }
  return (
    <SafeAreaView className=" bg-ligtBackground flex flex-1 px-7">
      <View className="flex flex-1 justify-center items-center">
        <Image source={boarding1} />
      </View>
      <View>
        <Text className=" text-primaryText text-center" style={typograhpy.h1}>
          Buy <Text className="text-primary"> Properties</Text> in Cameroon <Text className="text-primary"> legally</Text>
        </Text>
      </View>
      <View className="flex flex-row justify-between items-center h-[20vh]">
        <View>
          <ButtonComponent color="grayText" text="Skip" action={Skip} />
        </View>
        <View>
          <ButtonComponent text="Next" color="whiteText" background="primary" action={gotoNextPage} />
        </View>
      </View>
    </SafeAreaView>
  )
}
