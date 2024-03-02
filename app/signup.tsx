import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { Image, Keyboard, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import logo from 'src/assets/images/logoWithName.png'
import ButtonComponent from 'src/components/ButtonComponent'
// import { router } from 'expo-router'
import InputComponent from 'src/components/InputComponent'
import SocialGroup from 'src/components/SocialGroup'
import { typograhpy } from 'src/config/theme'

export default function SignupScreen() {
  // const Skip = () => {
  //   router.replace('/signup')
  // }
  const [isKeyboardVisible, setKeyboardVisible] = useState(false)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true) // or some other action
    })
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false) // or some other action
    })

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])

  return (
    <SafeAreaView className=" bg-primary flex flex-1">
      <View className="flex flex-1 justify-center items-center absolute w-screen top-0 h-[25vh]">
        <Image className="mt-[50]" source={logo} />
      </View>

      <View className={`bg-grayBackground  ${isKeyboardVisible ? 'pt-[50px]' : 'pt-6'}  h-[75vh] rounded-t-[40px] absolute w-screen bottom-0`}>
        <View className="px-4">
          <Text className={` text-center  my-5 text-primary`} style={typograhpy.h2}>
            Register
          </Text>
          <InputComponent placeholder="UserName" icon="account-outline" />
          <InputComponent placeholder="Email" icon="email" />
          <InputComponent placeholder="Password" icon="lock" />
          <View className="my-2">
            <View>
              <ButtonComponent text="Register" background="primary" color="whiteText" />
            </View>
          </View>
        </View>
        <View className="w-screen mt-auto mb-[30]">
          <Text className="text-center pb-7" style={typograhpy.regularText}>
            Already have an account?{' '}
            <Link className="text-secondary" href={'/login'}>
              Log In
            </Link>
          </Text>
          <SocialGroup />
        </View>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}
