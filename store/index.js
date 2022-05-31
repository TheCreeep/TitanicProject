const state = () => ({
    passengers: [],
    aliveStats: [],
    sexStats: [],
    searchResult: []
})

const actions = {
    async GET_ALL_PASSENGERS({ commit }) {
        await this.$axios.get('/api/data')
            .then((response) => {
                commit('SET_PASSENGERS', response.data)
                commit('SET_ALIVE_DEAD_PASSENGERS', response.data)
                commit('SET_MALE_FEMALE_PASSENGERS', response.data)
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.log(error)
            })
    },

    async GET_SEARCH_PASSENGERS({ commit }, payload) {
        await this.$axios.get(`/api/data/${payload.age}/${payload.class}/${payload.sex}`)
            .then((response) => {
                commit('SET_SEARCH_RESULT', response.data)
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
    SET_SEARCH_RESULT(state, searchResult) {
        state.searchResult = searchResult
    }


}

export default {
    state,
    actions,
    mutations,
}