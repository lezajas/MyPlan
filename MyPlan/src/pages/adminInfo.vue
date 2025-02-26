<template>
  <q-page padding>
  <div class="q-pa-md" style="max-width: 1000px">
    <q-list bordered separator>
      <q-item clickable v-ripple>
        <q-item-section>Vaše ime : {{ ime }}</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Vaš email : {{ email }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Vaš ID : {{ id }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
  </q-page>
</template>

<script>
const admin = JSON.parse(localStorage.getItem('admin'));
const ime = admin.user_ime;
const email = admin.user_email;
const id = admin.id_user;


export default {
  setup(){
    return {
  ime,
  email,
  id,
}
  }
}
</script>
