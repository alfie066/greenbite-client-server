const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

const menuItems = [
  {
    id: 1,
    name: 'Gluten-Free Margherita Pizza',
    description: 'Tomato, mozzarella and basil on a gluten-free base.',
    price: 7.5,
    emoji: '🍕',
    category: 'Pizza',
    dietaryTags: ['gluten-free', 'vegetarian'],
    available: true,
  },
  {
    id: 2,
    name: 'Chicken Pesto Panini',
    description: 'Toasted panini with chicken, pesto and mozzarella.',
    price: 5.8,
    emoji: '🥪',
    category: 'Savoury',
    dietaryTags: [],
    available: true,
  },
  {
    id: 3,
    name: 'Iced Latte',
    description: 'Cold espresso with milk served over ice.',
    price: 3.2,
    emoji: '🥤',
    category: 'Drinks',
    dietaryTags: ['vegetarian'],
    available: true,
  },
  {
    id: 4,
    name: 'Vegan Chocolate Brownie',
    description: 'Rich chocolate brownie made without dairy ingredients.',
    price: 3.6,
    emoji: '🍫',
    category: 'Sweets',
    dietaryTags: ['vegan', 'dairy-free'],
    available: true,
  },
  {
    id: 5,
    name: 'GreenBite Halloumi Burger',
    description: 'Grilled halloumi, salad, tomato relish and toasted bun.',
    price: 8.4,
    emoji: '🍔',
    category: 'Burgers',
    dietaryTags: ['vegetarian'],
    available: false,
  },
  {
    id: 6,
    name: 'Moroccan Chickpea Salad',
    description: 'Chickpeas, roasted vegetables, herbs and lemon dressing.',
    price: 6.2,
    emoji: '🥗',
    category: 'Savoury',
    dietaryTags: ['vegan', 'gluten-free'],
    available: true,
  }
]

const featuredItemId = 1

app.get('/api/menu', (request, response) => {
  response.json(menuItems)
})

app.get('/api/featured-item', (request, response) => {
  const featuredItem = menuItems.find(
    (item) => item.id === featuredItemId
  )

  response.json(featuredItem)
})

app.listen(PORT, () => {
  console.log(
    `GreenBite server running on http://localhost:${PORT}`
  )
})