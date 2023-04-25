import { getFirebaseBackend } from '../../helpers/firebase/authUtils'

export const state = {
    currentUser: sessionStorage.getItem('authUser'),
    error: null
}

export const mutations = {
    SET_CURRENT_USER(state, newValue) {
        state.currentUser = newValue
    },
    SET_ERROR(state, newValue) {
        state.error = newValue
    }
}

export const getters = {
    // Whether the user is currently logged in.
    loggedIn(state) {
        return !!state.currentUser
    },
    emailVerified(state) {
        return !!state.currentUser && state.currentUser.emailVerified
    },
    error(state) {
        return state.error
    }
}

export const actions = {
    // This is automatically run in `src/state/store.js` when the app
    // starts, along with any other actions named `init` in other modules.
    // eslint-disable-next-line no-unused-vars
    init({ state, dispatch }) {
        dispatch('validate')
    },

    // Logs in the current user.
    logIn({ commit, dispatch, getters }, { email, password } = {}) {
        if (getters.loggedIn) return dispatch('validate')
        commit('SET_ERROR', "Loading")
        return getFirebaseBackend().loginUser(email, password).then((response) => {
            const user = response
            if (user.emailVerified) {
                commit('SET_CURRENT_USER', user)
                commit('SET_ERROR', null)
            } else {
                throw Error("Email Not Verified")
            }
            return user
        }).catch(async (err) => {
            console.log(err);
            await getFirebaseBackend().logout()
            commit('SET_ERROR', "Email Not Verified")
        });
    },

    // Logs out the current user.
    logOut({ commit }) {
        // eslint-disable-next-line no-unused-vars
        commit('SET_CURRENT_USER', null)
        return new Promise((resolve, reject) => {
            // eslint-disable-next-line no-unused-vars
            getFirebaseBackend().logout().then((response) => {
                resolve(true);
            }).catch((error) => {
                reject(this._handleError(error));
            })
        });
    },

    loginWithGoogle({ commit, dispatch, getters }) {

        if (getters.loggedIn) return dispatch('validate')
        commit('SET_ERROR', "Loading")

        return getFirebaseBackend().loginWithGoogle().then(user => {
            commit('SET_CURRENT_USER', user)
            commit('SET_ERROR', null)

        }).catch(err => console.log(err))
    },

    // register the user
    register({ commit, dispatch, getters }, { email, password } = {}) {
        if (getters.loggedIn) return dispatch('validate')
        commit('SET_ERROR', "Loading")

        return getFirebaseBackend().registerUser(email, password).then(async (response) => {
            const user = response
            try {
                await getFirebaseBackend().logout()
            } catch (err) {
                console.log(err)
            }
            if (!user.emailVerified)
                commit('SET_ERROR', "Email Not Verified")
            // commit('SET_CURRENT_USER', user)
            return user
        }).catch(err => commit("SET_ERROR", err));
    },


    // Validates the current user's token and refreshes it
    // with new data from the API.
    // eslint-disable-next-line no-unused-vars
    validate({ commit, state }) {
        if (!state.currentUser) return Promise.resolve(null)

        const user = getFirebaseBackend().getAuthenticatedUser();
        if (user.emailVerified) {
            commit('SET_CURRENT_USER', user)
        }
        return user;
    },
}

// ===
// Private helpers
// ===

function saveState(key, state) {
    window.localStorage.setItem(key, JSON.stringify(state))
}
