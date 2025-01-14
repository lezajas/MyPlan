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
        <q-btn label="Unesi" type="Unos" color="primary" @click="login"/>
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

        const login = async () => {
        const loginData = {
        email: email.value,
        password: lozinka.value,
        }
        await axios.post('http://localhost:3000/api/login/', loginData)
        .then(result => {
          console.log(result.data);
        })
        .catch(error => {
          console.error("Error pokušavajući se loginati:", error);
        });
    }

    return {
      email,
      lozinka,
      login,


    }
  }
}
</script>
