import { Link, router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import logo from 'src/assets/images/logoWithName.png'
import ButtonComponent from 'src/components/ButtonComponent'
// import { router } from 'expo-router'
import InputComponent from 'src/components/InputComponent'
import SocialGroup from 'src/components/SocialGroup'
import { typograhpy } from 'src/config/theme'

export default function LoginScreen() {
  const login = () => {
    router.push('/tabs/home')
  }
  return (
    <SafeAreaView className=" bg-primary flex flex-1">
      <View className="flex flex-1 justify-center items-center absolute w-screen top-0 h-[25vh]">
        <Image className="mt-[50]" source={logo} />
      </View>

      <View className=" bg-grayBackground pt-[50px]  h-[75vh] rounded-t-[40px] absolute w-screen bottom-0">
        <View className="px-4">
          <Text className=" text-center text-primary my-5" style={typograhpy.h2}>
            Login
          </Text>

          <InputComponent placeholder="Email" icon="email" />
          <InputComponent placeholder="Password" icon="lock" />
          <View className="flex flex-row justify-between items-center my-2">
            <View>
              <ButtonComponent color="grayText" text="Forgot Password?" />
            </View>
            <View>
              <ButtonComponent text="Login" background="primary" color="whiteText" action={login} />
            </View>
          </View>
        </View>
        <View className={`w-screen mt-auto mb-[30]`}>
          <Text className="text-center pb-10" style={typograhpy.regularText}>
            Don&apos;t have an account?{' '}
            <Link className="text-secondary" href={'/signup'}>
              Register
            </Link>
          </Text>
          <SocialGroup />
        </View>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  )
}
