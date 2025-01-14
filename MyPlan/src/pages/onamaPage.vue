<template>
<div class="q-pa-md">
    <q-layout view="lHh lpr lFf" container style="height: 200px" class="shadow-2 rounded-borders">
      <q-header elevated>
        <q-toolbar>
          <q-avatar size="50px">
            <img src="/icons/logo1.png">
          </q-avatar>

          <q-toolbar-title class="text-center text-3" container style="height: 30px">Što je to MyPlan?</q-toolbar-title>


        </q-toolbar>
      </q-header>



      <q-page-container>
        <q-page class="q-pa-md">
          <div class="text-h5 text-center">
            Dobrodošli na myplan, aplikaciju koja pomaže korisnicima da organiziraju svoj dan, povećaju produktivnost i usmjere energiju na ostvarenje svojih ciljeva. Naša misija je pružiti jednostavan i intuitivan sustav koji olakšava planiranje i upravljanje zadacima.
          </div>


        </q-page>
      </q-page-container>
    </q-layout>
  </div>

  <div class="q-pa-md">
    <div class="q-gutter-md">
      <q-carousel
        v-model="slide"
        transition-prev="scale"
        transition-next="scale"
        swipeable
        animated
        control-color="white"
        navigation
        padding
        arrows
        height="500px"
        class="bg-primary text-white shadow-1 rounded-borders"
      >



        <q-carousel-slide name="pregled_planova" class="column no-wrap flex-center text-h5">
          <q-icon name="info" size="56px" />
          <div class="q-mt-md text-center">
            <div>Pregled vaših planova</div>
            {{ info }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="osobni_zadaci" class="column no-wrap flex-center text-h5">
          <q-icon name="check" size="56px" />
          <div class="q-mt-md text-center">
            <div>Osobni zadaci</div>
            {{ osobni_zadaci }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="svakodnevni_podsjednici" class="column no-wrap flex-center text-h5">
          <q-icon name="cached" size="56px" />
          <div class="q-mt-md text-center">
            <div>Svakodnevni podsjetnici</div>
            {{ svak }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="zadaci" class="column no-wrap flex-center text-h5">
          <q-icon name="menu" size="56px" />
          <div class="q-mt-md text-center">
            <div>Zadaci za svakog korisnika</div>
            {{ korisnik }}
            <div>-Trčanje</div>
            <div>-Učenje</div>
            <div>Ove zadatke prilagođavate svojim interesima i potrebama.</div>
          </div>
        </q-carousel-slide>
      </q-carousel>


    </div>
  </div>
</template>


<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      slide: ref('pregled_planova'),
      info: "Pratite svoje dnevne aktivnosti i dugoročne ciljeve kroz pregledan i vizualno privlačan app.",
      osobni_zadaci: "Kreirajte vlastite zadatke, postavite datume i vrijeme izvršenja, te budite sigurni da nećete zaboraviti što je važno.",
      svak:"Primajte podsjetnike za zadatke koje ste sami definirali i ostanite organizirani u svakodnevnim obavezama.",
      korisnik:"Svaki korisnik dobiva priliku uključiti se u unaprijed definirane svakodnevne zadatke poput: "


    }
  }
}
</script>
