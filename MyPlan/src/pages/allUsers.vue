<template>
  <q-page padding>
    <div class="q-pa-md">

      <q-input
        filled
        v-model="searchQuery"
        label="Pretraži korisnika po imenu..."
        dense
        class="q-mb-md"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-table
        separator="horizontal"
        title="Popis korisnika"
        title-class="text-h4 text-bold text-red-9"
        :rows="filteredUsers"
        :columns="columns"
        row-key="id_user"
        table-class="text-black"
        table-style="border: 3px solid black;"
        table-header-style="height: 65px"
        table-header-class="bg-red-2"
        bordered
        flat
        square
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ props.row[col.field] }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import dayjs from 'dayjs';

const style1 = {
  fontSize: '18px'
};

const style2 = {
  fontSize: '24px'
};

const columns = [
  { name: 'id_user', label: 'ID', field: 'id_user', align: 'left', sortable: true, style: style1, headerStyle: style2 },
  { name: 'user_ime', label: 'Ime', field: 'user_ime', align: 'left', sortable: true, style: style1, headerStyle: style2 },
  { name: 'user_email', label: 'Email', field: 'user_email', align: 'left', style: style1, headerStyle: style2 },
  { name: 'user_password', label: 'Password', field: 'user_password', align: 'left', style: style1, headerStyle: style2 },
  { name: 'user_datumRod', label: 'Datum Rođenja', field: 'user_datumRod', align: 'left', style: style1, headerStyle: style2 }
];

export default {
  setup() {
    const users = ref([]);
    const searchQuery = ref("");

    // Funkcija za formatiranje datuma
    const formatirajDatum = (datum) => {
      return datum ? dayjs(datum).format('DD.MM.YYYY') : 'N/A';
    };

    const loadUsers = async () => {
      try {
        const result = await axios.get('http://localhost:3000/api/user/');
        users.value = result.data.map(user => ({
          ...user,
          user_datumRod: formatirajDatum(user.user_datumRod)
        }));
      } catch (error) {
        console.error('Greška pri učitavanju korisnika:', error);
      }
    };

    const filteredUsers = computed(() => {
      return users.value.filter(user =>
        user.user_ime.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    onMounted(() => {
      loadUsers();
    });

    return {
      columns,
      users,
      searchQuery,
      filteredUsers
    };
  }
};
</script>

<style scoped>
.tbl_opis {
  white-space: pre-wrap;
}
</style>
