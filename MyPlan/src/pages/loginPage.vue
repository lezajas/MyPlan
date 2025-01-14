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

    <q-dialog v-model="popup">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ popupPoruka }}</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" @click="ClosePopup" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>
<script>

import { ClosePopup, useQuasar } from 'quasar'
import { ref, onMounted } from 'vue';
import axios from 'axios';


export default {
  setup () {

    const $q = useQuasar()
        const email = ref(null)
        const lozinka = ref(null)
        const popup = ref(false)
        const popupPoruka = ref('')
        const user=([])

        const login = async () => {
        const loginData = {
        email: email.value,
        password: lozinka.value,
        }
        await axios.post('http://localhost:3000/api/login/', loginData)
        .then(results => {
          user.value = results.data[0];
          if(user.admin == 1){
          popupPoruka.value =(results.data);
          popup.value = true;
          }
          else{
            popupPoruka.value =(results.data);
          popup.value = true;
          }
        })
        .catch(error => {
          console.error("Error pokušavajući se loginati:", error);
        });
    }

    const ClosePopup = () => {
      popup.value = false;
      if(user.admin == 1){
      }
    };

    return {
      email,
      lozinka,
      popup,
      popupPoruka,
      ClosePopup,
      login,
      user,


    }
  }
}
</script>
