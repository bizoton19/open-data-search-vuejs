<template>
<div id="searchinput">
  
 <md-card md-with-hover>
      <md-card-header> Search Open Datasets</md-card-header>
      <md-card-actions>
      
       <md-input-container>
          <label>Search</label>
          <md-input placeholder="Search by type, title or description etc. " v-model="searchquery" id="searchquery">
          </md-input>
          <a href="#" v-on:click="search(query)">
            <md-icon class="md-size-1x md-accent">search</md-icon>
          </a>
</md-input-container>
      </md-card-actions>
    </md-card>
 
<search :searchinput="searchquery">

</search>

</div>
    
</template>
<script>
import _ from "lodash";
import search from "./Search.vue"
//import recallListResults from "./recalls/RecallListResults.vue";
//import neissListResults from "./neiss/NeissListResults.vue";
export default {
  name: "searchInitiator",
  components:{
     search,
     //recallListResults,
     //neissListResults
  },
 
  data: function() {
    return {
      searchquery: null
    };
  },

  methods: {
      search: _.debounce(
          function(query){
            this.searchquery=query;//validate input or in child?
          }
      ,10000)
  }
};
</script>
<style scoped>

</style>


