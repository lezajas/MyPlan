<template>
  <div class="q-pa-md" style="max-width: 800px">
    <q-form class="q-gutter-md">



      <q-card class="q-pa-md q-mb-md">
  <q-input
    filled
    v-model="ime"
    label="Novo Ime korisnika *"
    hint="Upišite si novo željeno ime"
    lazy-rules
    :rules="[ val => val && val.length > 0 || 'Unos je potreban!']"
  />
  <q-separator size="3px" spaced="md" />
  <q-btn label="Promjeni ime" type="promjenaImena" color="primary" @click="promjeniIme" />
</q-card>

<q-card class="q-pa-md">
  <q-input filled
    type="email"
    v-model="email"
    label="Novi Email *"
    hint="Upišite vaš novi email"
    lazy-rules
    :rules="[ val => val && val.length > 0 || 'Unos je potreban!']"
  />
  <q-separator size="3px" spaced="md" />
  <q-btn label="Promjeni email" type="promjenaEmaila" color="primary" @click="promjeniEmail" />
</q-card>


<q-card class="q-pa-md">
      <q-input filled
        type="password"
        v-model="staralozinka"
        label="Stara Lozinka *"
        hint="Upišite vašu staru lozinku"
      />
      <q-input filled
        type="password"
        v-model="lozinka"
        label="Nova Lozinka *"
        hint="Upišite vašu novu lozinku"
      />
      <q-separator size="3px" spaced="md" />
        <q-btn label="Promjeni lozinku" type="promjenaLozinke" color="primary" @click="promjeniLozinku"/>
      </q-card>
    </q-form>
  </div>

  <q-dialog v-model="prikaziPopup">
      <q-card class="q-pa-md">
        <q-card-section class="row items-center">
          <q-icon name="warning" color="red" size="24px" class="q-mr-sm" />
          <span>Uneseno polje nemože biti prazno!</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Uredu" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="uspijehPopup">
      <q-card class="q-pa-md">
        <q-card-section class="row items-center">
          <q-icon name="thumb_up" color="green" size="24px" class="q-mr-sm" />
          <span>Uspiješna promijena postavki.</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Uredu" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>


    <q-dialog v-model="staralozinkaPopup">
      <q-card class="q-pa-md">
        <q-card-section class="row items-center">
          <q-icon name="warning" color="red" size="24px" class="q-mr-sm" />
          <span>Stara unesena lozinka se ne podudara!</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Uredu" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const user = JSON.parse(localStorage.getItem('user'));
    const id = user.id_user;
    const trenutnalozinka = ref(user.user_password);
    const prikaziPopup = ref(false);
    const staralozinkaPopup = ref(false);
    const uspijehPopup = ref(false);
    const ime = ref('');
    const email = ref('');
    const lozinka = ref('');
    const staralozinka = ref('');

    const promjeniIme = async () => {
      if (!ime.value || ime.value.length === 0) {
        prikaziPopup.value = true; // Prikaži popup ako je prazno
        return;
      }
      const formData = {
        id: id,
        ime: ime.value,

      }
      await axios.post('http://localhost:3000/api/user_ime/', formData)
        .then(result => {
          uspijehPopup.value = true;
        })
        .catch(error => {
          console.error("Error loading users:", error);
        });
    };


    const promjeniEmail = async () => {
      if (!email.value || email.value.length === 0) {
        prikaziPopup.value = true; // Prikaži popup ako je prazno
        return;
      }
      const formData = {
        id: id,
        email: email.value,

      }
      await axios.post('http://localhost:3000/api/user_email/', formData)
        .then(result => {
          uspijehPopup.value = true;
        })
        .catch(error => {
          console.error("Error loading users:", error);
        });
    };

    const promjeniLozinku = async () => {
    if (staralozinka.value !== trenutnalozinka.value) {
    staralozinkaPopup.value = true; // Prikazuje poruku ako lozinka nije točna
    return;
      }

    else if(!lozinka.value || lozinka.value.length === 0){
        prikaziPopup.value = true; //provjerava da li je lozinka prazna ili ne
        return;
      }

    else {
      const formData = {
        id: id,
        lozinka: lozinka.value,

      }
      await axios.post('http://localhost:3000/api/user_lozinka/', formData)
        .then(result => {
        trenutnalozinka.value = lozinka.value;

        uspijehPopup.value = true;
        })
        .catch(error => {
          console.error("Error loading users:", error);
        });
    };
  }

    return {
      ime,
      email,
      lozinka,
      staralozinka,
      promjeniIme,
      promjeniEmail,
      promjeniLozinku,
      prikaziPopup,
      staralozinkaPopup,
      uspijehPopup,
    };
  },
};
</script>
