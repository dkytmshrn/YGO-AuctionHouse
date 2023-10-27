<template>
  <div>
    <Navbar />
    <div class="container card-section">
      <div class="row container home-card mx-auto">
        <Card v-for="post in allPost" :key="post.id" :post="post"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useIndexStore } from '../stores/index';

import Navbar from '../components/Navbar.vue';
import Card from '../components/Card.vue';

export default {
  name: "HomeView",
  components: { Navbar, Card },
  computed: {
    ...mapState(useIndexStore, ['allPost']),
  },
  methods: {
    ...mapActions(useIndexStore, ['showPost'])
  },
  created() {
    this.showPost();
  }
}
</script>

<style scoped>

.home-card {
  padding-top: 8%;
  padding-bottom: 8%;
}

</style>
