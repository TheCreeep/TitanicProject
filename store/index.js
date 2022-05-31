const state = () => ({
    passengers: [],
    aliveStats: [],
    sexStats: [],
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

}

export default {
    state,
    actions,
    mutations,
}