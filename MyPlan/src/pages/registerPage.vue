<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="ime"
        label="Ime korisnika *"
        hint="Upišite si željeno ime"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Unos je potreban!']"
      />

      <q-input filled
        type="email"
        v-model="email"
        label="Email *"
        hint="Upišite vaš email"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Unos je potreban!']"
      />

      <q-input filled
        type="password"
        v-model="lozinka"
        label="Lozinka *"
        hint="Upišite vašu lozinku"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Unos je potreban!']"
      />

      <q-input filled v-model="datumRod" label="Datum rođenja. *" hint="Upišite vaš datum rođenja." mask="date" :rules="['date']">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="date">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

      <div>
        <q-btn label="Unesi" type="Unos" color="primary" @click="insertUser"/>
      </div>
    </q-form>



  </div>
</template>
<script >
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import axios from 'axios';


export default {
  setup () {

    const $q = useQuasar()
        const ime = ref(null)
        const email = ref(null)
        const lozinka = ref(null)
        const datumRod = ref(null)

        const insertUser = async () => {
        const formData ={
        ime: ime.value,
        email: email.value,
        lozinka: lozinka.value,
        datumRod: datumRod.value,
      }
        await axios.post('http://localhost:3000/api/unos_user/', formData)
        .then(result => {
          console.log(result.data);
        })
        .catch(error => {
          console.error("Error loading users:", error);
        });
    }

    return {
      datumRod: ref('2019/02/01'),
      ime,
      email,
      lozinka,
      insertUser,


    }
  }
}
</script>
