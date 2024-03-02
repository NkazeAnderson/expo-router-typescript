import { StyleSheet } from 'react-native'
export const colors = {
  lightBackground: '#FCFCFC',
  whiteText: '#FCFCFC',
  grayBackground: '#F1F1F1',
  grayText: '#979797',
  primary: '#4a43eb',
  secondary: '#38D1F1',
  danger: '#F0635A',
  primaryText: '#333333',
  green: '#0a6b49',
  orange: '#ff5432'
}
export const typograhpy = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontFamily: 'Poppins_700Bold'
  },

  h2: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold'
  },

  h3: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold'
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Poppins_500Medium'
  },

  regularText: {
    fontSize: 18,
    fontFamily: 'Poppins_400Regular'
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular_Italic'
  },
  lableText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular'
  }
})
