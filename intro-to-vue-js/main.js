var product = "Socks";

var app = new Vue({
  el: "#app",
  data: {
    styles: {
      styleObject1: { fontSize: "13px" }
    },
    product: "Socks",
    description: "A pair of warm, fuzzy socks",
    image: "./assets/vmSocks-green-onWhite.jpg",
    altText: "A Pair of Socks",
    link: "https://google.com",
    quantity: 10,
    onSale: false,
    details: ["80% cotton", "20% pollyester", "Gender-Neutral"],
    variants: [
      {
        variantID: 1234,
        variantColor: "#0000ff",
        variantColorName: "blue",
        variantImage: "./assets/vmSocks-blue-onWhite.jpg"
      },
      {
        variantID: 12345,
        variantColor: "#00ff00",
        variantColorName: "green",
        variantImage: "./assets/vmSocks-green-onWhite.jpg"
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
      this.quantity -= 1;
    },
    changeVariantImage(img) {
      this.image = img;
    },
    removeFromCart() {
      if (this.cart > 0) {
        this.cart -= 1;
        this.quantity += 1;
      } else {
        console.log("Cart is Already Empty");
      }
    },
    isInStock() {
      return this.quantity > 0;
    },
    isCartEmpty() {
      return this.cart <= 0;
    }
  }
});
