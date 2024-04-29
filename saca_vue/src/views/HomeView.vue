<template>
  <div class="home">
    <section class="hero is-medium is-dark mb-6">
      <div class="hero-body has-text-centred">
        <p class="title mb-6">South Asian Cricket Academy</p>
        <p class="subtitle">
          Home of the most exciting South Asian Talent in the country.
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
  mounted() {
    document.title = "Home | SACA";
  },
};
</script>
