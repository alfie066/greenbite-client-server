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
                :class="{ active: page === 'create' }"
                :aria-current="page === 'create' ? 'page' : undefined"
                @click="showPage('create')"
              >
                Create Sandwich
              </button>

              <button
              type="button"
              class="nav-link nav-button"
              :class="{ 
                active: page === 'request',
                'basket-glow': isBasketAnimating 
              }"
              :aria-current="page === 'request' ? 'page' : undefined"
              @click="showPage('request')"
            >
              Basket and Order
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

    <div class="container-fluid px-3 px-lg-5 py-3 py-lg-4" style="max-width: 1600px; margin: 0 auto;">
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
          <img :src="bistroImage" alt="Aston Bistro Interior" class="bistro-img img-fluid w-100 mb-3" />

          <article v-if="featuredItem" class="card featured-card text-center">
            <span class="featured-ribbon">
              Chef's pick
            </span>

            <div class="card-body p-4 p-xl-5">
              <div class="featured-plate mx-auto mb-4" aria-hidden="true">
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
                @click="addToBasket(featuredItem)"
              >
                Add to basket
              </button>
            </div>
          </article>
        </div>
      </section>
    </div>


      <section v-show="page === 'menu'" class="container my-0">
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
                        @click="addToBasket(item)"
                      >
                        Add to basket
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

      <section v-show="page === 'create'" class="container my-0">
        <div class="card page-card shadow-sm border-0">
          <div class="card-body p-4 p-lg-5">
            
            <h2 class="display-6 fw-bold mb-3">Create Your Sandwich</h2>
            <p class="text-secondary mb-4">Choose your fillings, sauces, and toppings</p>

            <form @submit.prevent>
              <div class="mb-3">
                <label for="customName" class="form-label fw-bold">Sandwich Name / Title</label>
                <input type="text" id="customName" v-model="customSandwich.name" class="form-control" placeholder="e.g. My Ultimate Sandwich">
              </div>

              <div class="row">
                <div class="col-12 col-md-6 mb-3">
                  <label for="breadType" class="form-label fw-bold">Bread Type</label>
                  <select id="breadType" v-model="customSandwich.bread" class="form-select">
                    <option value="">Select bread</option>
                    <option v-for="bread in availableOptions.breads" :key="bread.name" :value="bread.name">
                      {{ bread.name }} (+£{{ bread.price.toFixed(2) }})
                    </option>
                  </select>
                </div>

                <div class="col-12 col-md-6 mb-3">
                  <label for="cheeseType" class="form-label fw-bold">Cheese</label>
                  <select id="cheeseType" v-model="customSandwich.cheese" class="form-select">
                    <option value="">Select cheese</option>
                    <option v-for="cheese in availableOptions.cheeses" :key="cheese.name" :value="cheese.name">
                      {{ cheese.name }} (+£{{ cheese.price.toFixed(2) }})
                    </option>
                  </select>
                </div>
              </div>

              <label class="form-label fw-bold d-block mb-2">Toppings</label>
              <div class="row mb-3 px-2">
                <div class="col-6 col-md-4 form-check" v-for="topping in availableOptions.toppings" :key="topping.name">
                  <input class="form-check-input" type="checkbox" :value="topping.name" :id="'top-' + topping.name" v-model="customSandwich.toppings">
                  <label class="form-check-label" :for="'top-' + topping.name">
                    {{ topping.name }} (+£{{ topping.price.toFixed(2) }})
                  </label>
                </div>
              </div>

              <label class="form-label fw-bold d-block mb-2">Sauces</label>
              <div class="row mb-3 px-2">
                <div class="col-6 col-md-4 form-check" v-for="sauce in availableOptions.sauces" :key="sauce.name">
                  <input class="form-check-input" type="checkbox" :value="sauce.name" :id="'sauce-' + sauce.name" v-model="customSandwich.sauces">
                  <label class="form-check-label" :for="'sauce-' + sauce.name">
                    {{ sauce.name }} (+£{{ sauce.price.toFixed(2) }})
                  </label>
                </div>
              </div>

              <div class="mb-4">
                <label for="extraNotes" class="form-label fw-bold">Special Instructions</label>
                <textarea id="extraNotes" v-model="customSandwich.extraNotes" class="form-control" rows="2" placeholder="e.g. Toasted, extra napkins"></textarea>
              </div>

              <div class="alert alert-light border d-flex justify-content-between align-items-center mb-3">
                <span class="fw-bold text-secondary">Calculated Total:</span>
                <span class="fs-4 fw-bold text-success">£{{ calculatedPrice.toFixed(2) }}</span>
              </div>

              <button type="button" class="btn btn-greenbite btn-lg w-100" @click="addCustomSandwichToBasket">
                Add custom sub to basket (£{{ calculatedPrice.toFixed(2) }})
              </button>
            </form>

          </div>
        </div>
      </section>


      <div class="container" v-show="page === 'request'">
  <section class="row g-4 align-items-start">
    
    <div class="col-12 col-lg-7">
      <div class="card page-card shadow-sm border-0">
        <div class="card-body p-4 p-lg-5">
          <span class="badge greenbite-label mb-3">Customer order</span>
          <h2 class="display-6 fw-bold">Contact {{ siteDetails.businessName }}</h2>

          <form class="row g-3 mt-2" @submit.prevent="orderBasket">
            <div class="col-12 col-md-6">
              <label for="requestType" class="form-label fw-bold">
                Request type
              </label>
              <select
                id="requestType"
                v-model="requestType"
                class="form-select"
                required
              >
                <option value="">Select a request type</option>
                <option>Collection order</option>
                <option>General enquiry</option>
              </select>
            </div>

            <div class="col-12 col-md-6">
              <label for="customerName" class="form-label fw-bold">
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

            <div class="col-8">
              <label for="customerEmail" class="form-label fw-bold">
                Email
              </label>
              <input
                id="customerEmail"
                v-model="customerEmail"
                class="form-control"
                type="text"
                placeholder="For example, user@email.com"
                required
              >
            </div>

            <div class="col-12 col-md-4">
              <label for="collectionTime" class="form-label fw-bold">
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
              <label for="customerMessage" class="form-label fw-bold">
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
              <button class="btn btn-greenbite" type="submit">
                Submit request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="col-12 col-lg-5">
      <div class="d-flex flex-column gap-4">
        
        <aside class="card confirmation-card shadow-sm border-0">
          <div class="card page-card shadow-sm border-0 p-4">
            <h4 class="fw-bold mb-3">Your Basket</h4>

            <div v-if="basket.length === 0" class="text-secondary">
              Your basket is empty.
            </div>

            <div v-else>
              <div v-for="(item, index) in basket" :key="index" class="card mb-3 p-3 border-0 bg-light">
                <div class="d-flex justify-content-between align-items-center">
                  
                  <div v-if="item.isCustom">
                    <h6 class="fw-bold mb-1"> {{ item.name }} (Custom Sandwich)</h6>
                    <small class="text-secondary d-block">
                      Bread: {{ item.bread }} | Cheese: {{ item.cheese }}
                    </small>
                    <small class="text-secondary d-block" v-if="item.toppings && item.toppings.length">
                      Toppings: {{ item.toppings.join(', ') }}
                    </small>
                    <small class="text-secondary d-block" v-if="item.sauces && item.sauces.length">
                      Sauces: {{ item.sauces.join(', ') }}
                    </small>
                    <small class="text-secondary d-block" v-if="item.extraNotes">
                      Note: {{ item.extraNotes }}
                    </small>
                    <span class="text-dark fw-bold">£{{ (item.price).toFixed(2) }} x {{ item.quantity }} = £{{ (item.price * item.quantity).toFixed(2) }}</span>                  </div>

                  <div v-else>
                    <h6 class="fw-bold mb-1">{{ getMenuItem(item.id).name }}</h6>
                    <small class="text-secondary">
                      £{{ getMenuItem(item.id).price.toFixed(2) }} x {{item.quantity}} = £{{ (getMenuItem(item.id).price * item.quantity).toFixed(2) }}
                    </small>
                  </div>

                  <div class="d-flex align-items-center gap-2">
                    <button class="btn btn-sm btn-outline-secondary" @click="decreaseQuantity(index)">-</button>
                    <span class="fw-bold px-2">{{ item.quantity }}</span>
                    <button class="btn btn-sm btn-outline-secondary" @click="increaseQuantity(index)">+</button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </div>

      <div class="col-12 col-lg-5 mb-4">
        <aside class="card confirmation-card shadow-sm border-0">
          <div class="card-body p-4">
            <h3 class="h5 fw-bold">Confirmation preview</h3>
            <p class="text-secondary">
              A later exercise will display a dynamic confirmation here.
            </p>
            <img :src="ordersImage" alt="Orders image" class="bistro-img mt-4" />
          </div>
        </aside>
      </div>

  </section>
