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
          id: 12345,
          value: "XXL"
        }
      ],
      cart: 0
    };
  },

  methods: {
    addToCart() {
      this.cart += 1;
      this.variants[this.selectedVariant].quantity -= 1;
    },
    removeFromCart() {
      if (this.cart > 0) {
        this.cart -= 1;
        this.variants[this.selectedVariant].quantity -= 1;
      } else {
        console.log("Cart is Already Empty");
      }
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

          <div class="cart">
            <p>Cart : {{ cart }}</p>
          </div>
        </div>
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
var app = new Vue({
  el: "#app",
  data: {
    premium: true
  }
});
