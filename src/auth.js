/* globals localStorage */
import router from './main';

const API_URL = 'http://localhost:8080/api';

export default {

  user: {
    authenticated: false,
    name: '',
  },

  login(context, model, redirect) {
    context.$http.post(`${API_URL}/auth`, model).then((result) => {
      localStorage.setItem('gruff_token', JSON.stringify(result.body));

      this.user.authenticated = true;
      this.user.name = result.body.user.name;

      if (redirect !== undefined) {
        router.push(redirect);
      }
    }, (err) => {
      const ctx = context;
      ctx.error = err;
    });
  },

  signup(context, model, redirect) {
    context.$http.post(`${API_URL}/users`, model).then((result) => {
      localStorage.setItem('gruff_token', JSON.stringify(result.body));

      this.user.authenticated = true;
      this.user.name = result.body.user.name;

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
