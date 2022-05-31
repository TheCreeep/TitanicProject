const state = {
    passengers: [],
    aliveStats: []
}

const actions = {
    async GET_ALL_PASSENGERS({ commit }) {
        await this.$axios.get('/api/data')
            .then((response) => {
                commit('SET_PASSENGERS', response.data)
                commit('SET_ALIVE_DEAD_PASSENGERS', response.data)
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.log(error)
            })
    },
}

const mutations = {
    SET_PASSENGERS(state, passengers) {
        state.passengers = passengers;
    },
    SET_ALIVE_DEAD_PASSENGERS(state, alivePassengers) {
        state.aliveStats = [state.passengers.filter((passenger) => passenger.Survived).length, state.passengers.filter((passenger) => !passenger.Survived).length]
    },

}

export default {
    state,
    actions,
    mutations,
}