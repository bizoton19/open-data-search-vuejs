<template>
<div id="searchContainer" class="row">
    
 <div class="row">
  <search-aggregation v-if="hasResults">

  </search-aggregation>
 </div>

 <div class="row">
   <search-initiator >

</search-initiator>
 </div>
 
</div>
    
</template>
<script>
import searchInitiator from "./SearchInitiator.vue"
import searchAggregation from "./SearchAggregation.vue"
import {eventBus} from "../main"
export default {
  name: "searchPageContainer",
  components:{
     searchInitiator,
     searchAggregation,
     eventBus
  },
  data:function(){
      return{
          hasResults:false
      }
  },
  created:function(){
      
      var that = this
      eventBus.$on('newAggsReceived', (aggs)=>{
          console.log('event received by searchPageContainer' + aggs)
         that.hasResults=true
      })
  }
}
</script>
<style scoped>

</style>


