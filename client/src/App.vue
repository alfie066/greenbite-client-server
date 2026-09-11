<template>
  <div class="application">
    <header class="topbar">
      <a href="#" class="brand" @click.prevent="showPage('home')">
        <span class="brand-mark">GB</span>
        <span><strong>{{ businessName }}</strong><small>Fresh food near campus</small></span>
      </a>
      <nav aria-label="Main navigation">
        <button type="button" :class="{ active: page === 'home' }" @click="showPage('home')">Home</button>
        <button type="button" :class="{ active: page === 'menu' }" @click="showPage('menu')">Menu</button>
        <button type="button" :class="{ active: page === 'request' }" @click="showPage('request')">Order or
          Enquiry</button>
        <button type="button" :class="{ active: page === 'staff' }" @click="showPage('staff')">Staff View</button>
        <button type="button" :class="{ active: page === 'network' }" @click="showPage('network')">Networking</button>
      </nav>
    </header>

    <main>
      <section v-show="page === 'home'" class="page hero grid-two">
        <div>
          <p class="eyebrow">GreenBite Bistro customer application</p>
          <h1>Fresh lunches, drinks and allergy-aware options in one simple web application.</h1>
          <p class="lead">Explore today's menu, identify suitable dietary options, and send a collection request or
            enquiry to GreenBite Bistro.</p>
          <div class="actions">
            <button class="primary" type="button" @click="showPage('menu')">Explore the menu</button>
            <button class="secondary" type="button" @click="showPage('request')">Send a request</button>
          </div>
          <div class="info-cards">
            <div><strong>Opening hours</strong><span>Monday to Friday, 08:00 to 17:00</span></div>
            <div><strong>Location</strong><span>Aston University campus, Birmingham</span></div>
            <div><strong>Contact</strong><span>hello@greenbite.example</span></div>
          </div>
        </div>
        <div class="showcase-card">
          <button
          class="primary"
          type="button"
          @click="loadFeaturedItem"
          >
          Load featured item from server
          </button>
          <div class="plate" aria-hidden="true">{{ featuredItem.emoji }}</div>
          <h2>Today's featured option</h2>
          <p><strong>{{ featuredItem.name }}</strong></p>
          <p>{{ featuredItem.description }}</p>
          <span class="price">£{{ featuredItem.price.toFixed(2) }}</span>
        </div>
      </section>

      <section v-show="page === 'menu'" class="page panel">
        <p class="eyebrow">GreenBite menu</p>
        <h2>Explore our food and drinks</h2>
        <p>All products are written directly in HTML. The controls are placeholders and do not filter the menu.</p>
        <div class="filters">
          <label>Search<input type="search" placeholder="Search is not implemented yet"></label>
          <label>Category<select>
              <option>All categories</option>
              <option>Pizza</option>
              <option>Savoury</option>
              <option>Drinks</option>
              <option>Sweets</option>
              <option>Burgers</option>
            </select></label>
          <label>Dietary tag<select>
              <option>All dietary tags</option>
              <option>Gluten-free</option>
              <option>Vegetarian</option>
              <option>Vegan</option>
            </select></label>
          <label class="check-row"><input type="checkbox"> Available only</label>
        </div>
        <p class="notice">Search and filters are intentionally non-functional.</p>
        <div class="menu-grid">
          <article class="menu-card">
            <div class="menu-emoji" aria-hidden="true">🍕</div>
            <div class="menu-card-content">
              <div class="card-head">
                <h3>Gluten-Free Margherita Pizza</h3><span>£7.50</span>
              </div>
              <p>Tomato, mozzarella and basil on a gluten-free base.</p>
              <div class="tags"><span class="tag main">Pizza</span><span class="tag">gluten-free</span><span
                  class="tag">vegetarian</span></div>
              <button class="small" type="button" @click="showPage('request')">Request this item</button>
            </div>
          </article>
          <article class="menu-card">
            <div class="menu-emoji" aria-hidden="true">🥪</div>
            <div class="menu-card-content">
              <div class="card-head">
                <h3>Chicken Pesto Panini</h3><span>£5.80</span>
              </div>
              <p>Toasted panini with chicken, pesto and mozzarella.</p>
              <div class="tags"><span class="tag main">Savoury</span><span class="tag">contains dairy</span></div>
              <button class="small" type="button" @click="showPage('request')">Request this item</button>
            </div>
          </article>
          <article class="menu-card">
            <div class="menu-emoji" aria-hidden="true">🥤</div>
            <div class="menu-card-content">
              <div class="card-head">
                <h3>Iced Latte</h3><span>£3.20</span>
              </div>
              <p>Cold espresso with milk served over ice.</p>
              <div class="tags"><span class="tag main">Drinks</span><span class="tag">vegetarian</span></div>
              <button class="small" type="button" @click="showPage('request')">Request this item</button>
            </div>
          </article>
          <article class="menu-card">
            <div class="menu-emoji" aria-hidden="true">🍫</div>
            <div class="menu-card-content">
              <div class="card-head">
                <h3>Vegan Chocolate Brownie</h3><span>£3.60</span>
              </div>
              <p>Rich chocolate brownie made without dairy ingredients.</p>
              <div class="tags"><span class="tag main">Sweets</span><span class="tag">vegan</span><span
                  class="tag">dairy-free</span></div>
              <button class="small" type="button" @click="showPage('request')">Request this item</button>
            </div>
          </article>
          <article class="menu-card muted">
            <div class="menu-emoji" aria-hidden="true">🍔</div>
            <div class="menu-card-content">
              <div class="card-head">
                <h3>GreenBite Halloumi Burger</h3><span>£8.40</span>
              </div>
              <p>Grilled halloumi, salad, tomato relish and toasted bun.</p>
              <div class="tags"><span class="tag main">Burgers</span><span class="tag">vegetarian</span><span
                  class="tag warn">Unavailable</span></div>
              <button class="small" type="button" disabled>Currently unavailable</button>
            </div>
          </article>
          <article class="menu-card">
            <div class="menu-emoji" aria-hidden="true">🥗</div>
            <div class="menu-card-content">
              <div class="card-head">
                <h3>Moroccan Chickpea Salad</h3><span>£6.20</span>
              </div>
              <p>Chickpeas, roasted vegetables, herbs and lemon dressing.</p>
              <div class="tags"><span class="tag main">Savoury</span><span class="tag">vegan</span><span
                  class="tag">gluten-free</span></div>
              <button class="small" type="button" @click="showPage('request')">Request this item</button>
            </div>
          </article>
        </div>
      </section>

      <section v-show="page === 'request'" class="page grid-two align-start">
        <div class="panel">
          <p class="eyebrow">Customer order or enquiry</p>
          <h2>Contact GreenBite Bistro</h2>
          <p>The form is visible, but it does not save data or update Staff View.</p>
          <form class="request-form" @submit.prevent>
            <label>Request type<select required>
                <option value="">Select a request type</option>
                <option>Collection order</option>
                <option>General enquiry</option>
              </select></label>
            <label>Your name<input type="text" placeholder="For example, Luis" required></label>
            <label>Email or phone<input type="text" placeholder="For example, user@email.com" required></label>
            <label>Menu item<select required>
                <option value="">Select an item</option>
                <option>Gluten-Free Margherita Pizza</option>
                <option>Chicken Pesto Panini</option>
                <option>Iced Latte</option>
                <option>Vegan Chocolate Brownie</option>
                <option>Moroccan Chickpea Salad</option>
              </select></label>
            <label>Preferred collection time<input type="time"></label>
            <label>Dietary note, message or question<textarea maxlength="300"
                placeholder="Add a short message"></textarea></label>
            <button class="primary" type="submit">Submit request preview</button>
          </form>
        </div>
        <aside class="panel success-panel">
          <h3>Confirmation preview</h3>
          <p>A later exercise will display a dynamic confirmation here.</p>
          <p class="notice">This static form does not add requests to Staff View.</p>
        </aside>
      </section>

      <section v-show="page === 'staff'" class="page panel">
        <p class="eyebrow">Static staff request view</p>
        <h2>Customer orders and enquiries</h2>
        <p>These requests are written directly in HTML and never change.</p>
        <div class="request-list">
          <article class="request-card">
            <div class="card-head">
              <h3>Maria</h3><span class="status">New</span>
            </div>
            <p><strong>Reference:</strong> 101</p>
            <p><strong>Request type:</strong> Order</p>
            <p><strong>Contact:</strong> maria@example.com</p>
            <p><strong>Item:</strong> Gluten-Free Margherita Pizza</p>
            <p><strong>Preferred time:</strong> 12:30</p>
            <p><strong>Message:</strong> Please keep one available if possible.</p>
          </article>
          <article class="request-card">
            <div class="card-head">
              <h3>Ahmed</h3><span class="status">New</span>
            </div>
            <p><strong>Reference:</strong> 102</p>
            <p><strong>Request type:</strong> Enquiry</p>
            <p><strong>Contact:</strong> 07123 456789</p>
            <p><strong>Item:</strong> Iced Latte</p>
            <p><strong>Preferred time:</strong> Not specified</p>
            <p><strong>Message:</strong> Can this be made with oat milk?</p>
          </article>
        </div>
      </section>

      <section v-show="page === 'network'" class="page panel">
        <p class="eyebrow">Systems and networking</p>
        <h2>How the completed application will operate</h2>
        <p>The mockup currently runs in the browser. Later, Vue and Express will run as separate applications on
          different ports.</p>
        <div class="development-architecture">
          <div class="architecture-node"><strong>Browser</strong><span>Displays the interface</span></div>
          <div class="architecture-connection">Loads</div>
          <div class="architecture-node pending"><strong>Vue client</strong><span>Vite, port 5173</span></div>
          <div class="architecture-connection">fetch()</div>
          <div class="architecture-node pending"><strong>Express server</strong><span>Node.js, port 3000</span></div>
          <div class="architecture-connection">Reads and writes</div>
          <div class="architecture-node pending"><strong>JSON files</strong><span>Data persistence</span></div>
        </div>
        <div class="notes-grid">
          <div>
            <h3>Current state</h3>
            <p>Only the page navigation uses JavaScript.</p>
          </div>
          <div>
            <h3>Static content</h3>
            <p>Menu cards, form and staff requests are written directly in HTML.</p>
          </div>
          <div>
            <h3>Later</h3>
            <p>Vue will add interactivity and Express will provide data and persistence.</p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>

import { ref } from 'vue'

const page = ref('home')
const businessName = ref('GreenBite Bistro')
const featuredItem = ref({
name: 'Gluten-Free Margherita Pizza',
description:
'Tomato, mozzarella and basil on a gluten-free base.',
price: 7.5,
emoji: '🍕'
})

function showPage(pageName) {
  page.value = pageName
  window.scrollTo(0, 0)
}

async function loadFeaturedItem() {
const response = await fetch(
'http://localhost:3000/api/featured-item'
)
const data = await response.json()
featuredItem.value = data
}
</script>
