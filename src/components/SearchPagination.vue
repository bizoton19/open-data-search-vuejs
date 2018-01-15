<template>
    <div >   
      <div  class="pagination" >
      <a href="#" v-on:click="onPrevPage()">
            <md-icon class="md-size-1x md-accent">skip_previous</md-icon>
          </a>
       <a v-if="currPage>=pagesVisible"  @click="onFirstPage()"><strong>{{firstPage}}</strong></a>
      <a v-for="(page, index) in pages" 
        :key="page" 
        :id="page"
        :class="{ active: (pages[index]==currPage) }" 
        @click="onPageSelect(pages[index])"  >{{pages[index]}}</a>
      <a><strong>......</strong></a>
       <a @click="onLastPage()"><strong>{{lastPage}}</strong></a>
      <a href="#" v-on:click="onNextPage()">
            <md-icon class="md-size-1x md-accent">skip_next</md-icon>
          </a>
   </div>
   </div>
</template>

<script>
export default {
  name: "searchPagination",
  components: {},
  props: {
    totalPages: {
      required: true,
      type: Number
    },
    currPage: {
      required: true,
      type: Number
    }
  },
  data: function() {
    return {
      pageSelectedEventName: "pageSelected",
      pagesVisible: Number,
      pages: [],
      selectedPage: 1,
      nextPage: Number,
      prevPage: Number,
      lastPage: Number,
      firstPage: 1
    };
  },
  watch: {
    currPage: function(val) {
      this.selectedPage = val;
    }
  },
  created: function() {
    this.selectedPage = 1;
    this.lastPage = this.totalPages;
    this.pagesVisible = this.totalPages > 0 ? 10 : this.totalPages; //ten pages at a time
    this.pages = [];
    let startIndex = 0;
    let upperBound = this.pagesVisible;

    if (this.currPage >= this.pagesVisible) {
      upperBound = this.totalPages;
      startIndex = this.pagesVisible;
    }
    for (var i = startIndex; i < upperBound; i++) {
      if (i > 0) {
        this.pages.push(i);
      }
    }
  },
  methods: {
    onPageSelect: function(pageNumber) {
      this.selectedPage = pageNumber;
      this.$emit("pageSelected", this.selectedPage);
    },
    onNextPage: function() {
      this.nextPage =
        this.currPage === this.totalPages ? this.totalPages : this.currPage + 1;

      this.onPageSelect(this.nextPage);
    },
    onPrevPage: function() {
      this.prevPage =
        this.currPage === this.firstPage ? this.firstPage : this.currPage - 1;
      this.onPageSelect(this.prevPage);
    },
    onLastPage: function() {
      this.onPageSelect(this.totalPages);
    },
    onFirstPage: function() {
      this.onPageSelect(this.firstPage);
    }
  }
};
</script>

<style scoped>
.pagination {
  display: inline-block;
}

.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
}

.pagination a.active {
  background-color: #4caf50;
  color: white;
}

.pagination a:hover:not(.active) {
  background-color: #ddd;
}
</style>

