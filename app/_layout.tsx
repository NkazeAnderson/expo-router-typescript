import 'expo-dev-client'
import { View } from 'react-native'
import { Stack } from 'expo-router'
//import { ActivityIndicator } from 'react-native-paper'
import { PaperProvider } from 'react-native-paper'
//import { Poppins_400Regular, Poppins_700Bold, Poppins_500Medium, useFonts } from '@expo-google-fonts/poppins'
export default function AppLayout() {
  return (
    <PaperProvider>
      <View className="flex flex-1 ">
        <Stack
          screenOptions={{
            headerShown: false
          }}
        />
      </View>
    </PaperProvider>
  )
}
