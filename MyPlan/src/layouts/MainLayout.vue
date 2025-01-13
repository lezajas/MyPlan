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

          MyPlan
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
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
import userPage from 'src/pages/userPage.vue';

defineOptions({
  name: 'MainLayout'
})

const linksList = [
  {
    title: 'UserPage',
    caption: 'test user page',
    link: '#/userPage'
  },
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
  },
  {
    title: 'Login',
    caption: 'Login za postojeće korisnike',
    icon: 'login',
    link: '#/login'
  },
  {
    title: 'Registracija',
    caption: 'Registracija za nove korisnike',
    icon: 'manage_accounts',
    link: '#/register'
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

</script>
