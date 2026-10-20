const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use(cors())
app.use(express.json())

const siteDetails = {
  businessName: 'Aston Bistro',
  initials: 'AB',
  tagline: 'Fresh food near campus',

  home: {
    label: 'Aston Bistro customer home page',
    heading:
      'Fresh lunches, drinks and allergy-aware options in one simple web application.',
    introduction:
      'Explore today\'s menu, identify suitable dietary options, and send a collection request or enquiry.'
  },

  businessInformation: {
    openingHours: 'Monday to Friday, 08:00 to 17:00',
    location: 'Aston University campus, Birmingham',
    contact: 'bistro@aston.com'
  }
}

const menuItems = [
  {
    id: 1,
    name: 'Gluten-Free Margherita Pizza',
    description: 'Tomato, mozzarella and basil on a gluten-free base.',
    price: 7.5,
    image: '/images/Gluten-Free Margherita Pizza.jpg',
    category: 'Pizza',
    dietaryTags: ['gluten-free', 'vegetarian'],
    available: true
  },
  {
    id: 2,
    name: 'Chicken Pesto Panini',
    description: 'Toasted panini with chicken, pesto and mozzarella.',
    price: 5.8,
    image: '/images/Chicken Pesto Panini.jpg',
    category: 'Savoury',
    dietaryTags: [],
    available: true
  },
  {
    id: 3,
    name: 'Iced Latte',
    description: 'Cold espresso with milk served over ice.',
    price: 3.2,
    image: '/images/Iced Latte.jpg',
    category: 'Drinks',
    dietaryTags: ['vegetarian'],
    available: true
  },
  {
    id: 4,
    name: 'Vegan Chocolate Brownie',
    description: 'Rich chocolate brownie made without dairy ingredients.',
    price: 3.6,
    image: '/images/Vegan Chocolate Brownie.jpg',
    category: 'Sweets',
    dietaryTags: ['vegan', 'dairy-free'],
    available: true
  },
  {
    id: 5,
    name: 'Halloumi Burger',
    description: 'Grilled halloumi, salad, tomato relish and toasted bun.',
    price: 8.4,
    image: '/images/Halloumi Burger.jpg',
    category: 'Burgers',
    dietaryTags: ['vegetarian'],
    available: false
  },
  {
    id: 6,
    name: 'Moroccan Chickpea Salad',
    description: 'Chickpeas, roasted vegetables, herbs and lemon dressing.',
    price: 6.2,
    image: '/images/Moroccan Chickpea Salad.jpg',
    category: 'Savoury',
    dietaryTags: ['vegan', 'gluten-free'],
    available: true
  },
  {
    id: 7,
    name: 'Oat Milk Flat White',
    description: 'Smooth double espresso with silky steamed oat milk.',
    price: 3.5,
    image: '/images/Oat Milk Flat White.jpg',
    category: 'Drinks',
    dietaryTags: ['vegan', 'dairy-free'],
    available: true
  },
  {
    id: 8,
    name: 'Avocado & Tomato Sourdough',
    description: 'Smashed avocado, cherry tomatoes and seeds on toasted sourdough.',
    price: 6.5,
    image: '/images/Avocado & Tomato Sourdough.jpg',
    category: 'Savoury',
    dietaryTags: ['vegan', 'dairy-free', 'nut-free'],
    available: true
  },
  {
    id: 9,
    name: 'Fresh Berry Muffin',
    description: 'Freshly baked blueberry and raspberry muffin with a sweet crumb topping.',
    price: 3.4,
    image: '/images/Fresh Berry Muffin.jpg',
    category: 'Sweets',
    dietaryTags: ['vegetarian'],
    available: true
  },
  {
    id: 10,
    name: 'Gourmet Bacon Smash Burger',
    description: 'Beef patty with smoked bacon, melted cheese, pickles and house sauce.',
    price: 8.9,
    image: '/images/Gourmet Bacon Smash Burger.jpg',
    category: 'Burgers',
    dietaryTags: [],
    available: false
  },
  {
    id: 11,
    name: 'Spicy Pepperoni Pizza',
    description: 'Tomato sauce, mozzarella and generous slices of spicy pepperoni.',
    price: 8.2,
    image: '/images/Spicy Pepperoni Pizza.jpg',
    category: 'Pizza',
    dietaryTags: ['spicy'],
    available: true
  }
]

const requestsFile = path.join(__dirname, 'requests.json')
const featuredItemId = 2

let requests = loadRequests()

app.get('/api/site-details', (request, response) => {
  response.json(siteDetails)
})

app.get('/api/menu', (request, response) => {
  response.json(menuItems)
})

app.get('/api/featured-item', (request, response) => {
  const featuredItem = menuItems.find((item) => item.id === featuredItemId)
  if (!featuredItem) {
    return response.status(404).json({ message: 'Featured menu item not found' })
  }
  response.json(featuredItem)
})

app.get('/api/requests', (request, response) => {
  const currentRequests = loadRequests()
  response.json(currentRequests)
})

app.post('/api/requests', (req, res) => {
  const {
    customerName,
    customerEmail,
    requestType,
    customerMessage,
    selectedMenuItemId,
    collectionTime
  } = req.body

  if (!customerName || !customerEmail || !requestType || !customerMessage) {
    return res.status(400).json({
      message: 'All request fields are required.'
    })
  }

  let requestsData = []
  try {
    if (fs.existsSync(requestsFile)) {
      requestsData = JSON.parse(fs.readFileSync(requestsFile, 'utf8'))
    }
  } catch (error) {
    console.error('Error reading requests.json:', error)
  }

  const newId = requestsData.length > 0 ? Math.max(...requestsData.map(r => r.id)) + 1 : 1

  const newRequest = {
    id: newId,
    customerName,
    customerEmail,
    requestType,
    customerMessage,
    selectedMenuItemId: Number(selectedMenuItemId) || null,
    collectionTime: collectionTime || '',
    createdAt: new Date().toISOString()
  }

  requestsData.push(newRequest)

  try {
    fs.writeFileSync(
      requestsFile,
      JSON.stringify(requestsData, null, 2),
      'utf8'
    )
  } catch (error) {
    console.error('Error writing to requests.json:', error)
  }

  res.status(201).json({
    message: 'Request saved successfully.',
    request: newRequest
  })
})

app.use(express.static(path.join(__dirname, '../client/dist')))

app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})

app.use((error, request, response, next) => {
  console.error(error)
  response.status(500).json({ message: 'Internal server error' })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Aston Bistro server running on port ${PORT}`)
})

function loadRequests() {
  try {
    if (fs.existsSync(requestsFile)) {
      const fileContent = fs.readFileSync(requestsFile, 'utf8')
      return JSON.parse(fileContent)
    }
  } catch (error) {
    console.error('Error reading requests.json:', error)
  }
  return []
}