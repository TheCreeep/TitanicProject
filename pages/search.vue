<template>
  <div id="search">
    <h1 class="title">
      Rechercher :
      <span v-if="searchResult.length !== 0"
        >({{ searchResult.length }} resultats)</span
      >
    </h1>
    <div class="search-panel" @keyup.enter="searchHandle">
      <vs-button @click="resetInputs()">Reset</vs-button>
      <vs-select v-model="sex" label="Sexe">
        <vs-option label="Homme" value="homme"> Homme </vs-option>
        <vs-option label="Femme" value="femme"> Femme </vs-option>
      </vs-select>

      <vs-input v-model="age" min="0" max="100" type="number" label="Age" />

      <vs-select v-model="classe" label="Classe">
        <vs-option label="Premiere Classe" value="1">
          Premiere Classe
        </vs-option>
        <vs-option label="Seconde Classe" value="2"> Seconde Classe </vs-option>
        <vs-option label="Classe Eco" value="3"> Classe Eco </vs-option>
      </vs-select>

      <vs-button @click="searchHandle()">Rechercher</vs-button>
    </div>
    <div class="content">
      <div class="infos">
        <div v-if="searchResult.length !== 0" class="infos__chart">
          <DoughtnutChart
            refs="chart"
            :data="survivorChartData"
            :options="options"
          ></DoughtnutChart>
          <DoughtnutChart
            :data="sexChartData"
            :options="options"
          ></DoughtnutChart>
          <DoughtnutChart
            :data="classChartData"
            :options="options"
          ></DoughtnutChart>
        </div>
        <barChart
          v-if="searchResult.length !== 0"
          class="barChart"
          :data="ageChartData"
          :options="options"
        ></barChart>
        <div v-if="searchResult.length !== 0" class="infos__text">
          <h1>
            Moyenne d'age de la recherche : {{ getMoyenneAge.toFixed(2) }}
          </h1>
          <h1 v-if="searchResult.length !== 1">
            Ecart type de l'age de la recherche : {{ getEcartType.toFixed(2) }}
          </h1>
        </div>
      </div>
      <div class="search-results">
        <!-- Tab with searchresult -->
        <vs-table>
          <template #thead>
            <vs-tr>
              <vs-th> PassengerId </vs-th>
              <vs-th> Survivant ? </vs-th>
              <vs-th> Classe </vs-th>
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
              <vs-td> {{ passenger.Pclass }} </vs-td>
              <vs-td> {{ passenger.Name }} </vs-td>
              <vs-td> {{ passenger.Age }} </vs-td>
              <vs-td>
                {{ passenger.Sex === 'male' ? 'Homme' : 'Femme' }}
              </vs-td>
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
      sex: this.$store.state.sexInput,
      age: this.$store.state.ageInput,
      classe: this.$store.state.classInput,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
      survivorChartData: {
        labels: ['Vivants', 'Morts'],
        datasets: [
          {
            label: 'Survivants',
            data: this.$store.state.searchResultDetails.survivors,
            backgroundColor: ['green', '#FF2030'],
          },
        ],
      },
      sexChartData: {
        labels: ['Homme', 'Femme'],

        datasets: [
          {
            label: 'Survivants',
            data: this.$store.state.searchResultDetails.sex,
            backgroundColor: ['#019EDE', '#F20079'],
          },
        ],
      },
      classChartData: {
        labels: ['Premiere Classe', 'Seconde Classe', 'Classe Eco'],
        datasets: [
          {
            label: 'Classe',
            data: this.$store.state.searchResultDetails.class,
            backgroundColor: ['#404040', '#a0b6f7', '#F2F261'],
          },
        ],
      },
      ageChartData: {
        labels: [
          '0-10',
          '11-20',
          '21-30',
          '31-40',
          '41-50',
          '51-60',
          '61-70',
          '71-80',
          '81-90',
          '91-100',
        ],
        datasets: [
          {
            label: 'Repartitions des Ages',
            data: this.$store.state.searchResultDetails.ages,
            backgroundColor: [
              '#ff000055',
              '#ffa50055',
              '#ffff0055',
              '#00ff0055',
              '#0000ff55',
              '#a52a2a55',
              '#ff00ff55',
              '#00ffff55',
              '#ffffff55',
              '#ff005555',
            ],
            borderColor: [
              '#ff000099',
              '#ffa50099',
              '#ffff0099',
              '#00ff0099',
              '#0000ff99',
              '#a52a2a99',
              '#ff00ff99',
              '#00ffff99',
              '#ffffff99',
              '#ff005599',
            ],
            borderWidth: 3,
          },
        ],
      },
    }
  },
  computed: {
    passengers() {
      return this.$store.state.passengers
    },
    searchResult() {
      return this.$store.state.searchResult
    },
    searchResultDetails() {
      return this.$store.state.searchResultDetails
    },
    getMoyenneAge() {
      return (
        this.searchResult.reduce((acc, passenger) => {
          return +acc + +passenger.Age
        }, 0) / this.searchResult.length
      )
    },
    getEcartType() {
      return (
        (this.searchResult.reduce(
          (p, c) => +p + (+c.Age - this.getMoyenneAge) ** 2,
          0
        ) /
          (this.searchResult.length - 1)) **
        0.5
      )
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
      this.$store.commit('SET_AGE_INPUT', this.age)
      this.$store.commit('SET_SEX_INPUT', this.sex)
      this.$store.commit('SET_CLASS_INPUT', this.classe)

      this.$store.dispatch('GET_SEARCH_PASSENGERS', {
        age: this.age,
        sexe: this.sex,
        classe: this.classe,
      })
    },
    resetInputs() {
      this.sex = ''
      this.age = ''
      this.classe = ''
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
  margin: 6em 0;
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
  .content {
    display: flex;
    flex-direction: column;
    padding: 1em;
    gap: 4em;

    .infos {
      &__text {
        text-align: center;
      }
      &__chart {
        display: flex;
        justify-content: center;
        gap: 8em;
      }
      .barChart {
        padding: 4em;
      }
    }
  }
}
</style>
