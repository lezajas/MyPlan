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

          MyPlan - ADMIN
        </q-toolbar-title>

        <div class="q-pa-md q-gutter-sm">
          <q-btn  to="#/" @click="onLogout" color="purple-3" text-color="black" label="Log out." />
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
import { useRouter } from 'vue-router'
const router = useRouter();

const onLogout = (e) => {
  e.preventDefault();

  setTimeout(() => {
    localStorage.removeItem('admin'); // Briše korisničke podatke
    console.log("Admin je odjavljen.");
    router.replace('/'); // Preusmjeravanje na početnu stranicu
  }, 300);
};

defineOptions({
  name: 'AdminLayout'
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
    title: 'popis korisnika',
    caption: 'Korisne informacije o MyPlan-u.',
    icon: 'info',
    link: '#/allUsers'
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

</script>
