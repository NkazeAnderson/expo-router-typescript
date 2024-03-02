export const users = [
  {
    name: 'Nkaze Anderson',
    email: 'nkazeandy@gmail.com',
    phone: '683632612',
    id: 0,
    password: '12345678',
    company: '',
    rating: 5,
    interestedProperties: [0],
    properties: [1]
  },
  {
    name: 'Frank Chris',
    email: 'Franck@gmail.com',
    phone: '683632610',
    id: 1,
    password: '12345678',
    company: 'C R Rentals',
    rating: 5,
    interestedProperties: [],
    properties: []
  }
]
// Note! Sanitize Properly in Production
export const properties = [
  {
    id: 0,
    bed: 2,
    sitting: 1,
    kitchen: 1,
    toilet: 1,
    name: 'City of peace',
    category: 'house',
    subCategory: 'Duplex',
    isForSale: false,
    price: 15000,
    postedBy: {
      name: 'Chris Frank',
      company: 'C R Rentals',
      rating: 5
    },
    amenities: ['pool', 'parking', 'water', 'starlink'],
    images: ['house.png', 'house1.png'],
    primaryImage: 0,
    address: 'mile 4, Bamenda',
    interested: [0],
    paidBy: 1,
    description: 'This is a beautiful house in a secure area'
  },
  {
    id: 1,
    bed: 2,
    sitting: 1,
    kitchen: 1,
    toilet: 1,
    name: 'Panthera Leo',
    category: 'house',
    subCategory: 'Studio',
    isForSale: false,
    price: 35000,
    postedBy: users[1],
    amenities: ['pool', 'parking', 'water', 'starlink'],
    images: ['house.png', 'house1.png'],
    primaryImage: 0,
    address: 'mile 6, Bamenda',
    interested: [1],
    paidBy: 1,
    description: 'This is an newly constructed house with some amazing stuffs'
  }
]
