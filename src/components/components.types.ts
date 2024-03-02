import { colors } from 'src/config/theme'

export interface ButtonProps {
  text: string
  color: keyof Omit<typeof colors, 'ligtBackground' | 'grayBackground'>
  background?: keyof Omit<typeof colors, 'whiteText' | 'grayText' | 'primaryText'>
  action?: () => void
  icon?: string
}
