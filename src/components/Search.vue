<template>

   
  <div id="search">
   
    <br>
    <p v-if="fetchStatus != null">{{fetchStatus}}</p>
    <p v-if="hasResults">{{displayWhenHasResults()}}</p>
    <p v-if="noResult && isSearchComplete && fetchStatus==null">
      <md-icon class="md-size-1x md-warn">help</md-icon> search returned no result please try another query</p>
    <p v-if="!searchButtonclicked || searchinput===null">
      <md-icon class="md-size-1x md-warn">help_outline</md-icon>
      {{searchButtonclickedOrsearchinputNullDisplay()}}
    </p>
  
    <md-spinner :md-size="60" md-indeterminate class="md-warn" v-if="showSpinner"></md-spinner>
   
   <search-results v-if="hasResults" :results="response">

   </search-results>
  

  </div>
  
</template>


<script>

import  searchResults from "./SearchResults.vue";
import {eventBus} from "../main";


export default {
  name: "search",
  components: {
    
    searchResults,
    eventBus
   
  },
   props:{
      searchinput:{
          required:false,
          type:String
      }
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
  
     
      response: null,
      dataTypes: [],
      //searchInput: null,//move to parent comp
      hasResults: false,
      isSearchComplete: false,
      searchButtonclicked: false,
      fetchStatus: null,
      responseEvent: null,
      wasComponentUpdated: false
    };
  },
  watch: {
    searchinput: function(newQuery) {
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
        this.searchButtonclicked && !this.hasResults && this.searchinput != null
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
        this.stats.maxScore +
        ", Displaying top: " +
        this.stats.resultCount +
        " results containing " +
        this.searchinput
      );
    },
 
    searchButtonclickedOrsearchinputNullDisplay: function() {
      return this.searchinput
        ? "Query=" + this.searchinput
        : "Please enter a query";
    },
    resetFormItems: function() {
      var that = this;
      that.searchButtonclicked = true;
      that.isSearchComplete = false;
      that.hasResults = false;
      that.stats.resultCount = 0;
      that.fetchStatus = null;
     
    },

    filterResponseData: function(resp) {
      var that = this;

      var responseData = resp.data;
      that.stats.took = responseData.took;
      that.stats.total = responseData.docCount;
      that.stats.maxScore = responseData.maxScore;
      that.stats.resultCount = Math.ceil(
        responseData.docCount / responseData.totalPages
      );
     

      that.response = responseData.artifacts;
      
      this.hasResults = true;
      eventBus.$emit('newAggsReceived', responseData.aggregation)
      console.log( responseData.aggregation)
    },

    search: 
      function(searchinput) {
        var that = this;
        that.resetFormItems();

        var urlRoot = "http://localhost:3000/search";
        //TODO: just switch no local node js api server, need to finish code to create a request object to pass down to the api.
        //Also code to parse the api response
        if (searchinput.length == 0 || searchinput.length === null) {
          that.isSearchComplete = true;
          return;
        }
        that.$http
          .post(urlRoot, {
            FullText: this.searchinput,
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
            if (resp.data.docCount > 0) {
              this.filterResponseData(resp)
            }
            that.isSearchComplete = true
          })
          .catch(function(error) {
            console.log("could not reach API " + error)
            this.fetchStatus =
              "Communication with the back end server failed...please try again later";
          });
      }
  }
};
</script>
<style scoped>
.aggregationsList li {
  display: inline;
}
</style>

