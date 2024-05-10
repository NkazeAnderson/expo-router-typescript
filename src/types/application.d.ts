type propertyTypes = 'Apartment' | 'Land' | 'Business Place' | 'Self Content'
type Filters = (
  | {
      propertyType: Extract<propertyTypes, 'Apartment'>
      rooms: number
      kitchen: number
      toilet: number
      isMonthly: boolean
    }
  | {
      propertyType: Extract<propertyTypes, 'Land'>
    }
  | {
      propertyType: Extract<propertyTypes, 'Business Place' | 'Self Content'>
      isMonthly: boolean
    }
) & { location: string; price: number }
type MessageT = { message: null | string; created_date: string; sender: number; conversation: number; photo: null | string; read: boolean }

type ConversationT = {
  id: number
  other_member: {
    first_name: string
    last_name: string
    id: number
    profile_picture: null | string
    rating: number
  }
  unread_messages: number
  last_message: {
    is_photo: boolean
    message?: string
    date: string
  }
}
