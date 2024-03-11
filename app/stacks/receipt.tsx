import { Pressable, Text } from 'react-native'
import React from 'react'
import { Stack, router } from 'expo-router'
import { typograhpy } from 'src/config/theme'
import { ScrollView } from 'react-native'
import { Icon } from 'react-native-paper'
import { View } from 'react-native'

const receipt = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex flex-1 px-2 space-y-2">
      <View>
        <View>
          <Text style={typograhpy.buttonText}>
            Order ID #: <Text style={typograhpy.buttonText}>15995757098976334</Text>
          </Text>
        </View>
        <View>
          <Text style={typograhpy.buttonText}>
            Payment ID #: <Text style={typograhpy.buttonText}>15995757098976334</Text>
          </Text>
        </View>
        <View>
          <Text style={typograhpy.buttonText}>
            Method of payment: <Text style={typograhpy.buttonText}>Mtn</Text>
          </Text>
        </View>
        <View>
          <Text style={typograhpy.buttonText}>
            Date: <Text style={typograhpy.buttonText}>02/02/2024</Text>
          </Text>
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
          title: 'Receipt',
          headerTitleStyle: typograhpy.h3
        }}
      />
    </ScrollView>
  )
}

export default receipt
