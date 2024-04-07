import { View, Text, Image } from 'react-native'
import userPlaceHolder from '../assets/images/face1.png'
import React from 'react'
import { Icon } from 'react-native-paper'
import { colors, typograhpy } from 'src/config/theme'
import { apartment_Results_Sample } from 'src/config/constants'

const AgentCard = ({ agent, description }: { agent: typeof apartment_Results_Sample.posted_by; description: string }) => {
  const ratingArray = []
  for (let index = 0; index < agent.rating; index++) {
    ratingArray.push(index)
  }
  return (
    <View>
      <View className="flex space-x-2 flex-row">
        <Image className="w-[50px] h-[50px] rounded" source={userPlaceHolder} />
        <View>
          <Text className="text-grayText capitalize" style={typograhpy.h3}>
            {`${agent.first_name} ${agent.last_name}`}
          </Text>
          <Text className="text-grayText" style={typograhpy.lableText}>
            Agent - {'Private'}
          </Text>
        </View>
      </View>
      <Text> {description}</Text>
      <View className="flex  flex-row space-x-1 my-2">
        {ratingArray.map((index) => (
          <View key={index}>
            <Icon source={'star'} size={16} color={colors.orange} />
          </View>
        ))}
      </View>
    </View>
  )
}

export default AgentCard
