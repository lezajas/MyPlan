<template>
  <q-page padding>
   <div>Ovo je admin page</div>
  </q-page>
</template>

<script>
const admin = JSON.parse(localStorage.getItem('admin'));

if (admin) {
  console.log("Prijavljeni korisnik:", admin);
} else {
  console.log("Nema prijavljenog korisnika.");
}
export default {
  // name: 'PageName',
}
</script>
