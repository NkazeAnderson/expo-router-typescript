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

export const apartment_Results_Sample = {
  id: 28,
  posted_by: {
    first_name: 'Nkaze Anderson',
    last_name: 'Tendzong',
    id: 1,
    profile_picture: null,
    rating: 0
  },
  for_sale: false,
  is_interested: false,
  amenities_details: ['water'],
  category_detail: 'Apartment',
  interested_users_count: 0,
  area: 'Bamendakwe, Bamenda, Mezam, North West, Cameroon',
  video_link: '/uploads/property/WhatsApp_Video_2024-03-27_at_2.12.48_AM_bdFFi50.mp4',
  primary_link: '/uploads/property/istockphoto-1198100351-612x612.jpg',
  images_link: [
    {
      url: '/uploads/property/e37362ca-079c-4a6f-aedc-0adaf4cbed78_1140x641.jpg',
      id: 65
    },
    {
      url: '/uploads/property/A_Battersea_staff_member_cuddles_a_kitten_in_one_of_our_Cattery_pens_0.jpg',
      id: 66
    }
  ],
  name: 'Motelo',
  description: 'best hotel',
  street: 'Mile 4',
  bed_rooms: 1,
  sitting_rooms: 1,
  internal_toilets: 1,
  internal_kitchens: 0,
  price: 18000,
  caution: 5000,
  created_date: '2024-04-03'
}

export const properties = [
  {
    id: 0,
    bed_rooms: 2,
    sitting_rooms: 1,
    internal_kitchens: 1,
    internal_toilet: 1,
    name: 'City of peace',
    category: 'house',
    category_detail: 'Duplex',
    isForSale: false,
    price: 15000,
    posted_by: {
      first_name: 'Chris',
      last_name: 'Frank',
      profile_pic: 'C R Rentals',
      rating: 5
    },
    amenities_details: ['pool', 'parking', 'water', 'wifi'],
    images: ['house.png', 'house1.png'],
    primary_link: '0',
    street: 'mile 4, Bamenda',
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
    amenities: ['pool', 'generator', 'gate', 'gym'],
    images: ['house.png', 'house1.png'],
    primaryImage: 0,
    address: 'mile 6, Bamenda',
    interested: [1],
    paidBy: 1,
    description: 'This is an newly constructed house with some amazing stuffs'
  }
]
export const propertyTypes: propertyTypes[] = ['Apartment', 'Land', 'Business Place', 'Self Content']

export const user_sample = {
  phone: '683403750',
  email: '',
  first_name: 'Nkaze Anderson',
  last_name: 'Tendzong',
  id: 1,
  profile_picture: '',
  rating: 0
}
