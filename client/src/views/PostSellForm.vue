<template>
    <div>
    <Navbar />
    <div class="section-form container">
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="cardName" class="mb-2">Card Name</label>
          <select id="cardName" v-model="form.name" class="form-control mb-4">
            <option
              v-for="card in card_data.data"
              :key="card.id"
              :value="card.name"
            >{{ card.name }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="price" class="mb-2">Price</label>
          <input
            type="number"
            id="price"
            v-model="form.price"
            class="form-control mb-4"
            placeholder="Enter price"
          />
        </div>
        <button type="submit" class="btn btn-primary button-submit">Submit</button>
      </form>
    </div>
  </div>
</template>
  
<script>
    import {mapActions, mapState} from "pinia"
    import {useIndexStore} from "../stores/index"
    import Navbar from '../components/Navbar.vue'

    export default {
    name : "PostSellForm",
    components: { Navbar },
    data() {
      return {
        form: {
          name: '',
          price: ''
        }
      };
    },
    computed: {
        ...mapState(useIndexStore, ['card_data']),
    },
    methods: {
        ...mapActions(useIndexStore,["fetchCardData", "postNewItem"]),

        submitForm() {
            this.postNewItem(this.form)
        }
    },
    created() {
        this.fetchCardData();
    }
    };
</script>
  
<style scoped>
.section-form {
    padding-top: 15%;
    padding-bottom: 8%;
}

.button-submit {
    width: 100%;
}
</style>
  