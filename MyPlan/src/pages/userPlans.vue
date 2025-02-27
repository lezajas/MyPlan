<template>
   <q-page class="flex flex-center">
    <div class="q-pa-md q-gutter-md" style="width: 900px">
      <q-banner rounded class="bg-purple-8 text-white absolute-top text-center">
      Dodaj novi zadatak.

    </q-banner>
    <q-form class="q-gutter-md">
      <q-input
        filled
        v-model="ime"
        label="Ime zadatka *"
        hint="Upišite ime zadataka"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Unos je potreban!']"

      />

      <!-- Popravljeni unos za datum -->
      <q-input
        filled
        v-model="datumPrikaz"
        label="Datum zadatka *"
        hint="Odabreite datum zadatka."
        readonly
      >

      <div class="col-12 col-md-6">
        <q-input
          filled
          v-model="vrijeme"
          label="Vrijeme zadataka*"
          hint="Odabreite vrijeme zadataka."
        >
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-time v-model="vrijeme" format24h>
                  <div class="row items-center justify-end q-pa-sm">
                    <q-btn v-close-popup label="Zatvori" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>

        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="datum" @update:model-value="formatirajDatum">
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
        <q-btn label="Unesi" type="Unos" color="primary" @click="insertZadatak"/>
      </div>
    </q-form>
  </div>
</q-page>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import dayjs from 'dayjs'; // Importamo dayjs za formatiranje datuma

export default {
  setup() {
    const user = JSON.parse(localStorage.getItem('user'));
    const id_user=user.id_user;
    const ime = ref('');
    const datum = ref(dayjs().format('YYYY-MM-DD')); // Početni datum
    const vrijeme = ref('');
    const datumPrikaz = ref(dayjs(datum.value).format('DD.MM.YYYY')); // Format prikaza
    const popupPoruka = ref(false);
    const poruka = ref("");
    const obavljen=("NE");

    // Funkcija za formatiranje datuma nakon odabira
    const formatirajDatum = () => {
      datumPrikaz.value = dayjs(datum.value).format('DD.MM.YYYY');
    };

    const insertZadatak = async () => {
      const formData = {
        ime: ime.value,
        datum: datumPrikaz.value, // Slanje datuma u formatu "YYYY-MM-DD"
        vrijeme: vrijeme.value,
        id_user: id_user,
        obavljen: obavljen,
      };

      await axios.post('http://localhost:3000/api/unos_zadataka/', formData)
        .then(result => {
          poruka.value = "Zadatak uspiješno unesen!";
          popupPoruka.value = true;
        })
        .catch(error => {
          console.error("Error učitavajući zadatake.", error);
        });
    };

    return {
      ime,
      datum,
      vrijeme,
      datumPrikaz,
      formatirajDatum,
      insertZadatak,
      popupPoruka,
      poruka,
    };
  },
};
</script>
