<template>
  <div id="search">
    <h1 class="title">Rechercher :</h1>
    <div class="search-panel">
      <vs-button @click="resetInputs()">Reset</vs-button>
      <vs-select v-model="sex" label="Sexe">
        <vs-option label="Homme" value="homme"> Homme </vs-option>
        <vs-option label="Femme" value="femme"> Femme </vs-option>
      </vs-select>

      <vs-input v-model="age" type="number" label="Age" />

      <vs-select v-model="classe" label="Classe">
        <vs-option label="Premiere Classe" value="1">
          Premiere Classe
        </vs-option>
        <vs-option label="Seconde Classe" value="2"> Seconde Classe </vs-option>
        <vs-option label="Classe Eco" value="3"> Classe Eco </vs-option>
      </vs-select>

      <vs-button @click="searchHandle()">Rechercher</vs-button>
    </div>

    <div class="search-results">
      <!-- Tab with searchresult -->
      <vs-table>
        <template #thead>
          <vs-tr>
            <vs-th> PassengerId </vs-th>
            <vs-th> Survivant ? </vs-th>
            <vs-th> Name </vs-th>
            <vs-th> Age </vs-th>
            <vs-th> Sexe </vs-th>
            <vs-th> SibSp </vs-th>
            <vs-th> Parch </vs-th>
            <vs-th> Ticket </vs-th>
            <vs-th> Fare </vs-th>
            <vs-th> Cabin </vs-th>
            <vs-th> Embarked </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr
            v-for="(passenger, i) in searchResult"
            :key="i"
            :data="passenger"
          >
            <vs-td> {{ passenger.PassengerId }} </vs-td>
            <vs-td> {{ passenger.Survived === 1 ? 'Oui' : 'Non' }} </vs-td>
            <vs-td> {{ passenger.Name }} </vs-td>
            <vs-td> {{ passenger.Age }} </vs-td>
            <vs-td> {{ passenger.Sexe }} </vs-td>
            <vs-td> {{ passenger.SibSp }} </vs-td>
            <vs-td> {{ passenger.Parch }} </vs-td>
            <vs-td> {{ passenger.Ticket }} </vs-td>
            <vs-td> {{ passenger.Fare }} </vs-td>
            <vs-td> {{ passenger.Cabin }} </vs-td>
            <vs-td> {{ passenger.Embarked }} </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
    <!-- Tableau avec les différentes valeurs des passager dans le computed -->
  </div>
</template>

<script>
export default {
  name: 'SearchPage',
  layout: 'LandingLayout',

  data() {
    return {
      sex: 'homme',
      age: 40,
      classe: 1,
    }
  },
  computed: {
    passengers() {
      return this.$store.state.passengers
    },
    searchResult() {
      return this.$store.state.searchResult
    },
  },
  created() {
    this.getPassengers()
  },
  methods: {
    getPassengers() {
      this.$store.dispatch('GET_ALL_PASSENGERS')
    },
    searchHandle() {
      this.$store.dispatch('GET_SEARCH_PASSENGERS', {
        age: this.age,
        sex: this.sex === 'homme' ? 'male' : 'female',
        class: this.classe,
      })
    },
    resetInputs() {
      this.sex = 'homme'
      this.age = 40
      this.classe = 1
    },
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
#search {
  * {
    font-family: Lato;
  }
  .title {
    text-align: center;
  }
  .search-panel {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 3em;
    margin-bottom: 2em;
  }
}
</style>
