<template>
  <div
    v-if="siteDetails"
    class="application min-vh-100"
  >
    <header class="sticky-top">
      <nav
        class="navbar navbar-expand-lg bg-paper border-bottom border-warning border-3 shadow-sm"
        aria-label="Main navigation"
      >
        <div class="container-xl">
  <button
    type="button"
    class="navbar-brand d-flex align-items-center gap-2 border-0 bg-transparent p-0"
    @click="showPage('home')"
  >
    <span class="brand-mark">
      {{ siteDetails.initials }}
    </span>

    <span class="d-flex flex-column text-start">
      <strong>
        {{ siteDetails.businessName }}
      </strong>

      <small class="text-secondary">
        {{ siteDetails.tagline }}
      </small>
    </span>
  </button>

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#greenBiteNavigation"
            aria-controls="greenBiteNavigation"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div
            id="greenBiteNavigation"
            class="collapse navbar-collapse"
          >
            <div class="navbar-nav ms-auto gap-lg-1 mt-3 mt-lg-0">
              <button
                type="button"
                class="nav-link nav-button"
                :class="{ active: page === 'home' }"
                :aria-current="page === 'home' ? 'page' : undefined"
                @click="showPage('home')"
              >
                Home
              </button>

              <button
                type="button"
                class="nav-link nav-button"
                :class="{ active: page === 'menu' }"
                :aria-current="page === 'menu' ? 'page' : undefined"
                @click="showPage('menu')"
              >
                Menu
              </button>

              <button
                type="button"
                class="nav-link nav-button"
                :class="{ active: page === 'request' }"
                :aria-current="page === 'request' ? 'page' : undefined"
                @click="showPage('request')"
              >
                Order or Enquiry
              </button>

              <button
                type="button"
                class="nav-link nav-button"
                :class="{ active: page === 'staff' }"
                :aria-current="page === 'staff' ? 'page' : undefined"
                @click="showPage('staff')"
              >
                Staff View
              </button>

              <button
                type="button"
                class="nav-link nav-button"
                :class="{ active: page === 'network' }"
                :aria-current="page === 'network' ? 'page' : undefined"
                @click="showPage('network')"
              >
                Networking
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <main class="container-fluid px-3 px-lg-5 py-4 py-lg-5" style="max-width: 1600px; margin: 0 auto;">
      <section
        v-show="page === 'home'"
        class="row g-4 align-items-center home-section"
      >
        <div class="col-12 col-lg-7">
          <span class="badge greenbite-label mb-3">
            {{ siteDetails.home.label }}
          </span>

          <h1 class="display-3 fw-bold hero-title mb-4">
            {{ siteDetails.home.heading }}
          </h1>

          <p class="lead text-secondary mb-4">
            {{ siteDetails.home.introduction }}
          </p>

          <div class="d-flex flex-wrap gap-3 mb-4">
            <button
              class="btn btn-greenbite btn-lg"
              type="button"
              @click="showPage('menu')"
            >
              Explore the menu
            </button>

            <button
              class="btn btn-outline-greenbite btn-lg"
              type="button"
              @click="showPage('request')"
            >
              Send a request
            </button>
          </div>

          <div class="row g-3">
            <div class="col-12 col-md-4">
              <div class="card info-card h-100 shadow-sm">
                <div class="card-body">
                  <strong class="d-block mb-1">
                    Opening hours
                  </strong>

                  <small class="text-secondary">
                    {{ siteDetails.businessInformation.openingHours }}
                  </small>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-4">
              <div class="card info-card h-100 shadow-sm">
                <div class="card-body">
                  <strong class="d-block mb-1">
                    Location
                  </strong>

                  <small class="text-secondary">
                    {{ siteDetails.businessInformation.location }}
                  </small>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-4">
              <div class="card info-card h-100 shadow-sm">
                <div class="card-body">
                  <strong class="d-block mb-1">
                    Contact
                  </strong>

                  <small class="text-secondary">
                    {{ siteDetails.businessInformation.contact }}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="col-12 col-lg-5">
          <img :src="bistroImage" alt="Placeholder Bistro Interior" class="bistro-img" />

          <article
            v-if="featuredItem"
            class="card featured-card text-center"
          >
            <span class="featured-ribbon">
              Chef's pick
            </span>

            <div class="card-body p-4 p-xl-5">
              <div
                class="featured-plate mx-auto mb-4"
                aria-hidden="true"
              >
                <img 
                  :src="featuredItem.image" 
                  :alt="featuredItem.name" 
                  class="featured-img" 
                />
              </div>

              <p class="small fw-bold text-uppercase text-secondary mb-2">
                Today's featured option
              </p>

              <h2 class="mb-3">
                {{ featuredItem.name }}
              </h2>

              <p class="text-secondary mb-4">
                {{ featuredItem.description }}
              </p>

              <span class="badge price-badge">
                {{ formatPrice(featuredItem.price) }}
              </span>

              <button
                class="btn btn-outline-greenbite btn-sm mt-3"
                type="button"
                @click="requestItem(featuredItem)"
              >
                Request this item
              </button>
            </div>
          </article>
        </div>
      </section>


      <section v-show="page === 'menu'">
        <div class="card page-card shadow-sm border-0">
          <div class="card-body p-4 p-lg-5">
            <span class="badge greenbite-label mb-3">
              {{ siteDetails.businessName }} menu
            </span>

            <h2 class="display-6 fw-bold">
              Explore our food and drinks
            </h2>

            <p class="text-secondary mb-4">
              Browse the menu or narrow the results by category
              and dietary preference.
            </p>

            <div class="filter-panel p-3 p-lg-4 mb-4">
              <div class="row g-3 align-items-end">
                <div class="col-12 col-lg-6">
                  <label
                    for="menuSearch"
                    class="form-label fw-bold"
                  >
                    Search
                  </label>

                  <input
                    id="menuSearch"
                    v-model="searchTerm"
                    class="form-control"
                    type="search"
                    placeholder="Search by name, category or dietary tag"
                  >
                </div>

                <div class="col-12 col-md-6 col-lg-3">
                  <label
                    for="categoryFilter"
                    class="form-label fw-bold"
                  >
                    Category
                  </label>

                  <select
                    id="categoryFilter"
                    v-model="selectedCategory"
                    class="form-select"
                  >
                    <option value="">
                      All categories
                    </option>

                    <option
                      v-for="category in categories"
                      :key="category"
                      :value="category"
                    >
                      {{ category }}
                    </option>
                  </select>
                </div>

                <div class="col-12 col-md-6 col-lg-3">
                  <label
                    for="dietaryFilter"
                    class="form-label fw-bold"
                  >
                    Dietary tag
                  </label>

                  <select
                    id="dietaryFilter"
                    v-model="selectedDietaryTag"
                    class="form-select"
                  >
                    <option value="">
                      All dietary tags
                    </option>

                    <option
                      v-for="tag in dietaryTags"
                      :key="tag"
                      :value="tag"
                    >
                      {{ tag }}
                    </option>
                  </select>
                </div>

                <div class="col-12">
                  <div class="form-check">
                    <input
                      id="availableOnly"
                      v-model="availableOnly"
                      class="form-check-input"
                      type="checkbox"
                    >

                    <label
                      class="form-check-label"
                      for="availableOnly"
                    >
                      Show available items only
                    </label>
                  </div>
                </div>
              </div>

              <div class="d-flex flex-wrap align-items-center gap-3 mt-3">
                <button
                  class="btn btn-outline-secondary btn-sm"
                  type="button"
                  @click="clearFilters"
                >
                  Clear filters
                </button>

                <span class="small text-secondary">
                  {{ filteredMenuItems.length }}
                  {{ filteredMenuItems.length === 1 ? 'item' : 'items' }}
                  displayed
                </span>
              </div>
            </div>

            <div
              v-if="filteredMenuItems.length === 0"
              class="alert alert-warning"
              role="alert"
            >
              No menu items match the selected filters.
            </div>

            <div
              v-else
              class="row g-4"
            >
              <div
                v-for="item in filteredMenuItems"
                :key="item.id"
                class="col-12 col-lg-6"
              >
                <article
                  class="card menu-card h-100"
                  :class="{
                    'menu-card-unavailable': !item.available
                  }"
                >
                  <div class="card-body d-flex gap-3 p-4">
                    <div class="menu-media flex-shrink-0">
                      <img 
                        v-if="item.image" 
                        :src="item.image" 
                        :alt="item.name" 
                        class="menu-item-img" 
                      />
                    </div>

                    <div class="flex-grow-1">
                      <div
                        class="d-flex flex-column flex-sm-row align-items-sm-start justify-content-between gap-2 mb-2"
                      >
                        <h3 class="h5 fw-bold mb-0">
                          {{ item.name }}
                        </h3>

                        <span class="badge price-badge">
                          {{ formatPrice(item.price) }}
                        </span>
                      </div>

                      <p class="card-text text-secondary">
                        {{ item.description }}
                      </p>

                      <div class="d-flex flex-wrap gap-2 mb-3">
                        <span class="badge category-badge">
                          {{ item.category }}
                        </span>

                        <span
                          v-for="tag in item.dietaryTags"
                          :key="`${item.id}-${tag}`"
                          class="badge dietary-badge"
                        >
                          {{ tag }}
                        </span>
                      </div>

                      <button
                        v-if="item.available"
                        class="btn btn-outline-greenbite btn-sm"
                        type="button"
                        @click="requestItem(item)"
                      >
                        Request this item
                      </button>

                      <button
                        v-else
                        class="btn btn-secondary btn-sm"
                        type="button"
                        disabled
                      >
                        Currently unavailable
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section
        v-show="page === 'request'"
        class="row g-4 align-items-start"
      >
        <div class="col-12 col-lg-8">
          <div class="card page-card shadow-sm border-0">
            <div class="card-body p-4 p-lg-5">
              <span class="badge greenbite-label mb-3">
                Customer order or enquiry
              </span>

              <h2 class="display-6 fw-bold">
                Contact {{ siteDetails.businessName }}
              </h2>

              <p class="text-secondary">
                The form is visible, but it does not currently
                save data or update Staff View.
              </p>

              <form
                class="row g-3 mt-2"
                @submit.prevent
              >
                <div class="col-12 col-md-6">
                  <label
                    for="requestType"
                    class="form-label fw-bold"
                  >
                    Request type
                  </label>

                  <select
                    id="requestType"
                    v-model="requestType"
                    class="form-select"
                    required
                  >
                    <option value="">
                      Select a request type
                    </option>

                    <option>Collection order</option>
                    <option>General enquiry</option>
                  </select>
                </div>

                <div class="col-12 col-md-6">
                  <label
                    for="customerName"
                    class="form-label fw-bold"
                  >
                    Your name
                  </label>

                  <input
                    id="customerName"
                    v-model="customerName"
                    class="form-control"
                    type="text"
                    placeholder="For example, Luis"
                    required
                  >
                </div>

                <div class="col-12">
                  <label
                    for="customerContact"
                    class="form-label fw-bold"
                  >
                    Email or phone
                  </label>

                  <input
                    id="customerContact"
                    v-model="customerContact"
                    class="form-control"
                    type="text"
                    placeholder="For example, user@email.com"
                    required
                  >
                </div>

                <div class="col-12 col-md-8">
                  <label
                    for="requestedItem"
                    class="form-label fw-bold"
                  >
                    Menu item
                  </label>

                  <select
                    id="requestedItem"
                    v-model="selectedMenuItemId"
                    class="form-select"
                    required
                  >
                    <option value="">
                      Select an item
                    </option>

                    <option
                      v-for="item in availableMenuItems"
                      :key="item.id"
                      :value="String(item.id)"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                </div>

                <div class="col-12 col-md-4">
                  <label
                    for="collectionTime"
                    class="form-label fw-bold"
                  >
                    Collection time
                  </label>

                  <input
                    id="collectionTime"
                    v-model="collectionTime"
                    class="form-control"
                    type="time"
                  >
                </div>

                <div class="col-12">
                  <label
                    for="customerMessage"
                    class="form-label fw-bold"
                  >
                    Dietary note, message or question
                  </label>

                  <textarea
                    id="customerMessage"
                    v-model="customerMessage"
                    class="form-control"
                    rows="4"
                    maxlength="300"
                    placeholder="Add a short message"
                  ></textarea>
                </div>

                <div class="col-12">
                  <button
                    class="btn btn-greenbite"
                    type="submit"
                    @click.prevent="orderItem"
                  >
                    Submit request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-4">
          <aside class="card confirmation-card shadow-sm border-0">
            <div class="card-body p-4">
              <h3 class="h5 fw-bold">
                Confirmation preview
              </h3>

              <p class="text-secondary">
                A later exercise will display a dynamic confirmation here.
              </p>

              <div
                class="alert alert-warning mb-5"
                role="alert"
              >
                This form does not yet add requests to Staff View.
              </div>

              <img :src="ordersImage" alt="Orders image" class="bistro-img" />

            </div>
          </aside>
        </div>
      </section>


      <section v-show="page === 'staff'">
        <div class="card page-card staff-page shadow-sm border-0">
          <div class="card-body p-4 p-lg-5">
            <span class="badge staff-label mb-3">
              Static staff request view
            </span>

            <h2 class="display-6 fw-bold">
              Customer orders and enquiries
            </h2>

            <p class="text-secondary">
              Live customer requests fetched from the server.
            </p>

            <div v-if="requests.length === 0" class="text-muted mt-3 mb-0">
              No requests or orders found.
            </div>

            <div v-else class="row g-4 mt-1">
              <div 
                v-for="request in requests" 
                :key="request.id" 
                class="col-12 col-lg-6"
              >
              <article class="card request-card h-100 shadow-sm">
                  <div class="card-body">
                    <div class="d-flex justify-content-between gap-3 mb-3">
                      <h3 class="h5 fw-bold mb-0">
                        {{ request.customerName || 'Anonymous' }}
                      </h3>
                    </div>

                    <p>
                      <strong>Reference:</strong> {{ request.id }}
                    </p>

                    <p>
                      <strong>Request type:</strong> {{ request.requestType || 'N/A' }}
                    </p>

                    <p>
                      <strong>Contact:</strong> {{ request.customerContact || 'N/A' }}
                    </p>

                    <p>
                      <strong>Item:</strong> {{ request.menuItemName || 'N/A' }}
                    </p>

                    <p>
                      <strong>Preferred time:</strong> {{ request.collectionTime || 'Not specified' }}
                    </p>

                    <p class="mb-0">
                      <strong>Message:</strong> {{ request.customerMessage || 'None' }}
                    </p>
                  </div>
                </article>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section v-show="page === 'network'">
        <div class="card page-card shadow-sm border-0">
          <div class="card-body p-4 p-lg-5">
            <span class="badge greenbite-label mb-3">
              Systems and networking
            </span>

            <h2 class="display-6 fw-bold">
              How the completed application operates
            </h2>

            <p class="text-secondary">
              Vue and Express run as separate applications
              on different ports.
            </p>

            <div class="row g-3 my-4">
              <div class="col-12 col-md-6 col-xl-3">
                <div class="card architecture-card h-100 text-center">
                  <div class="card-body">
                    <strong>Browser</strong>

                    <small class="d-block text-secondary mt-1">
                      Displays the interface
                    </small>
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-6 col-xl-3">
                <div class="card architecture-card h-100 text-center">
                  <div class="card-body">
                    <strong>Vue client</strong>

                    <small class="d-block text-secondary mt-1">
                      Vite, port 5173
                    </small>
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-6 col-xl-3">
                <div class="card architecture-card h-100 text-center">
                  <div class="card-body">
                    <strong>Express server</strong>

                    <small class="d-block text-secondary mt-1">
                      Node.js, port 3000
                    </small>
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-6 col-xl-3">
                <div class="card architecture-card h-100 text-center">
                  <div class="card-body">
                    <strong>JSON storage</strong>

                    <small class="d-block text-secondary mt-1">
                      Future data persistence
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <div class="row g-3">
              <div class="col-12 col-md-4">
                <div class="card note-card h-100">
                  <div class="card-body">
                    <h3 class="h5 fw-bold">
                      Current state
                    </h3>

                    <p class="text-secondary mb-0">
                      Vue loads menu information from Express.
                    </p>
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-4">
                <div class="card note-card h-100">
                  <div class="card-body">
                    <h3 class="h5 fw-bold">
                      Server data
                    </h3>

                    <p class="text-secondary mb-0">
                      Menu and featured-item data come from API routes.
                    </p>
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-4">
                <div class="card note-card h-100">
                  <div class="card-body">
                    <h3 class="h5 fw-bold">
                      Next step
                    </h3>

                    <p class="text-secondary mb-0">
                      Express can receive and persist customer requests.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>

