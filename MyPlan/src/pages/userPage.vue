<template>
  <q-page padding>
    <div>Dobrodošao {{ ime }}</div>

  </q-page>
</template>

<script>
const user = JSON.parse(localStorage.getItem('user'));

if (user) {
  console.log("Prijavljeni korisnik:", user);
} else {
  console.log("Nema prijavljenog korisnika.");
}
const ime = user.user_ime;

export default {
  setup(){
    return {
  ime,
}
  }
}

</script>
