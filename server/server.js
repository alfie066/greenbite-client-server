const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

// Server acts as the Single Source of Truth
const menuItems = [
  {
    id: 1,
    name: 'Gluten-Free Margherita Pizza',
    price: 7.50,
    description: 'Tomato, mozzarella and basil on a gluten-free base.',
    category: 'Pizza',
    emoji: '🍕',
    tags: ['Pizza', 'gluten-free', 'vegetarian'],
    available: true,
    isFeatured: true
  },
  {
    id: 2,
    name: 'Chicken Pesto Panini',
    price: 5.80,
    description: 'Toasted panini with chicken, pesto and mozzarella.',
    category: 'Savoury',
    emoji: '🥪',
    tags: ['Savoury', 'contains dairy'],
    available: true,
    isFeatured: false
  },
  {
    id: 3,
    name: 'Iced Latte',
    price: 3.20,
    description: 'Cold espresso with milk served over ice.',
    category: 'Drinks',
    emoji: '🥤',
    tags: ['Drinks', 'vegetarian'],
    available: true,
    isFeatured: false
  },
  {
    id: 4,
    name: 'Vegan Chocolate Brownie',
    price: 3.60,
    description: 'Rich chocolate brownie made without dairy ingredients.',
    category: 'Sweets',
    emoji: '🍫',
    tags: ['Sweets', 'vegan', 'dairy-free'],
    available: true,
    isFeatured: false
  },
  {
    id: 5,
    name: 'GreenBite Halloumi Burger',
    price: 8.40,
    description: 'Grilled halloumi, salad, tomato relish and toasted bun.',
    category: 'Burgers',
    emoji: '🍔',
    tags: ['Burgers', 'vegetarian'],
    available: false,
    isFeatured: false
  },
  {
    id: 6,
    name: 'Moroccan Chickpea Salad',
    price: 6.20,
    description: 'Chickpeas, roasted vegetables, herbs and lemon dressing.',
    category: 'Savoury',
    emoji: '🥗',
    tags: ['Savoury', 'vegan', 'gluten-free'],
    available: true,
    isFeatured: false
  }
]

const customerRequests = [
  {
    reference: 101,
    name: 'Maria',
    status: 'New',
    type: 'Order',
    contact: 'maria@example.com',
    item: 'Gluten-Free Margherita Pizza',
    preferredTime: '12:30',
    message: 'Please keep one available if possible.'
  },
  {
    reference: 102,
    name: 'Ahmed',
    status: 'New',
    type: 'Enquiry',
    contact: '07123 456789',
    item: 'Iced Latte',
    preferredTime: 'Not specified',
    message: 'Can this be made with oat milk?'
  }
]

app.get('/api/menu', (req, res) => {
  res.json(menuItems)
})

app.get('/api/featured-item', (req, res) => {
  const featured = menuItems.find(item => item.isFeatured) || menuItems[0]
  res.json(featured)
})

app.get('/api/requests', (req, res) => {
  res.json(customerRequests)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})