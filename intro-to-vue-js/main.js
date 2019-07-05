var product = "Socks";

var app = new Vue({
  el: "#app",
  data: {
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
        id: 1234,
        color: "#0000ff",
        colorName: "blue",
        image: "./assets/vmSocks-blue-onWhite.jpg",
        quantity: 10
      },
      {
        id: 12345,
        color: "#00ff00",
        colorName: "green",
        image: "./assets/vmSocks-green-onWhite.jpg",
        quantity: 20
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
    }
  }
});
