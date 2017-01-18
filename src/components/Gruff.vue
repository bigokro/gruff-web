<template>
  <div id="gruff" class="container-fluid">
    <div class="col-md-12 left">
      <h1>{{debate.title}}</h1>
      <h4>{{debate.desc}}</h4>
      <p>Tags: </p>
    </div>

    <!-- ProTruth -->
    <div class="col-md-6">
      <div class="col-md-12">
        <div>
          <h3>Arguments in Favor</h3>
          <button @click="argumentFavor()" class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">Add a new Argument</button>
        </div>
      </div>
      <div class="col-md-12 space-20 left" v-if="formFavor">
        <div v-if="isError1" class="alert alert-danger" role="alert">
          {{favorError}}
        </div>
        <h4>Add a New Debate</h4>
        <div class="form-group">
          <label>Argument Title</label>
          <input type="text" class="form-control" placeholder="Title" v-model="argFavor.title">
        </div>
        <div class="form-group">
          <label>Argument Description</label>
          <input type="text" class="form-control" placeholder="Description" v-model="argFavor.desc">
        </div>
        <button @click="saveFavor()" class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">Send It</button>
        <button @click="cancel()" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Cancel</button>
      </div>
      <div class="col-md-12 space left">
        <div class="demo-card-wide mdl-card mdl-shadow--2dp" style="width: 100%;">
          <div class="mdl-card__title">
            <h2 class="mdl-card__title-text">Arguments</h2>
          </div>
          <div class="mdl-card__supporting-text">
            <ul v-for="item in debate.protruth">
              <a>{{item.claim.title}}</a>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- ConTruth -->
    <div class="col-md-6">
      <div class="col-md-12">
        <div>
          <h3>Arguments in Against</h3>
          <button @click="argumentAgainst()" class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">Add a new Argument</button>
        </div>
      </div>
      <div class="col-md-12 left space-20" v-if="formAgainst">
        <div v-if="isError2" class="alert alert-danger" role="alert">
          {{favorError}}
        </div>
        <h4>Add a New Debate</h4>
        <div class="form-group">
          <label>Argument Title</label>
          <input type="text" class="form-control" placeholder="Title" v-model="argAgainst.title">
        </div>
        <div class="form-group">
          <label>Argument Description</label>
          <input type="text" class="form-control" placeholder="Description" v-model="argAgainst.desc">
        </div>
        <button @click="saveAgainst()" class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">Send It</button>
        <button @click="cancel()" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Cancel</button>
      </div>
      <div class="col-md-12 space left">
        <div class="demo-card-wide mdl-card mdl-shadow--2dp" style="width: 100%;">
          <div class="mdl-card__title">
            <h2 class="mdl-card__title-text">Arguments</h2>
          </div>
          <div class="mdl-card__supporting-text">
            <ul v-for="item in debate.contruth">
              <a>{{item.claim.title}}</a>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export default {
  name: 'gruff',
  data() {
    return {
      debate: {},
      formFavor: false,
      formAgainst: false,
      isError1: false,
      isError2: false,
      argFavor: {},
      argAgainst: {},
    };
  },

  created() {
    this.list();
  },

  methods: {
    list() {
      axios.get(`${API_URL}/claims/${this.$route.params.id}`).then((response) => {
        const debate = response.data;
        this.debate = debate;
      });
    },

    argumentFavor() {
      this.formAgainst = false;
      this.formFavor = true;
    },

    argumentAgainst() {
      this.formFavor = false;
      this.formAgainst = true;
    },

    saveFavor() {
      this.argFavor.type = 1;
      this.argFavor.claimId = this.debate.uuid;
      this.argFavor.targetClaimId = this.debate.uuid;
      axios.post(`${API_URL}/arguments`, this.argFavor).then(() => {
        this.get();
      }, () => {
        this.isError1 = true;
        this.favorError = 'You must be logged.';
        setTimeout(() => {
          this.isError1 = false;
        }, 2000);
      });
    },

    saveAgainst() {
      this.argAgainst.type = 6;
      this.argAgainst.claimId = this.debate.uuid;
      this.argAgainst.targetClaimId = this.debate.uuid;
      axios.post(`${API_URL}/arguments`, this.argAgainst).then(() => {
        this.get();
      }, () => {
        this.isError2 = true;
        this.againstError = 'You must be logged.';

        setTimeout(() => {
          this.isError2 = false;
        }, 2000);
      });
    },

    cancel() {
      this.formAgainst = false;
      this.formFavor = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #gruff ul {
    padding:0;
  }
  #gruff a {
    cursor: pointer;
  }

  .left {
    text-align: left;
  }

  .space-20 {
    margin-top: 20px;
  }

  .space {
    margin-top: 40px;
  }
</style>
