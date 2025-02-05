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
import { useRouter } from 'vue-router';

export default {
  setup () {

    const $q = useQuasar()
        const email = ref(null)
        const lozinka = ref(null)
        const popup = ref(false)
        const popupPoruka = ref('')
        const user=([])

        const router = useRouter();
        const login = async () => {
        const loginData = {
        email: email.value,
        password: lozinka.value,
        }
        await axios.post('http://localhost:3000/api/login/', loginData)
        .then(result => {
          if(result.data.user_admin == 1){
            const userData = { // spremanje u usedata ali ovdje je admin
            id_user: result.data.id_user,
            user_ime: result.data.user_ime,
            user_email: result.data.user_email,
            user_password: result.data.user_password,
            user_admin: result.data.user_admin,
          };
          popupPoruka.value =("Uspiješna prijava admina!");
          popup.value = true;
          localStorage.setItem('admin', JSON.stringify(userData));

          setTimeout(() => {
            popup.value = false; // Sakrij alert
            router.replace({ name: 'adminPage' });
          }, 1000);
          }
          else{
            const userData = { // spremanje u userdata ali ovdje nije admin
            id_user: result.data.id_user,
            user_ime: result.data.user_ime,
            user_email: result.data.user_email,
            user_password: result.data.user_password,
          };
            localStorage.setItem('user', JSON.stringify(userData));

            popupPoruka.value =("Uspiješna prijava!");
          popup.value = true;
          localStorage.setItem('user', JSON.stringify(userData));
          setTimeout(() => {
            popup.value = false; // Sakrij alert
            router.replace({ name: 'userPage' });
          }, 1000);
          }
        })
        .catch(error => {
          console.error("Error pokušavajući se loginati:", error);
        });
    }


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
