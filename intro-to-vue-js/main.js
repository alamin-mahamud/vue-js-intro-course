var product = "Socks";

var app = new Vue({
  el: "#app",
  data: {
    product: "Socks",
    description: "A pair of warm, fuzzy socks",
    image: "./assets/vmSocks-green-onWhite.jpg",
    altText: "A Pair of Socks",
    link: "https://google.com",
    quantity: 0,
    onSale: false,
    details: ["80% cotton", "20% pollyester", "Gender-Neutral"],
    variants: [
      {
        variantID: 1234,
        variantColor: "red"
      },
      {
        variantID: 12345,
        variantColor: "green"
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
    ]
  }
});
