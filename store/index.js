/* eslint-disable no-unused-vars */
const state = () => ({
    passengers: [],
    aliveStats: [],
    sexStats: [],
    classStats: [],
    searchResult: [],
    searchResultDetails: {
        survivors: [],
        ages: [],
        sex: [],
        class: []
    },
    sexInput: '',
    ageInput: '',
    classInput: '',
})

const actions = {
    async GET_ALL_PASSENGERS({ commit }) {
        await this.$axios.get('/api/data')
            .then((response) => {
                commit('SET_PASSENGERS', response.data)
                commit('SET_ALIVE_DEAD_PASSENGERS')
                commit('SET_MALE_FEMALE_PASSENGERS')
                commit('SET_CLASS_PASSENGERS')
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.log(error)
            })
    },

    async GET_SEARCH_PASSENGERS({ commit }, payload) {
        // eslint-disable-next-line prefer-const
        let { sexe, age, classe } = payload
        // eslint-disable-next-line eqeqeq
        // eslint-disable-next-line no-unused-expressions
        sexe === "femme" ? sexe = "female" : sexe === "homme" ? sexe = "male" : ""
        let link = ['/api/data/search?']
        if (sexe !== '') {
            link.push('Sex=' + sexe)
        }
        if (age !== '') {
            link.push('Age=' + +age)
        }
        if (classe !== '') {
            link.push('Pclass=' + +classe)
        }
        link = link.join('&')
        await this.$axios.get(link)
            .then((response) => {
                commit('SET_SEARCH_RESULT', response.data)
                commit('SET_SEARCH_DETAILS')
            })
            .then(() => {
                this.$router.push('/refresh')
            })
    }

}

const mutations = {
    SET_PASSENGERS(state, passengers) {
        state.passengers = passengers;
    },
    SET_ALIVE_DEAD_PASSENGERS(state) {
        state.aliveStats = [state.passengers.filter((passenger) => passenger.Survived).length, state.passengers.filter((passenger) => !passenger.Survived).length]
    },
    SET_MALE_FEMALE_PASSENGERS(state) {
        state.sexStats = [state.passengers.filter((passenger) => passenger.Sex === "male").length, state.passengers.filter((passenger) => passenger.Sex === "female").length]
    },
    SET_CLASS_PASSENGERS(state) {
        state.classStats = [state.passengers.filter((passenger) => passenger.Pclass === 1).length, state.passengers.filter((passenger) => passenger.Pclass === 2).length, state.passengers.filter((passenger) => passenger.Pclass === 3).length]
    },
    SET_SEARCH_RESULT(state, searchResult) {
        state.searchResult = searchResult
    },

    SET_SEARCH_DETAILS(state) {
        state.searchResultDetails.survivors = [state.searchResult.filter((passenger) => passenger.Survived).length, state.searchResult.filter((passenger) => !passenger.Survived).length]
        state.searchResultDetails.sex = [state.searchResult.filter((passenger) => passenger.Sex === "male").length, state.searchResult.filter((passenger) => passenger.Sex === "female").length]
        state.searchResultDetails.class = [state.searchResult.filter((passenger) => passenger.Pclass === 1).length, state.searchResult.filter((passenger) => passenger.Pclass === 2).length, state.searchResult.filter((passenger) => passenger.Pclass === 3).length]
        state.searchResultDetails.ages = [
            state.searchResult.filter((passenger) => passenger.Age > 0 && passenger.Age <= 10).length,
            state.searchResult.filter((passenger) => passenger.Age > 10 && passenger.Age <= 20).length,
            state.searchResult.filter((passenger) => passenger.Age > 20 && passenger.Age <= 30).length,
            state.searchResult.filter((passenger) => passenger.Age > 30 && passenger.Age <= 40).length,
            state.searchResult.filter((passenger) => passenger.Age > 40 && passenger.Age <= 50).length,
            state.searchResult.filter((passenger) => passenger.Age > 50 && passenger.Age <= 60).length,
            state.searchResult.filter((passenger) => passenger.Age > 60 && passenger.Age <= 70).length,
            state.searchResult.filter((passenger) => passenger.Age > 70 && passenger.Age <= 80).length,
            state.searchResult.filter((passenger) => passenger.Age > 80 && passenger.Age <= 90).length,
            state.searchResult.filter((passenger) => passenger.Age > 90).length
        ]
    }
    ,
    SET_AGE_INPUT(state, ageInput) {
        state.ageInput = ageInput
    },
    SET_SEX_INPUT(state, sexInput) {
        state.sexInput = sexInput
    },
    SET_CLASS_INPUT(state, classInput) {
        state.classInput = classInput
    },

}

export default {
    state,
    actions,
    mutations,
}