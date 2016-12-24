<template>
  <div class="container-fluid">
    <div class="col-md-9">
      <h1>Recent Debates</h1>
      <div class="col-md-12 demo-card-wide mdl-card mdl-shadow--2dp" style="margin:20px;" v-for="item in debates">
        <div class="mdl-card__title">
         <!--  <input type="checkbox" id="list-checkbox-1" class="mdl-checkbox__input" v-model="item.active"
          style="margin-right: 20px;"/> -->
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
  </div>
</template>

<script>
import router from '../main';

const API_URL = 'http://localhost:8080/api';

export default {
  name: 'home',
  data() {
    return {
      debates: [],
    };
  },

  created() {
    this.list();
  },

  methods: {
    gruff(id) {
      router.push(`/gruff/${id}`);
    },

    list() {
      this.$http.get(`${API_URL}/debates`).then((data) => {
        this.debates = data.body;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
