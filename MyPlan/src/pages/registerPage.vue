<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form class="q-gutter-md">
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

      <!-- Popravljeni unos za datum -->
      <q-input
        filled
        v-model="datumRodPrikaz"
        label="Datum rođenja *"
        hint="Odaberite vaš datum rođenja."
        readonly
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="datumRod" @update:model-value="formatirajDatum">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>

        <q-dialog v-model="popupPoruka">
        <q-card class="q-pa-md">
          <q-card-section class="row items-center">
            <q-icon name="thumb_up" color="green" size="24px" class="q-mr-sm" />
            <span>{{ poruka }}</span>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      </q-input>

      <div>
        <q-btn label="Unesi" type="Unos" color="primary" @click="insertUser"/>
      </div>
    </q-form>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import dayjs from 'dayjs'; // Importamo dayjs za formatiranje datuma

export default {
  setup() {
    const ime = ref('');
    const email = ref('');
    const lozinka = ref('');
    const datumRod = ref(dayjs().format('YYYY-MM-DD')); // Početni datum
    const datumRodPrikaz = ref(dayjs(datumRod.value).format('DD.MM.YYYY')); // Format prikaza
    const popupPoruka = ref(false);
    const poruka = ref("");

    // Funkcija za formatiranje datuma nakon odabira
    const formatirajDatum = () => {
      datumRodPrikaz.value = dayjs(datumRod.value).format('DD.MM.YYYY');
    };

    const insertUser = async () => {
      const formData = {
        ime: ime.value,
        email: email.value,
        lozinka: lozinka.value,
        datumRod: datumRod.value, // Slanje datuma u formatu "YYYY-MM-DD"
      };

      await axios.post('http://localhost:3000/api/unos_user/', formData)
        .then(result => {
          poruka.value = "Korisnik uspješno registriran!";
          popupPoruka.value = true;
        })
        .catch(error => {
          console.error("Error loading users:", error);
        });
    };

    return {
      ime,
      email,
      lozinka,
      datumRod,
      datumRodPrikaz,
      formatirajDatum,
      insertUser,
      popupPoruka,
      poruka,
    };
  },
};
</script>
