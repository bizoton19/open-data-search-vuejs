<template>
  <div id="search">
    <md-card md-with-hover>
      <md-card-header> Search Open Datasets</md-card-header>
      <md-card-actions>
      
        <md-input-container>
          <label>Search</label>
          <md-input placeholder="Search by type, title or description etc. " v-model="searchquery" id="searchquery">
          </md-input>
          <a href="#" v-on:click="search(searchquery)">
            <md-icon class="md-size-1x md-accent">search</md-icon>
          </a>
        </md-input-container>
      </md-card-actions>
    </md-card>
    <br>
    <p v-if="fetchStatus != null">{{fetchStatus}}</p>
    <p v-if="hasResults">{{displayWhenHasResults()}}</p>
    <p v-if="noResult && isSearchComplete && fetchStatus==null">
      <md-icon class="md-size-1x md-warn">help</md-icon> search returned no result please try another query</p>
    <p v-if="!searchButtonclicked || searchquery===null">
      <md-icon class="md-size-1x md-warn">help_outline</md-icon>
      {{searchButtonclickedOrSearchqueryNullDisplay()}}
    </p>
  
   <search-aggregation  v-if="hasResults" :aggs="aggs"></search-aggregation>
    <md-spinner :md-size="60" md-indeterminate class="md-warn" v-if="showSpinner"></md-spinner>
  
  <neiss-list-results v-if="hasResults" :response="response">
  </neiss-list-results>
   <recall-list-results v-if="hasResults" :response="response">
   </recall-list-results>
   
   
  
  </div>
</template>


<script>
import recallListResults from "./recalls/RecallListResults.vue";
import neissListResults from "./neiss/NeissListResults.vue";
import searchAggregation from "./SearchAggregation.vue";


import _ from "lodash";

export default {
  name: "search",
  components: {
    recallListResults,
    neissListResults,
    searchAggregation
  },
  data: function() {
    return {
      stats: {
        took: Number,
        total: Number,
        maxScore: Number,
        resultCount: Number
      },
      searchSettings: {
        size: 10,
        from: Number,
        dataType: String
      },
      dataContainer: {
        recalls: [],
        incidentReports: [],
        neiss: [],
        violations: []
      },
      aggs: null,
      aggregations: {
        artifactType: [],
        artifactSource: []
      },
      response: null,
      dataTypes: [],
      searchquery: null,
      hasResults: false,
      isSearchComplete: false,
      searchButtonclicked: false,
      fetchStatus: null,
      responseEvent: null,
      wasComponentUpdated: false
    };
  },
  watch: {
    searchquery: function(newQuery) {
      var that = this;
      that.fetchStatus = "Waiting for input...";
      that.search(newQuery);
    }
  },
  computed: {
    showSpinner: function(){
     return (this.searchButtonclicked && !this.isSearchComplete && this.fetchStatus===null);
    },
    noResult: function() {
      return (
        this.searchButtonclicked && !this.hasResults && this.searchquery != null
      );
    }
   
  },

  methods: {
    displayWhenHasResults: function() {
      return (
        "Found: " +
        this.stats.total +
        " records in " +
        this.stats.took +
        " ms, Max Relevance Score : " +
        this.stats.maxscore +
        ", Displaying top: " +
        this.stats.resultCount +
        " results containing " +
        this.searchquery
      );
    },

    searchButtonclickedOrSearchqueryNullDisplay: function() {
      return this.searchquery
        ? "Query=" + this.searchquery
        : "Please enter a query";
    },
    resetFormItems: function() {
      var that = this;
      that.searchButtonclicked = true;
      that.isSearchComplete = false;
      that.hasResults = false;
      that.stats.resultCount = 0;
      that.dataContainer.recalls = [];
      that.dataContainer.neiss = [];
      that.fetchStatus = null;
     
    },

    filterResponseData: function(resp) {
      var that = this;

      var responseData = resp.data;
      that.stats.took = responseData.results.took;
      that.stats.total = responseData.results.hits.total;
      that.stats.maxscore = responseData.results.hits.max_score;
      that.stats.resultCount = Math.ceil(
        responseData.docCount / responseData.pages
      );
     

      that.response = responseData.results;
      that.aggs = responseData.results.aggregations;
      this.hasResults = true;
      //eventBus.$emit('newSearchRequested', response)
    },

    search: _.debounce(
      function(searchquery) {
        var that = this;
        that.resetFormItems();

        var urlRoot = "/search";
        //TODO: just switch no local node js api server, need to finish code to create a request object to pass down to the api.
        //Also code to parse the api response
        if (searchquery.length == 0 || searchquery.length === null) {
          that.isSearchComplete = true;
          return;
        }
        that.$http
          .post(urlRoot, {
            FullText: this.searchquery,
            Filter: {
              Source: "",
              Type: "",
              StartDate: "01-01-1970",
              EndDate: "01-01-2018"
            },
            StartPage: "1",
            NumPerPage: that.searchSettings.size
          })
          .then(resp => {
            if (resp.data.results.hits.total > 0) {
              that.filterResponseData(resp);
            }
            that.isSearchComplete = true;
          })
          .catch(function(error) {
            console.log("could not reach API " + error);
            this.fetchStatus =
              "Communication with the back end server failed...please try again later";
          });
      },
      // number of milliseconds to wait for user to finish typing
      600
    )
  }
};
</script>
<style scoped>
.aggregationsList li {
  display: inline;
}
</style>

