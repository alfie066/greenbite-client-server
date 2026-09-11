const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3000
app.use(cors())
const featuredItem = {
name: 'Gluten-Free Margherita Pizza',
description:
'Tomato, mozzarella and basil on a gluten-free base.',
price: 7.5,
emoji: '🍕'
}
app.get('/api/featured-item', (request, response) => {
response.json(featuredItem)
})
app.listen(PORT, () => {
console.log(
`GreenBite server running on http://localhost:${PORT}`
)
})