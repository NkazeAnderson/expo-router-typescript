import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
//import { uploadAsync } from 'expo-file-system'

const backend = 'http://192.168.105.212:8000/api'
export const domain = 'http://192.168.105.212:8000'

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

export async function post(path: string, data: Record<string, string | number | boolean> | FormData | BodyInit) {
  const token = await AsyncStorage.getItem('auth_token')
  const isFormData = data instanceof FormData
  console.log('Token from store: ', token)
  const url = `${backend}${path}`
  console.log(url)

  const result = isFormData
    ? fetch(url, {
        method: 'post',
        headers: {
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('auth_token')),
          'Content-Type': 'multipart/form-data'
        },
        body: data
      })
    : await axios.post(url, data, {
        headers: {
          HTTP_AUTHORIZATION: 'Bearer ' + token
        }
      })
  return result
}

export async function put(path: string, data: Record<string, string | number | boolean> | FormData | BodyInit) {
  const token = await AsyncStorage.getItem('auth_token')
  const isFormData = data instanceof FormData
  console.log('Token from store: ', token)
  const url = `${backend}${path}`
  console.log(url)

  const result = isFormData
    ? fetch(url, {
        method: 'put',
        headers: {
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('auth_token')),
          'Content-Type': 'multipart/form-data'
        },
        body: data
      })
    : await axios.put(url, data, {
        headers: {
          HTTP_AUTHORIZATION: 'Bearer ' + token
        }
      })
  return result
}

export async function destroy(path: string, formParser: boolean) {
  const token = await AsyncStorage.getItem('auth_token')

  console.log('Token from store: ', token)
  const url = `${backend}${path}`
  console.log(url)

  const result = formParser
    ? fetch(url, {
        method: 'delete',
        headers: {
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('auth_token')),
          'Content-Type': 'multipart/form-data'
        }
      })
    : await axios.delete(url, {
        headers: {
          HTTP_AUTHORIZATION: 'Bearer ' + token
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
