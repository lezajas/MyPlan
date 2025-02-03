<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title text-h1>
          <q-avatar size="100px">
            <img src="/icons/logo1.png">
          </q-avatar>

          MyPlan - {{ sad }}
        </q-toolbar-title>




        <div class="q-pa-md q-gutter-sm">
          <q-btn  to="/login" @click="onDelayedClick" color="purple-3" text-color="black" label="Prijava" />
          <q-btn to="/register" @click="onDelayedClick" color="purple-12" text-color="black" label="Registracija" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>


        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const sad = new Date();

defineOptions({
  name: 'MainLayout'
})

const linksList = [
  {
    title: 'Početna stranica',
    caption: 'Početna stranica MyPlan-a',
    icon: 'home',
    link: '#/'
  },
  {
    title: 'O nama',
    caption: 'Korisne informacije o MyPlan-u.',
    icon: 'info',
    link: '#/onama'
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function onDelayedClick (e, go) {
      e.preventDefault() // mandatory; we choose when we navigate

      // console.log('triggering navigation in 2s')
      setTimeout(() => {
        // console.log('navigating as promised 2s ago')
        go()
      }, 300)
    }

</script>
