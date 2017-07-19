import axios from 'axios'
import Vuex from 'vuex'
import Cookie from 'cookie'
import Cookies from 'js-cookie'

const inBrowser = typeof window !== 'undefined'

const store = () => {
  return new Vuex.Store({
    state: {
      authUser: null,
      loggedIn: false,
      token: null
    },
    mutations: {
      SET_USER: function (state, user) {
        state.authUser = user
        state.loggedIn = Boolean(user)
        if (inBrowser) {
          if (!user) {
            return Cookies.remove('gruff_user')
          }
          Cookies.set('gruff_user', JSON.stringify(user))
        }
      },
      SET_TOKEN: function (state, token) {
        state.token = token
        if (inBrowser) {
          if (!token) {
            return Cookies.remove('gruff_token')
          }
          Cookies.set('gruff_token', token)
        }
      }
    },
    actions: {
      nuxtServerInit ({ commit }, { req }) {
        const cookieStr = inBrowser ? document.cookie : req.headers.cookie
        const cookies = Cookie.parse(cookieStr || '') || {}
        const token = cookies.gruff_token
        const user = cookies.gruff_user

        commit('SET_USER', user ? JSON.parse(user) : undefined)
        commit('SET_TOKEN', token)
      },
      login ({ commit }, { email, password }) {
        return axios.post('http://localhost:8080/api/auth', {
          email,
          password
        })
          .then((res) => {
            commit('SET_USER', res.data)
            commit('SET_TOKEN', res.data.token)
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
            commit('SET_USER', res.data)
            commit('SET_TOKEN', res.data.token)
          })
          .catch((error) => {
            if (error.response.status === 401) {
              throw new Error('Bad credentials')
            }
          })
      },
      logout ({ commit }) {
        commit('SET_USER', null)
        commit('SET_TOKEN', null)
      }
    }
  })
}

export default store
