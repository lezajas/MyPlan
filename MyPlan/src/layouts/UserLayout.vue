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

          MyPlan - Dobrodošao {{ ime }} !
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

const sad = new Date();
const user = JSON.parse(localStorage.getItem('user'));
const ime = user.user_ime;


const onLogout = (e) => {
  e.preventDefault();

  setTimeout(() => {
    localStorage.removeItem('user'); // Briše korisničke podatke
    console.log("Korisnik je odjavljen.");
    router.replace('/'); // 🔄 Preusmjeravanje na početnu stranicu
  }, 300);
};

function onDelayedClick (e, go) {
      e.preventDefault() // mandatory; we choose when we navigate

      // console.log('triggering navigation in 2s')
      setTimeout(() => {
        // console.log('navigating as promised 2s ago')
        go()
      }, 300)
    }

defineOptions({
  name: 'UserLayout'
})

const linksList = [
  {
    title: 'Početna stranica',
    caption: 'Početna korisnička stranica',
    icon: 'home',
    link: '#/userPage'
  },
  {
    title: 'Informacije o korisniku',
    caption: 'Informacije o vašem računu.',
    icon: 'info',
    link: '#/userinfo'
  },
  {
  title: 'Postavke korisnika',
    caption: 'Izmjena korisničkih krendeciala',
    icon: 'info',
    link: '#/userPostavke'
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

</script>
