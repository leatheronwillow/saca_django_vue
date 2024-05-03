<template>
  <div class="shop">
    <h1 class="is-size-1 has-text-centered">SACA shop</h1>
  </div>

  <div class="columns is-multiline">
    <div class="column is-12">
      <h2 class="is-size-2 has-text-centered">Latest Products</h2>
    </div>
  </div>

  <ProductBox
    v-for="product in latestProducts"
    v-bind:key="product.id"
    v-bind:product="product"
  />
</template>

<script>
import axios from "axios";

import ProductBox from "@/components/ProductBox.vue";

export default {
  name: "ShopView",
  data() {
    return {
      latestProducts: [],
    };
  },
  components: {
    ProductBox,
  },
  mounted() {
    this.getLatestProducts();
  },
  methods: {
    getLatestProducts() {
      axios
        .get("/api/v1/latest-products/")
        .then((response) => {
          this.latestProducts = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