</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import bistroImage from '@/assets/bistro.jpg'
import ordersImage from '@/assets/orders.jpg'


const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

const page = ref('home')

const siteDetails = ref(null)
const menuItems = ref([])
const featuredItem = ref(null)
const loadError = ref(null)

const searchTerm = ref('')
const selectedCategory = ref('')
const selectedDietaryTag = ref('')
const availableOnly = ref(false)
const requestType = ref('')
const customerName = ref('')
const selectedMenuItemId = ref('')
const customerContact = ref('')
const collectionTime = ref('')
const customerMessage = ref('')


const categories = computed(() => {
  return [
    ...new Set(
      menuItems.value
        .map((item) => item.category)
        .filter(Boolean)
    )
  ].sort()
})

const dietaryTags = computed(() => {
  return [
    ...new Set(
      menuItems.value.flatMap((item) => {
        return item.dietaryTags ?? []
      })
    )
  ].sort()
})

const filteredMenuItems = computed(() => {
  const normalisedSearch = searchTerm.value
    .trim()
    .toLowerCase()

  return menuItems.value.filter((item) => {
    const itemTags = item.dietaryTags ?? []

    const name = item.name?.toLowerCase() ?? ''
    const description =
      item.description?.toLowerCase() ?? ''
    const category =
      item.category?.toLowerCase() ?? ''

    const matchesSearch =
      normalisedSearch === '' ||
      name.includes(normalisedSearch) ||
      description.includes(normalisedSearch) ||
      category.includes(normalisedSearch) ||
      itemTags.some((tag) => {
        return tag
          .toLowerCase()
          .includes(normalisedSearch)
      })

    const matchesCategory =
      selectedCategory.value === '' ||
      item.category === selectedCategory.value

    const matchesDietaryTag =
      selectedDietaryTag.value === '' ||
      itemTags.includes(selectedDietaryTag.value)

    const matchesAvailability =
      !availableOnly.value ||
      item.available

    return (
      matchesSearch &&
      matchesCategory &&
      matchesDietaryTag &&
      matchesAvailability
    )
  })
})

