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
const user = JSON.parse(localStorage.getItem('user'));
const ime = user.user_ime;
const email = user.user_email;
const id = user.id_user;


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
