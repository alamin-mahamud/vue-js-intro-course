var eventBus = new Vue();

Vue.component("product-tabs", {
  props: {
    reviews: {
      type: Array,
      required: true
    }
  },
  template: `
    <div class="productTabs">
      <div>
        <span class="tabs"
              :class="{activeTab: selectedTab == tab}"
              v-for="(tab, index) in tabs"
              :key="index"
              @click="selectedTab = tab">
            {{tab}}
        </span>
      </div>

      <div v-show="selectedTab === 'Reviews'"
          class="existingReviewTab">
        <h2>Product Reviews</h2>

        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul v-else>
            <li v-for="(review, index) in reviews" :key="index">
              <p>{{ review.name }}</p>
              <p>Rating:{{ review.rating }}</p>
              <p>{{ review.review }}</p>
              <p>{{ review.recommend }} </p>
            </li>
        </ul>
      </div>

      <div v-show="selectedTab === 'Make A Review'">
        <product-review-form></product-review-form>
      </div>

    </div>
  `,

  data() {
    return {
      tabs: ["Reviews", "Make A Review"],
      selectedTab: "Reviews"
    };
  }
});

Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true,
      default: false
    }
  },

  data() {
    return {
      styles: {
        styleObject1: { fontSize: "13px" }
      },
      brand: "VueRocks",
      product: "Socks",
      description: "A pair of warm, fuzzy socks",
      selectedVariant: 0,
      altText: "A Pair of Socks",
      link: "https://google.com",
      onSale: false,
      details: ["80% cotton", "20% pollyester", "Gender-Neutral"],
      variants: [
        {
          id: 12345,
          color: "#308952",
          colorName: "green",
          image: "./assets/vmSocks-green-onWhite.jpg",
          quantity: 20
        },
        {
          id: 1234,
          color: "#24344a",
          colorName: "blue",
          image: "./assets/vmSocks-blue-onWhite.jpg",
          quantity: 10
        }
      ],
      sizes: [
        {
          id: 1234,
          value: "XL"
        },
        {
          id: 1235,
          value: "XXL"
        }
      ],
      reviews: []
    };
  },

  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].id);
    },
    removeFromCart() {
      this.$emit("remove-from-cart", this.variants[this.selectedVariant].id);
    },
    changeVariantImage(idx) {
      this.selectedVariant = idx;
    }
  },

  computed: {
    title() {
      return this.brand + ": " + this.product;
    },
    getQuantity() {
      return this.variants[this.selectedVariant].quantity;
    },
    isInStock() {
      return this.getQuantity;
    },
    isCartEmpty() {
      return this.cart <= 0;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    shipping() {
      if (this.premium) {
        return "Free";
      } else {
        return "$2.99";
      }
    }
  },

  mounted() {
    eventBus.$on("review-submitted", productReview => {
      this.reviews.push(productReview);
    });
  },

  template: `
    <div class="product">
      <div class="product-image">
        <a :href="link"><img :src="image" :alt="altText"/></a>
      </div>

      <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="isInStock">In Stock - {{ getQuantity }}</p>
        <p v-else :class="{lineThrough: !isInStock}">Out of Stock</p>
        <p>Shipping Charge: {{shipping}}</p>
        <span v-if="onSale"> {{ title }} </span>

        <h2>Details</h2>
        <p>{{ description }}</p>
        <product-details :details="details"></product-details>

        <h2>Variants</h2>
        <div class="variantBox">
          <div
            v-for="(variant, index) in variants"
            :key="variant.id"
            class="color-box"
            :style="[styles.styleObject1, { backgroundColor: variant.color }]"
            @mouseover="changeVariantImage(index)"
          ></div>
        </div>

        <h2>Sizes</h2>
        <ul>
          <li v-for="size in sizes" :key="size.id">{{ size.value }}</li>
        </ul>

        <div class="variantBox">
          <button
            v-on:click="addToCart()"
            :disabled="!getQuantity"
            :class="{ disabledButton: !getQuantity }"
          >
            Add to cart
          </button>
          <button
            v-on:click="removeFromCart()"
            :disabled="isCartEmpty"
            :class="{disabledButton:isCartEmpty}"
          >
            Remove From cart
          </button>
        </div>
        
        <product-tabs :reviews="reviews"></product-tabs>
      </div>
    </div>
  `
});

Vue.component("product-details", {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
    <ul>
          <li v-for="d in details">{{ d }}</li>
    </ul>
  `
});

Vue.component("product-review-form", {
  template: `
  <div class="makeAReviewTab">
    <h2>Product Reviews</h2>
    <form class="review-form" @submit.prevent="onSubmit">  
      <p class="error" v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>

      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name">
      </p>
      
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>

      <p>Would you recommend this product?</p>
      <label>
        Yes
        <input type="radio" value="Yes" v-model="recommend"/>
      </label>
      <label>
        No
        <input type="radio" value="No" v-model="recommend"/>
      </label>
          
      <p>
        <input type="submit" value="Submit">  
      </p>    

    </form>
  </div>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommend: null,
      errors: []
    };
  },
  methods: {
    onSubmit() {
      this.errors = [];
      if (this.name && this.review && this.rating && this.recommend) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend
        };

        eventBus.$emit("review-submitted", productReview);
        this.name = null;
        this.review = null;
        this.rating = null;
        this.recommend = null;
      } else {
        if (!this.name) this.errors.push("Name required.");
        if (!this.review) this.errors.push("Review required.");
        if (!this.rating) this.errors.push("Rating required.");
        if (!this.recommend) this.errors.push("Recommendation required.");
      }
    }
  }
});

var app = new Vue({
  el: "#app",
  data: {
    premium: true,
    cart: []
  },
  methods: {
    addToCart(id) {
      const indexToBeUpdated = this.cart.findIndex(item => item.id === id);
      if (
        indexToBeUpdated === parseInt(indexToBeUpdated, 10) &&
        indexToBeUpdated !== -1
      ) {
        this.cart[indexToBeUpdated].totalCount += 1;
      } else {
        this.cart.push({
          id: id,
          totalCount: 1
        });
      }
    },
    removeFromCart(id) {
      const indexToBeUpdated = this.cart.findIndex(item => item.id === id);
      if (
        indexToBeUpdated === parseInt(indexToBeUpdated, 10) &&
        indexToBeUpdated !== -1
      ) {
        const totalCount = this.cart[indexToBeUpdated].totalCount;
        if (totalCount === parseInt(totalCount, 10) && totalCount > 1) {
          this.cart[indexToBeUpdated].totalCount -= 1;
        } else {
          this.cart = this.cart.filter(item => item.id !== id);
        }
      } else {
        console.log("Something went Wrong! Cart Item Dont exist?");
      }
    }
  }
});