</div>


      <section v-show="page === 'staff'" class="container my-0">
  <div class="card page-card staff-page shadow-sm border-0">
    <div class="card-body p-4 p-lg-5">
      <span class="badge staff-label mb-3">
        Staff request view
      </span>

      <h2 class="display-6 fw-bold">
        Customer orders and enquiries
      </h2>

      <p class="text-secondary">
        Live customer requests fetched from the server.
      </p>

      <p v-if="requests.length === 0" class="text-muted mt-3 mb-0">
        No requests or orders found.
      </p>

      <div v-else class="row g-4 mt-1">
        <div 
          v-for="request in requests" 
          :key="request.id" 
          class="col-12 col-lg-6"
        >
          <article class="card request-card h-100 shadow-sm border">
            <div class="card-body d-flex flex-column">
              
              <div class="d-flex justify-content-between align-items-center gap-3 mb-3 pb-2 border-bottom">
                <h3 class="h5 fw-bold mb-0 text-dark">
                  {{ request.customerName || 'Anonymous' }}
                </h3>
                <span class="badge bg-light text-secondary border font-monospace">
                  Ref: #{{ request.id }}
                </span>
              </div>

              <div class="mb-3 small text-secondary">
                <div class="mb-1"><strong>Request Type:</strong> {{ request.requestType || 'N/A' }}</div>
                <div class="mb-1"><strong>Email:</strong> {{ request.customerEmail || 'N/A' }}</div>
                <div class="mb-1"><strong>Preferred Time:</strong> {{ request.collectionTime || 'Not specified' }}</div>
              </div>

              <div class="mb-3 flex-grow-1">
                <strong class="text-dark d-block mb-2">Items Ordered:</strong>
                
                <div v-if="!request.basket || request.basket.length === 0" class="text-muted small fst-italic">
                  No items in basket for this request.
                </div>

                <div v-else class="d-flex flex-column gap-2">
                  <div 
                    v-for="(item, idx) in request.basket" 
                    :key="idx" 
                    class="p-2.5 bg-light rounded-2 border"
                  >
                    
                    <div v-if="item.isCustom">
                      <div class="d-flex justify-content-between align-items-start">
                        <span class="fw-bold text-dark">
                          {{ item.name }} 
                          <span class="badge bg-dark text-white ms-1" style="font-size: 0.65rem;">Custom Sandwich</span>
                        </span>
                        <span class="fw-bold text-dark">
                          £{{ ((item.price || 0) * (item.quantity || 1)).toFixed(2) }}
                        </span>
                      </div>
                      <div class="small text-secondary mt-1">
                        <div><strong>Bread:</strong> {{ item.bread }} | <strong>Cheese:</strong> {{ item.cheese }}</div>
                        <div v-if="item.toppings && item.toppings.length"><strong>Toppings:</strong> {{ item.toppings.join(', ') }}</div>
                        <div v-if="item.sauces && item.sauces.length"><strong>Sauces:</strong> {{ item.sauces.join(', ') }}</div>
                        <div v-if="item.extraNotes"><strong>Note:</strong> {{ item.extraNotes }}</div>
                      </div>
                      <div class="small text-muted mt-1">
                        Qty: {{ item.quantity }} (£{{ (item.price || 0).toFixed(2) }} each)
                      </div>
                    </div>

                    <div v-else class="d-flex justify-content-between align-items-center">
                      <div>
                        <span class="fw-bold text-dark">
                          {{ getMenuItem(item.id).name }}
                        </span>
                        <div class="small text-muted">
                          £{{ (getMenuItem(item.id).price || 0).toFixed(2) }} each
                        </div>
                      </div>
                      <div class="text-end">
                        <span class="fw-bold text-dark">
                          £{{ (((getMenuItem(item.id).price || 0)) * (item.quantity || 1)).toFixed(2) }}
                        </span>
                        <div class="small text-muted">Qty: {{ item.quantity }}</div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              <div class="mt-auto pt-2 border-top small">
                <strong>Message: </strong> 
                <span class="text-secondary">{{ request.customerMessage || 'None' }}</span>
              </div>

            </div>
          </article>
        </div>
      </div>

    </div>
  </div>
