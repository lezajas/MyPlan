<template>
  <q-page class="bg-image flex flex-center column">
    <q-banner rounded class="bg-purple-8 text-white absolute-top text-center">
      Dobrodošao {{ ime }}

    </q-banner>

  </q-page>
</template>

<script>
const user = JSON.parse(localStorage.getItem('user'));


const ime = user.user_ime;

export default {
  setup(){
    return {
  ime,
}
  }
}

</script>

<style scoped>
.bg-image {
  background: url('https://cdn.pixabay.com/photo/2016/11/29/09/32/concept-1868728_1280.jpg') no-repeat center center;
  background-size: cover;
  height: 100vh;
  opacity: 0.7;
}

</style>

