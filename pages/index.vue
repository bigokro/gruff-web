<template>
  <div class="container-fluid">
    <div class="col-md-9">
      <h1>Top Debates</h1>
      <div class="col-md-12 demo-card-wide mdl-card mdl-shadow--2dp" style="margin: 20px 0;" 
      v-for="item in claimsTop" v-bind:key="item.id">
        <div class="mdl-card__title">
          <h2 class="mdl-card__title-text">{{item.title}}</h2>
        </div>
        <div class="mdl-card__supporting-text" style="font-size: 2rem; text-align: left; line-height: 1.5;">
         {{item.desc}}
        </div>
        <div class="mdl-card__actions mdl-card--border" style="text-align: left;">
          <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" @click="gruff(item.uuid)">
            Gruff it
          </a>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <h2>Tags</h2>
    </div>
    <hr>
    <div class="col-md-9">
      <h1>Recent Debates</h1>
      <div class="col-md-12 demo-card-wide mdl-card mdl-shadow--2dp" style="margin: 20px 0;" 
      v-for="item in claims" v-bind:key="item.id">
        <div class="mdl-card__title">
          <h2 class="mdl-card__title-text">{{item.title}}</h2>
        </div>
        <div class="mdl-card__supporting-text" style="font-size: 2rem; text-align: left; line-height: 1.5;">
         {{item.desc}}
        </div>
        <div class="mdl-card__actions mdl-card--border" style="text-align: left;">
          <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" @click="gruff(item.uuid)">
            Gruff it
          </a>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios'

const API_URL = 'http://localhost:8080/api'

export default {
  name: 'home',
  data () {
    return {
      claims: [],
      claimsTop: []
    }
  },

  created () {
    this.list()
    this.listTop()
  },

  methods: {
    // gruff(id) {
    //   router.push(`/gruff/${id}`);
    // },

    list () {
      axios.get(`${API_URL}/claims`).then((response) => {
        this.claims = response.data
      })
    },

    listTop () {
      axios.get(`${API_URL}/claims/top`).then((response) => {
        this.claimsTop = response.data
      })
    }
  }
}
</script>

<style>
.container
{
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title
{
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle
{
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.links
{
  padding-top: 15px;
}
</style>
