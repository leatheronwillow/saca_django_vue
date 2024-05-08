<template>
  <tr>
    <td>
      <router-link :to="item.product.get_absolute_url">
        {{ item.product.name }}
      </router-link>
    </td>
    <td>${{ item.product.price }}</td>
    <td>
      {{ item.quantity }}
      <a @click="decrementQuantity(item)">-</a>
      <a @click="incrementQuantity(item)">+</a>
    </td>
    <td>${{ getItemTotal(item).toFixed(2) }}</td>
    <td><button class="delete" @click="removeItem(item)"></button></td>
  </tr>
</template>

<script>
export default {
  name: "CartItem",
  props: {
    initialItem: Object,
  },
  data() {
    return {
      item: this.initialItem,
    };
  },
  methods: {
    getItemTotal(item) {
      return item.quantity * item.product.price;
    },
    incrementQuantity(item) {
      item.quantity += 1;

      this.updateCart();
    },
    decrementQuantity(item) {
      item.quantity -= 1;

      if (item.quantity === 0) {
        this.$emit("removeItem", item);
      }

      this.updateCart();
    },
    updateCart() {
      localStorage.setItem("cart", JSON.stringify(this.$store.state.cart));
    },
    removeItem(item) {
      this.$emit("removeItem", item);
    },
  },
};
</script>
