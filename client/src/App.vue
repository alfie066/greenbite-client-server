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
        <button type="button" :class="{ active: page === 'request' }" @click="showPage('request')">Order or Enquiry</button>
        <button type="button" :class="{ active: page === 'staff' }" @click="showPage('staff')">Staff View</button>
        <button type="button" :class="{ active: page === 'network' }" @click="showPage('network')">Networking</button>
      </nav>
    </header>

    <main>
      <section v-show="page === 'home'" class="page hero grid-two">
        <div>
          <p class="eyebrow">GreenBite Bistro customer application</p>
          <h1>Fresh lunches, drinks and allergy-aware options in one simple web application.</h1>
          <p class="lead">Explore today's menu, identify suitable dietary options, and send a collection request or enquiry to GreenBite Bistro.</p>
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
          <button class="primary" type="button" @click="loadFeaturedItem">
            Refresh featured item
          </button>
          <div class="plate" aria-hidden="true">{{ featuredItem.emoji }}</div>
          <h2>Today's featured option</h2>
          <p><strong>{{ featuredItem.name }}</strong></p>
          <p>{{ featuredItem.description }}</p>
          <span class="price">£{{ featuredItem.price ? featuredItem.price.toFixed(2) : '0.00' }}</span>
        </div>
      </section>

      <section v-show="page === 'menu'" class="page panel">
        <p class="eyebrow">GreenBite menu</p>
        <h2>Explore our food and drinks</h2>
        
        <div class="menu-grid">
          <article 
            v-for="item in menuItems" 
            :key="item.id" 
            class="menu-card" 
            :class="{ muted: !item.available }"
          >
            <div class="menu-emoji" aria-hidden="true">{{ item.emoji }}</div>
            <div class="menu-card-content">
              <div class="card-head">
                <h3>{{ item.name }}</h3><span>£{{ item.price.toFixed(2) }}</span>
              </div>
              <p>{{ item.description }}</p>
              <div class="tags">
                <span 
                  v-for="(tag, idx) in item.tags" 
                  :key="idx" 
                  class="tag" 
                  :class="{ main: idx === 0 }"
                >
                  {{ tag }}
                </span>
                <span v-if="!item.available" class="tag warn">Unavailable</span>
              </div>
              <button 
                v-if="item.available" 
                class="small" 
                type="button" 
                @click="showPage('request')"
              >
                Request this item
              </button>
              <button v-else class="small" type="button" disabled>Currently unavailable</button>
            </div>
          </article>
        </div>
      </section>

      <section v-show="page === 'request'" class="page grid-two align-start">
        <div class="panel">
          <p class="eyebrow">Customer order or enquiry</p>
          <h2>Contact GreenBite Bistro</h2>
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
                <option v-for="item in menuItems" :key="item.id" :value="item.name">
                  {{ item.name }} (£{{ item.price.toFixed(2) }})
                </option>
              </select></label>
            <label>Preferred collection time<input type="time"></label>
            <label>Dietary note, message or question<textarea maxlength="300" placeholder="Add a short message"></textarea></label>
            <button class="primary" type="submit">Submit request preview</button>
          </form>
        </div>
      </section>

      <section v-show="page === 'staff'" class="page panel">
        <p class="eyebrow">Staff request view</p>
        <h2>Customer orders and enquiries</h2>
        <div class="request-list">
          <article v-for="req in staffRequests" :key="req.reference" class="request-card">
            <div class="card-head">
              <h3>{{ req.name }}</h3><span class="status">{{ req.status }}</span>
            </div>
            <p><strong>Reference:</strong> {{ req.reference }}</p>
            <p><strong>Request type:</strong> {{ req.type }}</p>
            <p><strong>Contact:</strong> {{ req.contact }}</p>
            <p><strong>Item:</strong> {{ req.item }}</p>
            <p><strong>Preferred time:</strong> {{ req.preferredTime }}</p>
            <p><strong>Message:</strong> {{ req.message }}</p>
          </article>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const page = ref('home')
const businessName = ref('GreenBite Bistro')

const featuredItem = ref({ name: '', description: '', price: 0, emoji: '' })
const menuItems = ref([])
const staffRequests = ref([])

function showPage(pageName) {
  page.value = pageName
  window.scrollTo(0, 0)
}

async function loadFeaturedItem() {
  const res = await fetch('http://localhost:3000/api/featured-item')
  featuredItem.value = await res.json()
}

async function loadMenuItems() {
  const res = await fetch('http://localhost:3000/api/menu')
  menuItems.value = await res.json()
}

async function loadCustomerRequests() {
  const res = await fetch('http://localhost:3000/api/customerRequests')
  customerRequests.value = await res.json()
}

onMounted(() => {
  loadFeaturedItem()
  loadMenuItems()
  loadCustomerRequests()
})
</script>