</section>

      <section v-show="page === 'network'" class="container my-0">
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
  </div>

</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import bistroImage from '@/assets/bistro.jpg'
import ordersImage from '@/assets/orders.jpg'


const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? ''

const page = ref('home')

const siteDetails = ref(null)
const menuItems = ref([])
const featuredItem = ref(null)
const loadError = ref(null)

const requests = ref([])
const basket = ref([])

const searchTerm = ref('')
const selectedCategory = ref('')
const selectedDietaryTag = ref('')
const availableOnly = ref(false)
const requestType = ref('')
const customerName = ref('')
const selectedMenuItemId = ref('')
const customerEmail = ref('')
const collectionTime = ref('')
const customerMessage = ref('')
const isBasketAnimating = ref(false)
let glowTimeout = null

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

const calculatedPrice = computed(() => {
  let total = 0

  const selectedBread = availableOptions.value.breads.find(b => b.name === customSandwich.value.bread)
  if (selectedBread) total += selectedBread.price

  const selectedCheese = availableOptions.value.cheeses.find(c => c.name === customSandwich.value.cheese)
  if (selectedCheese) total += selectedCheese.price

  customSandwich.value.toppings.forEach(toppingName => {
    const found = availableOptions.value.toppings.find(t => t.name === toppingName)
    if (found) total += found.price
  })

  customSandwich.value.sauces.forEach(sauceName => {
    const found = availableOptions.value.sauces.find(s => s.name === sauceName)
    if (found) total += found.price
  })

  return Number(total.toFixed(2))
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

function getMenuItem(id) { //hi this is alfie, this is a helper method for me to get item info in basket
  return menuItems.value.find(item => item.id === id) || { name: 'Item #' + id, price: 0 }
}

const availableMenuItems = computed(() => {
  return menuItems.value.filter((item) => item.available)
})

function showPage(pageName) {
  page.value = pageName
    if (page.value === 'staff') {
      fetchRequests()
    }

    if (page.value === 'request' || page.value === 'menu' || page.value === 'create') {
      loadMenuData()
    }

    if (page.value === 'create') {
      fetchSandwichOptions()
    }

  window.scrollTo(0, 0)
}
const customSandwich = ref({
  name: '',
  bread: '',
  cheese: '',
  toppings: [],
  sauces: [],
  extraNotes: ''
})

function addToBasket(item) {
  const existing = basket.value.find(i => i.id === item.id && !i.isCustom)
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1
  } else {
    basket.value.push({
      id: item.id,
      quantity: 1
    })
  }

  triggerGlow()
}

function addCustomSandwichToBasket() {
  if (!customSandwich.value.name.trim()) {
    alert('Please give your custom sandwich a name!')
    return
  }

  const newCustomItem = {
    isCustom: true,
    name: customSandwich.value.name,
    bread: customSandwich.value.bread || 'Standard',
    cheese: customSandwich.value.cheese || 'None',
    toppings: customSandwich.value.toppings || [],
    sauces: customSandwich.value.sauces || [],
    extraNotes: customSandwich.value.extraNotes || '',
    price: calculatedPrice.value,
    quantity: 1
  }

  basket.value.push(newCustomItem)

  customSandwich.value = {
    name: '',
    bread: '',
    cheese: '',
    toppings: [],
    sauces: [],
    extraNotes: ''
  }

  alert('Custom sandwich added to basket!')
  triggerGlow()
}

function decreaseQuantity(index) {
  if (basket.value[index].quantity > 1) {
    basket.value[index].quantity -= 1
  } else {
    basket.value.splice(index, 1)
  }
}

function increaseQuantity(index) {
  basket.value[index].quantity += 1
}

function triggerGlow() {
  if (glowTimeout) clearTimeout(glowTimeout)
  isBasketAnimating.value = false
  setTimeout(() => {
    isBasketAnimating.value = true
  }, 10)
  glowTimeout = setTimeout(() => {
    isBasketAnimating.value = false
  }, 700)
}

function removeFromBasket(index) {
  if (basket.value[index].quantity > 1) {
    basket.value[index].quantity -= 1
  } else {
    basket.value.splice(index, 1)
  }
}

function orderBasket() {
  if (basket.value.length === 0) {
    alert('Your basket is empty. Please add items before ordering.')
    return
  }

  if (!requestType.value || !customerName.value || !customerEmail.value) {
    alert('Please fill out all required form fields correctly in order to checkout your basket.')
    return
  }

  if (!collectionTime.value) {
    alert('Please select a collection time.')
    return
  }

  const orderData = {
    customerName: customerName.value,
    customerEmail: customerEmail.value,
    requestType: requestType.value,
    customerMessage: customerMessage.value || '',
    basket: basket.value,
    collectionTime: collectionTime.value
  }

  fetch('/api/requests', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  })
    .then((response) => {
      if (!response.ok) throw new Error('Failed to save request')
      return response.json()
    })
    .then((data) => {
      alert('Order submitted successfully!')
      requestType.value = ''
      customerName.value = ''
      customerEmail.value = ''
      collectionTime.value = ''
      customerMessage.value = ''
      basket.value = []
      
      fetchRequests()
    })
    .catch((error) => {
      console.error('Error submitting request:', error)
    })
}

