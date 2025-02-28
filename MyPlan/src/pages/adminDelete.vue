<template>
  <div class="q-pa-md">
    <q-card class="q-pa-md">
      <q-select
        v-model="selectedUser"
        :options="users"
        label="Odaberi korisnika za brisanje"
        option-label="user_ime"
        option-value="id_user"
        filled
        emit-value
        map-options
      />

      <q-separator spaced="md" />

      <q-btn
        label="Obriši korisnika"
        color="red"
        :disable="!selectedUser"
        @click="obrisiKorisnika"
      />

      <!-- Popup poruka nakon brisanja -->
      <q-dialog v-model="popupPoruka">
        <q-card class="q-pa-md">
          <q-card-section class="row items-center">
            <q-icon name="warning" color="red" size="24px" class="q-mr-sm" />
            <span>{{ poruka }}</span>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

    </q-card>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const users = ref([]); //svi useri
    const selectedUser = ref(null); // trenutno odabran user
    const popupPoruka = ref(false);
    const poruka = ref("");


    const ucitajUsere = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/');
        users.value = response.data;
      } catch (error) {
        console.error('Greška pri dohvaćanju korisnika:', error);
      }
    };

    const obrisiKorisnika = async () => {
      if (!selectedUser.value) return;

        await axios.delete(`http://localhost:3000/api/user/${selectedUser.value}`);
        poruka.value = "Korisnik uspješno obrisan!";
        popupPoruka.value = true;
        ucitajUsere();

    };

    onMounted(() => {
      ucitajUsere();
    });

    return {
      users,
      selectedUser,
      obrisiKorisnika,
      popupPoruka,
      poruka
    };
  }
};
</script>
