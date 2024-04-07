import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const backend = 'http://192.168.107.212:8000/api'
export const domain = 'http://192.168.107.212:8000'

export async function get(path: string) {
  const token = await AsyncStorage.getItem('auth_token')
  console.log('Token from store: ', token)
  const url = `${backend}${path}`
  console.log(url)

  const result = await axios.get(url, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  return result
}

export async function post(path: string, data: Record<string, string | number | boolean>) {
  const token = await AsyncStorage.getItem('auth_token')
  console.log('Token from store: ', token)
  const url = `${backend}${path}`
  console.log(url)

  const result = await axios.post(url, data, {
    headers: {
      HTTP_AUTHORIZATION: `Bearer ${token}`
    }
  })
  return result
}

export const refreshToken = async () => {
  console.log('Refreshing')
  const refresh = await AsyncStorage.getItem('refresh_token')
  console.log(refresh)

  const url = `${backend}/user/token/refresh/`
  console.log(url)
  const result = await axios.post(url, { refresh })
  console.log(result.data)
  await AsyncStorage.setItem('auth_token', result.data['access'])
  return result.data['access']
}
