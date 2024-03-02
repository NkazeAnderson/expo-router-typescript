import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { colors, typograhpy } from 'src/config/theme'
import { users } from 'src/config/constants'
import { Icon, IconButton } from 'react-native-paper'

const BalanceCard = () => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0.9, y: 0.9 }}
      style={{ width: '100%', height: 200, borderRadius: 15, padding: 15 }}
      colors={['rgba(74, 67, 235, 0.8)', 'rgba(74, 67, 235,0.9)', 'rgba(74, 67, 235, 0.8)']}>
      <View className="flex flex-row justify-between items-center">
        <View className="flex-grow">
          <Text className="text-whiteText text-center" style={typograhpy.h2}>
            Balance
          </Text>
        </View>
        <Icon source={'lock'} size={18} />
      </View>
      <View className="my-1">
        <Text className="text-whiteText text-center underline" style={typograhpy.h3}>
          FCFA 3,000,000
        </Text>
        <View className="flex flex-row justify-center space-x-4">
          <View>
            <IconButton icon={'plus'} iconColor={colors.green} containerColor={colors.whiteText} />
          </View>
          <View>
            <IconButton icon={'minus'} iconColor={colors.danger} containerColor={colors.whiteText} />
          </View>
        </View>
      </View>
      <Text style={typograhpy.h3} className="capitalize text-whiteText">
        {users[0].name}
      </Text>
    </LinearGradient>
  )
}

export default BalanceCard
