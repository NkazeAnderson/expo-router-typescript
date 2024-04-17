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
