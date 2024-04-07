import * as SecureStore from 'expo-secure-store'

export async function Save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value)

  console.log('Saved')
}
