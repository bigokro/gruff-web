import axios from 'axios'
import Vuex from 'vuex'

const store = () => {
  return new Vuex.Store({
    state: {
      authUser: null
    },
    mutations: {
      SET_USER: function (state, user) {
        state.authUser = user
      }
    },
    actions: {
      // nuxtServerInit ({ commit }, { req }) {
      //   if (req.session && req.session.authUser) {
      //     commit('SET_USER', req.session.authUser)
      //   }
      // },
      login ({ commit }, { email, password }) {
        return axios.post('http://localhost:8080/api/auth', {
          email,
          password
        })
        .then((res) => {
          localStorage.setItem('gruff_token', JSON.stringify(res.data))
          commit('SET_USER', res.data)
        })
        .catch((error) => {
          if (error.response.status === 401) {
            throw new Error('Bad credentials')
          }
        })
      },
      signup ({ commit }, { name, email, username, password }) {
        return axios.post('http://localhost:8080/api/users', {
          name,
          email,
          username,
          password
        })
        .then((res) => {
          localStorage.setItem('gruff_token', JSON.stringify(res.data))
          commit('SET_USER', res.data)
        })
        .catch((error) => {
          if (error.response.status === 401) {
            throw new Error('Bad credentials')
          }
        })
      },
      logout ({ commit }) {
        commit('SET_USER', null)
      }
    }
  })
}

export default store
