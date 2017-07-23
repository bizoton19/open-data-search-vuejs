<template lang="html">
  <h1>Recalls</h1>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'recallService',
  data: function () {
    return {
      recall: [],
      searchquery:''
    }
  },
  props: {
    recalls:{
      type:Array
    },
    query:{
      type:String,
      required: true

    }
  },
  updated: {
    searchquery:function(searchQuery){

      this.getRecalls();
    }
  },
  methods:{
    getRecalls: _.debounce(function(){
      console.log('this getRecalsl function is being called')
      var that = this;

     that.recalls= that.$http.get('https://www.saferproducts.gov/RestWebServices/RecallReduced?format=json')
            .then(function (response) {
                 console.log('responsedata from recallservice is: ' + response.data);
                that.recalls= response.data;
            })
            .catch(function(error){
              that.recalls.push('could not reach API' + error)
            });
   })
  }
}

</script>

<style lang="css">
</style>
