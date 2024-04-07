import { Link, router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import logo from 'src/assets/images/logoWithName.png'
import ButtonComponent from 'src/components/ButtonComponent'
// import { router } from 'expo-router'
import InputComponent from 'src/components/InputComponent'
import SocialGroup from 'src/components/SocialGroup'
import { colors, typograhpy } from 'src/config/theme'
import { get, post } from 'utilities/useFetch'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-root-toast'
import { globalState } from './_layout'

export default function LoginScreen() {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const setUser = globalState((state) => state.setUserInfo)
  const logIn = async () => {
    try {
      const results = await post('/user/token/', { phone: '683403750', password: 'badoo65413' })
      //await AsyncStorage.setItem('auth_token', results.data['access'])
      await AsyncStorage.setItem('auth_token1', results.data['access'])
      await AsyncStorage.setItem('refresh_token', results.data['refresh'])
      const userData = await get('/user/myinfo/')
      await AsyncStorage.setItem('user', JSON.stringify(userData.data.results[0]))
      //await AsyncStorage.setItem('auth_token', results.data['access'])
      setUser(userData.data.results[0])
      Toast.show(`Welcome ${userData.data.results[0].first_name}`, {
        duration: Toast.durations.SHORT,
        backgroundColor: colors.primary,
        position: Toast.positions.TOP
      })
      router.replace('tabs/home')
    } catch (error) {
      console.log(error)
      Toast.show('Invalid Credentials', {
        duration: Toast.durations.LONG,
        backgroundColor: colors.danger,
        position: Toast.positions.TOP
      })
    }

    //
    //await Save('user_info', JSON.stringify(userData.data.results[0]))

    // await AsyncStorage.setItem('auth_token', userData.data['access'])
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

          <InputComponent placeholder="Phone" icon="phone" value={phone} setValue={setPhone} />
          <InputComponent placeholder="Password" icon="lock" value={password} setValue={setPassword} />
          <View className="flex flex-row justify-between items-center my-2">
            <View>
              <ButtonComponent color="grayText" text="Forgot Password?" />
            </View>
            <View>
              <ButtonComponent text="Login" background="primary" color="whiteText" action={logIn} />
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
