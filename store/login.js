/* eslint-disable no-unused-vars */
const state = () => ({
    user: {}
})

const actions = {

    DISCONNECT_USER({ commit }) {
        commit('SET_USER', {})
    },

    async LOGIN_USER({ commit }, payload) {
        const { password, email } = payload

        try {
            const response = await this.$axios.$post('/api/login', {
                email,
                password
            })

            if (response.code === "LOGIN_SUCCESS") {
                this._vm.$vs.notification({
                    title: 'Bienvenue',
                    text: response.message,
                    color: 'success',
                    position: 'top-left',
                    iconPack: 'feather',
                    icon: "<i class='bx bx-check'></i>",
                })

                commit('SET_USER', { email: response.user.email, username: response.user.username })

                this.$router.push("/search")
                return;
            }

            if (response.code === "LOGIN_FAILED") {
                this._vm.$vs.notification({
                    title: 'Erreur',
                    text: response.message,
                    color: 'danger',
                    iconPack: 'feather',
                    position: 'top-left',
                    icon: "<i class='bx bxs-message-rounded-error' ></i>",
                })

                return;
            }

            this._vm.$vs.notification({
                title: 'Erreur inconnue',
                text: "Une erreur est survenue, veuillez réessayer plus tard",
                color: 'danger',
                position: 'top-left',
                iconPack: 'feather',
                icon: "<i class='bx bxs-message-rounded-error' ></i>",
            })
        }

        catch (error) {
            // eslint-disable-next-line no-console
            console.log(error)
        }
    },
    async REGISTER_USER({ commit }, payload) {
        const { password, email,
            username } = payload

        try {
            const response = await this.$axios.$post('/api/register', {
                email,
                password,
                username
            })

            if (response.code === "EMAIL_ALREADY_USED") {
                this._vm.$vs.notification({
                    title: 'Erreur',
                    text: response.message,
                    color: 'danger',
                    iconPack: 'feather',
                    position: 'top-left',
                    icon: "<i class='bx bxs-message-rounded-error' ></i>",
                })

                return;

            }
            if (response.code === "USER_CREATED") {
                this._vm.$vs.notification({
                    title: 'Bienvenue',
                    text: response.message,
                    color: 'success',
                    position: 'top-left',
                    iconPack: 'feather',
                    icon: "<i class='bx bx-check'></i>",
                })

                commit('SET_USER', { email: response.user.email, username: response.user.username })
                return;
            }


            this._vm.$vs.notification({
                title: 'Erreur inconnue',
                text: "Une erreur est survenue, veuillez réessayer plus tard",
                color: 'danger',
                position: 'top-left',
                iconPack: 'feather',
                icon: "<i class='bx bxs-message-rounded-error' ></i>",
            })



        }

        catch (error) {
            // eslint-disable-next-line no-console
            console.log(error)
        }
    },
}

const mutations = {
    SET_USER(state, user) {
        state.user = user;
    },

}

export default {
    state,
    actions,
    mutations,
}