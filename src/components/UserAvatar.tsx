import profilePlaceHolder from '../assets/images/profilePlaceHolder.png'
import React from 'react'
import { Image } from 'react-native'
import { colors } from 'src/config/theme'

const UserAvatar = ({ url }: { url: string | null }) => {
  return (
    <Image
      className="w-[50px] h-[50px] rounded-full border border-2"
      style={{ borderColor: colors['grayText'], borderWidth: 2 }}
      source={url && url !== null ? { uri: url } : profilePlaceHolder}
    />
  )
}

export default UserAvatar
