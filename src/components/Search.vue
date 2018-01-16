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
    <search-pagination v-if="hasResults" 
    :totalPages="stats.totalPages"
    :currPage="pageselected"
     @pageSelected="pageselected=$event"></search-pagination>
    
   
  </div>
  
</template>


<script>
import searchResults from "./SearchResults.vue";
import searchPagination from "./SearchPagination.vue";
import { eventBus } from "../main";

export default {
  name: "search",
  components: {
    searchPagination,
    searchResults,
    eventBus
  },
  props: {
    searchinput: {
      required: false,
      type: String
    }
    
  },
  data: function() {
    return {
      stats: {
        took: Number,
        total: Number,
        totalPages: Number,
        maxScore: Number,
        resultCount: Number
      },
      pageselected:1,
      searchSettings: {
        size: 10,
        from: Number,
        dataType: String
      },
      
      
      response: null,
      dataTypes: [],
      //searchInput: null,//moved to parent comp
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
    },
    pageselected: function(page){
      var that = this;
      console.log("watching page just turned to ", page)
      console.log("watching  ", this.searchinput)
      that.search(that.searchinput)
    }
  },
  computed: {
    showSpinner: function() {
      return (
        this.searchButtonclicked &&
        !this.isSearchComplete &&
        this.fetchStatus === null
      );
    },
    noResult: function() {
      return (
        this.searchButtonclicked && !this.hasResults && this.searchinput != null
      );
    }
  },
  created:function(){
         
    
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
      eventBus.$emit("noResult", that.hasResults);
      that.stats.resultCount = 0;
      that.fetchStatus = null;
      that.stats.totalPages=[];//,move to child component
    },

    filterResponseData: function(resp) {
      var that = this;

      var responseData = resp.data;
      that.stats.took = responseData.took;
      that.stats.total = responseData.docCount;
      that.stats.maxScore = responseData.maxScore;
      that.stats.totalPages = responseData.totalPages;
      that.stats.resultCount = Math.ceil(
        responseData.docCount / responseData.totalPages
      );
     
      that.response = responseData.artifacts;
      this.hasResults = true;
    },

    search: function(searchinput) {
      var that = this;
      that.resetFormItems();
      var pageSelected = parseInt(that.pageselected)
      var urlRoot = "/search";
      //TODO: just switch no local node js api server
      if (searchinput.length == 0 || searchinput.length === null) {
        that.isSearchComplete = true;
        return;
      }
      console.log('pageSelected has changed, is now ', pageSelected)
      that.$http
        .post(urlRoot, {
          FullText: this.searchinput,
          Filter: {
            Source: '',
            Type: '',
            StartDate: "1970-01-01",
            EndDate: "2019-01-01"
          },
          StartPage: isNaN(pageSelected)?1:pageSelected,
          NumPerPage: that.searchSettings.size
        })
        .then(resp => {
          if (resp.data.docCount > 0) {
            this.filterResponseData(resp);
          }
          eventBus.$emit("newAggsReceived", resp.data.aggregation);
          that.isSearchComplete = true;
        })
        .catch(function(error) {
          console.log("could not reach API " + error);
          this.fetchStatus =
            "Communication with the back end server failed...please try again later";
        });
    }
  }
};
</script>
<style>

</style>

