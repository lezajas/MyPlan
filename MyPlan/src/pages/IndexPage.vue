
<template>
  <q-page class="flex flex-center" text-h1>
    <div class="q-pa-md q-gutter-sm">
    <q-banner rounded class="bg-purple-8 text-h2 text-white absolute-top text-center">
      Organiziraj svoj dan, postigni više!

    </q-banner>
  </div>
    INDEX PAGE
    <q-banner rounded class="bg-purple-8 text-white absolute-bottom text-center">
      {{date}}

    </q-banner>
  </q-page>

</template>

<script setup>
const date = new Date();

defineOptions({
  name: 'IndexPage'
});
</script>
