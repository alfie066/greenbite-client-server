const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path');

const app = express()
const PORT = process.env.PORT || 3000

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
    description: 'Tomato, mozzarella and basil on a gluten-free base.',
    price: 7.5,
    image: '/images/Gluten-Free Margherita Pizza.jpg', // <--- EDIT 1: Changed to relative path
    category: 'Pizza',
    dietaryTags: ['gluten-free', 'vegetarian'],
    available: true
  },
  {
    id: 2,
    name: 'Chicken Pesto Panini',
    description: 'Toasted panini with chicken, pesto and mozzarella.',
    price: 5.8,
    image: '/images/Chicken Pesto Panini.jpg', // <--- EDIT 1
    category: 'Savoury',
    dietaryTags: [],
    available: true
  },
  {
    id: 3,
    name: 'Iced Latte',
    description: 'Cold espresso with milk served over ice.',
    price: 3.2,
    image: '/images/Iced Latte.jpg', // <--- EDIT 1
    category: 'Drinks',
    dietaryTags: ['vegetarian'],
    available: true
  },
  {
    id: 4,
    name: 'Vegan Chocolate Brownie',
    description: 'Rich chocolate brownie made without dairy ingredients.',
    price: 3.6,
    image: '/images/Vegan Chocolate Brownie.jpg', // <--- EDIT 1
    category: 'Sweets',
    dietaryTags: ['vegan', 'dairy-free'],
    available: true
  },
  {
    id: 5,
    name: 'Halloumi Burger',
    description: 'Grilled halloumi, salad, tomato relish and toasted bun.',
    price: 8.4,
    image: '/images/Halloumi Burger.jpg', // <--- EDIT 1
    category: 'Burgers',
    dietaryTags: ['vegetarian'],
    available: false
  },
  {
    id: 6,
    name: 'Moroccan Chickpea Salad',
    description: 'Chickpeas, roasted vegetables, herbs and lemon dressing.',
    price: 6.2,
    image: '/images/Moroccan Chickpea Salad.jpg', // <--- EDIT 1
    category: 'Savoury',
    dietaryTags: ['vegan', 'gluten-free'],
    available: true
  }
]

const DATA_FILE = path.join(__dirname, 'requests.json')
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
  const requestsWithMenuItems = requests.map((customerRequest) => {
    const menuItem = menuItems.find((item) => item.id === customerRequest.menuItemId)
    return {
      ...customerRequest,
      menuItemName: menuItem?.name ?? 'Menu item no longer available'
    }
  })
  response.json(requestsWithMenuItems)
})

app.post('/api/requests', (request, response) => {
  const { requestType, customerName, menuItemId, customerContact, collectionTime, customerMessage } = request.body

  const newRequest = {
    id: requests.length + 1,
    requestType: requestType || '',
    customerName: customerName || '',
    menuItemId: Number(menuItemId),
    customerContact: customerContact || '',
    collectionTime: collectionTime || '',
    customerMessage: customerMessage || '',
    createdAt: new Date().toISOString()
  }

  requests.push(newRequest)
  saveRequests(requests)

  response.status(201).json({
    message: 'Request saved successfully!',
    request: newRequest
  })
})


app.use(express.static(path.join(__dirname, '../client/dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})

app.use((error, request, response, next) => {
  console.error(error)
  response.status(500).json({ message: 'Internal server error' })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Placeholder Bistro server running on port ${PORT}`)
})

function loadRequests() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const fileContent = fs.readFileSync(DATA_FILE, 'utf8')
      return JSON.parse(fileContent)
    }
  } catch (error) {
    console.error('Error reading requests.json:', error)
  }
  return []
}

function saveRequests(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8')
  } catch (error) {
    console.error('Error writing to requests.json:', error)
  }
}