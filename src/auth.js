/* globals localStorage */
import axios from 'axios';
import router from './main';

const API_URL = 'http://localhost:8080/api';

export default {

  user: {
    authenticated: false,
    name: '',
  },

  login(context, model, redirect) {
    axios.post(`${API_URL}/auth`, model).then((response) => {
      localStorage.setItem('gruff_token', JSON.stringify(response.data));

      this.user.authenticated = true;
      this.user.name = response.data.user.name;

      if (redirect !== undefined) {
        router.push(redirect);
      }
    }, (err) => {
      const ctx = context;
      ctx.error = err;
    });
  },

  signup(context, model, redirect) {
    axios.post(`${API_URL}/users`, model).then((response) => {
      localStorage.setItem('gruff_token', JSON.stringify(response.data));

      this.user.authenticated = true;
      this.user.name = response.data.user.name;

      if (redirect !== undefined) {
        router.push(redirect);
      }
    }, (err) => {
      const ctx = context;
      ctx.error = err;
    });
  },

  logout() {
    localStorage.removeItem('gruff_token');
    this.user.authenticated = false;
    this.user.name = '';
    router.push('/');
  },

  loggedIn() {
    const auth = localStorage.getItem('gruff_token');
    if (auth !== null) {
      this.user.authenticated = true;
      this.user.name = JSON.parse(localStorage.getItem('gruff_token')).user.name;
    } else {
      this.user.authenticated = false;
    }

    return this.user.authenticated;
  },


  getAuthHeader() {
    const token = JSON.parse(localStorage.getItem('gruff_token')).token;
    return {
      Authorization: `Bearer ${token}`,
    };
  },
};
