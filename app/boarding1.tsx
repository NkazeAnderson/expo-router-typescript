import { Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import boarding2 from 'src/assets/images/boarding2.png'
import { typograhpy } from 'src/config/theme'
import ButtonComponent from 'src/components/ButtonComponent'
import { router } from 'expo-router'

export default function BoardingScreen() {
  const Skip = () => {
    router.replace('/login')
  }
  return (
    <SafeAreaView className=" bg-ligtBackground flex flex-1 px-7">
      <View className="flex flex-1 justify-center items-center">
        <Image source={boarding2} />
      </View>
      <View>
        <Text className=" text-primaryText text-center" style={typograhpy.h1}>
          Rent <Text className="text-primary"> Properties</Text> with <Text className="text-primary"> legal backing</Text>
        </Text>
      </View>
      <View className="flex flex-row justify-between items-center h-[20vh]">
        <View>
          <ButtonComponent color="grayText" text="Skip" action={Skip} />
        </View>
        <View>
          <ButtonComponent text="Next" color="whiteText" background="primary" action={Skip} />
        </View>
      </View>
    </SafeAreaView>
  )
}
