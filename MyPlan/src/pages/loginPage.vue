<template>
  <div class="q-pa-lg" style="max-width:500px">

    <q-form
      class="q-gutter-md"
    >

      <q-input filled
        type="email"
        v-model="email"
        label="Vaš email za prijavu *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Unos je potreban!']"
      />

      <q-input filled
        type="password"
        v-model="lozinka"
        label="Upišite si lozinku *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Unos je potreban!']"
      />

      <div>
        <q-btn label="Unesi" type="Unos" color="primary" @click="insertBooks"/>
      </div>
    </q-form>

  </div>
</template>
<script>

import { useQuasar } from 'quasar'
import { ref } from 'vue'
import axios from 'axios';


export default {
  setup () {

    const $q = useQuasar()
        const email = ref(null)
        const lozinka = ref(null)

        const insertBooks = async () => {
        const formData ={
        autor: email.value,
        opis: lozinka.value,
      }
        await axios.post('http://localhost:3000/api/unos_knjiga/', formData)
        .then(result => {
          console.log(result.data);
        })
        .catch(error => {
          console.error("Error loading books:", error);
        });
    }

    return {
      email,
      lozinka,
      insertBooks,


    }
  }
}
</script>