const availableMenuItems = computed(() => {
  return menuItems.value.filter((item) => item.available)
})

function showPage(pageName) {
  page.value = pageName
  window.scrollTo(0, 0)
}

function requestItem(item) {
  selectedMenuItemId.value = String(item.id)
  showPage('request')
}

function orderItem() {
  if (!selectedMenuItemId.value) {
    alert('Please select a menu item first')
    return
  }

  const orderData = {
    requestType: requestType.value,
    customerName: customerName.value,
    menuItemId: Number(selectedMenuItemId.value),
    customerContact: customerContact.value,
    collectionTime: collectionTime.value,
    customerMessage: customerMessage.value
  }

  fetch('http://localhost:3000/api/requests', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderData)
  })
    .then((response) => response.json())
    .then((data) => {
      alert('Request submitted successfully!')
      
      // Clear form inputs
      requestType.value = ''
      customerName.value = ''
      selectedMenuItemId.value = ''
      customerContact.value = ''
      collectionTime.value = ''
      customerMessage.value = ''
    })
    .catch((error) => {
      console.error('Error submitting request:', error)
    })
}

function clearFilters() {
  searchTerm.value = ''
  selectedCategory.value = ''
  selectedDietaryTag.value = ''
  availableOnly.value = false
}

function formatPrice(value) {
  return `£${Number(value).toFixed(2)}`
}

async function loadApplicationData() {
  loadError.value = null

  try {
    const [
      siteResponse,
      menuResponse,
      featuredResponse
    ] = await Promise.all([
      fetch(`${API_BASE_URL}/api/site-details`),
      fetch(`${API_BASE_URL}/api/menu`),
      fetch(`${API_BASE_URL}/api/featured-item`)
    ])

    if (
      !siteResponse.ok ||
      !menuResponse.ok ||
      !featuredResponse.ok
    ) {
      throw new Error(
        'The application data could not be loaded'
      )
    }

    const [
      siteData,
      menuData,
      featuredData
    ] = await Promise.all([
      siteResponse.json(),
      menuResponse.json(),
      featuredResponse.json()
    ])

    siteDetails.value = siteData
    menuItems.value = menuData
    featuredItem.value = featuredData
  } catch (error) {
    console.error(
      'Unable to load application data:',
      error
    )

    loadError.value =
      'Something went wrong loading the site. Please check the server is running and try again.'
  }
}

onMounted(() => {
  loadApplicationData()
})
</script>