import { Image, Pressable, Text, View } from 'react-native'
import React from 'react'
import profilePlaceholder from '../../src/assets/images/profilePlaceHolder.png'
import { Stack, router } from 'expo-router'
import { ScrollView } from 'react-native'
import { Icon, IconButton } from 'react-native-paper'
import { globalState } from 'app/_layout'
import { colors, typograhpy } from 'src/config/theme'
import InputComponent from 'src/components/InputComponent'
const UpdateUser = () => {
  const user = globalState((state) => state.userInfo)
  return (
    <View className="flex flex-1">
      {user && (
        <ScrollView showsVerticalScrollIndicator={false} className="flex flex-1 px-2">
          <View className="flex flex-row items-center w-full p-4 relative">
            <Image
              className="w-[250px] h-[250px] rounded-full object-cover mx-auto"
              source={user && user.profile_picture !== null ? { uri: user.profile_picture } : profilePlaceholder}
            />
            <IconButton className="absolute right-0 bottom-0" icon={'camera'} containerColor={colors.primary} iconColor={colors.lightBackground} />
          </View>

          <View>
            <View>
              <Text style={typograhpy.h3}>First Name:</Text>
            </View>
            <View>
              <InputComponent placeholder="First Name" icon="account-outline" value={user.first_name} />
            </View>
          </View>

          <View>
            <View>
              <Text style={typograhpy.h3}>Last Name:</Text>
            </View>
            <View>
              <InputComponent placeholder="Last Name" icon="account-outline" value={user.last_name} />
            </View>
          </View>

          <View>
            <View>
              <Text style={typograhpy.h3}>Email:</Text>
            </View>
            <View>
              <InputComponent placeholder="Email" icon="mail" value={user.email} />
            </View>
          </View>

          <View>
            <View>
              <Text style={typograhpy.h3}>Phone:</Text>
            </View>
            <View>
              <InputComponent placeholder="Phone" icon="phone" value={user.phone} />
            </View>
          </View>

          <View>
            <View>
              <Text style={typograhpy.h3}>Password:</Text>
            </View>
            <View>
              <InputComponent placeholder="Password" icon="lock" value={'*****'} />
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
              title: 'My Info'
            }}
          />
        </ScrollView>
      )}
    </View>
  )
}

export default UpdateUser
