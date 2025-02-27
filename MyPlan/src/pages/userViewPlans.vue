<template>
  <q-page class="q-pa-md">
    <q-banner rounded class="bg-purple-8 text-white text-center q-mb-md">
      Dobrodošao, {{ userName }}! Ovo su tvoji zadaci:
    </q-banner>

    <q-table
      title="Popis zadataka"
      :rows="tasks"
      :columns="columns"
      row-key="ID_zadatka"
      bordered
      separator="horizontal"
      v-if="tasks.length > 0"
    >
      <template v-slot:body-cell-obavljen="props">
        <q-td :props="props">
          <q-toggle
            v-model="props.row.obavljen"
            @update:model-value="oznaciObavljen(props.row)"
          />
        </q-td>
      </template>

      <template v-slot:body-cell-akcija="props">
        <q-td :props="props">
          <q-btn color="red" icon="delete" @click="obrisiZadatak(props.row)" dense flat>
            <q-tooltip>Obriši zadatak</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>

    <q-banner v-else class="bg-red-2 text-black text-center q-mt-md">
      Nema dostupnih zadataka.
    </q-banner>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    const tasks = ref([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id_user || null;
    const userName = user?.user_ime || "Korisnik";

    const columns = [
      { name: "ime_zadatka", label: "Naziv", field: "ime_zadatka", align: "left" },
      { name: "datum_zadatka", label: "Datum", field: "datum_zadatka", align: "left" },
      { name: "vrijeme_zadatka", label: "Vrijeme", field: "vrijeme_zadatka", align: "left" },
      { name: "obavljen", label: "Obavljen", field: "obavljen", align: "center" },
      { name: "akcija", label: "Brisanje", align: "center" }
    ];

    const ucitajZadatke = async () => {
      if (!userId) return;
        const response = await axios.get(`http://localhost:3000/api/zadaci/${userId}`);
        tasks.value = response.data.map((task) => ({
          ...task,
          obavljen: task.obavljen === "da", // Pretvaranje "da"/"ne" u boolean
        }));
    };

    const oznaciObavljen = async (task) => {
        await axios.post(`http://localhost:3000/api/update_zadatak/${task.ID_zadatka}`);
        task.obavljen = !task.obavljen; // Odmah ažuriraj prikaz
    };

    const obrisiZadatak = async (task) => {
    const response = await axios.delete(`http://localhost:3000/api/delete_zadatak/${task.ID_zadataka}`);
};

    onMounted(() => {
      ucitajZadatke();
    });

    return {
      userName,
      tasks,
      columns,
      oznaciObavljen,
      obrisiZadatak,
    };
  },
};
</script>
