
<template>
  <q-page class="bg-image flex flex-center column" text-h1>
    <div class="q-pa-md q-gutter-sm">
    <q-banner rounded class="bg-purple-8 text-white absolute-top text-center">
      Admin page

    </q-banner>
  </div>
    <q-banner rounded class="bg-purple-8 text-white absolute-bottom text-center">
      {{date}}

    </q-banner>
  </q-page>

</template>

<script setup>
const date = new Date();
const admin = JSON.parse(localStorage.getItem('admin'));



defineOptions({
  name: 'adminPage'
});
</script>

<style scoped>
.bg-image {
  background: url('https://cdn.pixabay.com/photo/2017/01/18/17/52/calendar-1990453_1280.jpg') no-repeat center center;
  background-size: cover;
  height: 100vh;
  opacity: 0.7;
}

</style>