function fetchRequests() {
  fetch('/api/requests')
    .then((response) => response.json())
    .then((data) => {
      requests.value = data
    })
    .catch((error) => {
      console.error('Error fetching requests:', error)
    })
}

const availableOptions = ref({
  breads: [],
  cheeses: [],
  toppings: [],
  sauces: []
})

function fetchSandwichOptions() {
  fetch('/api/sandwich-options')
    .then(response => response.json())
    .then(data => {
      availableOptions.value = data
    })
    .catch(error => console.error('Error fetching sandwich options:', error))
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

async function loadInitialData() {
  loadError.value = null
  try {
    const [siteRes, featuredRes] = await Promise.all([
      fetch(`${API_BASE_URL}/api/site-details`),
      fetch(`${API_BASE_URL}/api/featured-item`)
    ])

    if (!siteRes.ok || !featuredRes.ok) {
      throw new Error('Failed to load site details')
    }

    siteDetails.value = await siteRes.json()
    featuredItem.value = await featuredRes.json()
  } catch (error) {
    console.error('Unable to load initial data:', error)
    loadError.value = 'Something went wrong loading the site.'
  }
}

async function loadMenuData() {
  if (menuItems.value.length > 0) return

  try {
    const response = await fetch(`${API_BASE_URL}/api/menu`)
    if (!response.ok) {
      throw new Error('Failed to load menu')
    }
    menuItems.value = await response.json()
  } catch (error) {
    console.error('Unable to load menu:', error)
    loadError.value = 'Could not load the menu items.'
  }
}

onMounted(() => {
  loadInitialData()
})
</script>