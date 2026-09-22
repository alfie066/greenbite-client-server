const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3000

const path = require('path');

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(cors())
app.use(express.json())

const siteDetails = {
  businessName: 'Placeholder Bistro',
  initials: 'PB',
  tagline: 'Fresh food near campus',

  home: {
    label: 'Placeholder Bistro customer home page',
    heading:
      'Fresh lunches, drinks and allergy-aware options in one simple web application.',
    introduction:
      'Explore today\'s menu, identify suitable dietary options, and send a collection request or enquiry.'
  },

  businessInformation: {
    openingHours: 'Monday to Friday, 08:00 to 17:00',
    location: 'Aston University campus, Birmingham',
    contact: 'hello@placeholder.example'
  }
}

const menuItems = [
  {
    id: 1,
    name: 'Gluten-Free Margherita Pizza',
    description:
      'Tomato, mozzarella and basil on a gluten-free base.',
    price: 7.5,
    image: 'http://localhost:3000/images/Gluten-Free Margherita Pizza.jpg',
    category: 'Pizza',
    dietaryTags: ['gluten-free', 'vegetarian'],
    available: true
  },
  {
    id: 2,
    name: 'Chicken Pesto Panini',
    description:
      'Toasted panini with chicken, pesto and mozzarella.',
    price: 5.8,
    image: 'http://localhost:3000/images/Chicken Pesto Panini.jpg',
    category: 'Savoury',
    dietaryTags: [],
    available: true
  },
  {
    id: 3,
    name: 'Iced Latte',
    description:
      'Cold espresso with milk served over ice.',
    price: 3.2,
    image: 'http://localhost:3000/images/Iced Latte.jpg',
    category: 'Drinks',
    dietaryTags: ['vegetarian'],
    available: true
  },
  {
    id: 4,
    name: 'Vegan Chocolate Brownie',
    description:
      'Rich chocolate brownie made without dairy ingredients.',
    price: 3.6,
    image: 'http://localhost:3000/images/Vegan Chocolate Brownie.jpg',
    category: 'Sweets',
    dietaryTags: ['vegan', 'dairy-free'],
    available: true
  },
  {
    id: 5,
    name: 'Halloumi Burger',
    description:
      'Grilled halloumi, salad, tomato relish and toasted bun.',
    price: 8.4,
    image: 'http://localhost:3000/images/Halloumi Burger.jpg',
    category: 'Burgers',
    dietaryTags: ['vegetarian'],
    available: false
  },
  {
    id: 6,
    name: 'Moroccan Chickpea Salad',
    description:
      'Chickpeas, roasted vegetables, herbs and lemon dressing.',
    price: 6.2,
    image: 'http://localhost:3000/images/Moroccan Chickpea Salad.jpg',
    category: 'Savoury',
    dietaryTags: ['vegan', 'gluten-free'],
    available: true
  }
]

const featuredItemId = 2

// This will be populated in the future if it works
const requests = []

app.get('/api/site-details', (request, response) => {
  response.json(siteDetails)
})

app.get('/api/menu', (request, response) => {
  response.json(menuItems)
})

app.get('/api/featured-item', (request, response) => {
  const featuredItem = menuItems.find(
    (item) => item.id === featuredItemId
  )

  if (!featuredItem) {
    return response.status(404).json({
      message: 'Featured menu item not found'
    })
  }

  response.json(featuredItem)
})

app.get('/api/requests', (request, response) => {
  const requestsWithMenuItems = requests.map((customerRequest) => {
    const menuItem = menuItems.find(
      (item) => item.id === customerRequest.menuItemId
    )

    return {
      ...customerRequest,
      menuItemName:
        menuItem?.name ?? 'Menu item no longer available'
    }
  })

  response.json(requestsWithMenuItems)
})

app.use((request, response) => {
  response.status(404).json({
    message: 'Route not found'
  })
})


app.use((error, request, response, next) => {
  console.error(error)

  response.status(500).json({
    message: 'Internal server error'
  })
})

app.listen(PORT, () => {
  console.log(
    `Placeholder Bistro server running on http://localhost:${PORT}`
  )
})