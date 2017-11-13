<template lang="html">
  <div>
   
  <md-card>
  <md-list v-for="neissCase in filteredNeissData" :key="neissCase.cpscCaseNumber" >

      <md-list-item>
        <md-avatar>
          <md-icon class="md-size-2x md-primary">accessibility</md-icon>
        </md-avatar>
        <div  class="md-list-text-container">
          <h2>
              <a href="#" target="_blank">
              {{ neissCase.title}}
               </a>
         </h2>
          <span>Treatment Date: {{neissCase.treatmentDate}}</span>
          <p>{{neissCase.narrative.join().toLowerCase()}}</p>
         </div>
         
      </md-list-item>
      <md-divider class="md-inset"></md-divider>

 </md-list>
 </md-card>
 </div>
</template>

<script>
import {eventBus} from '../../main'
export default {
  name: 'neissListResults',
  components: {

  },
  props:{
      response:{
      required:false
      }
  },
  computed:{
   filteredNeissData: function(){
      var that = this
      that.neiss = []
      var responseData = that.response.hits.hits;
      console.log(responseData)
      for (var r = 0; r < responseData.length; r++) {
            var data = responseData[r]._source
            var type = responseData[r]._type
           
            //console.log(data);
            if(type==="neissreport"){
               that.neiss.push(data)
            }
    }
    return that.neiss
    }
  },
  data: function() {
    return {
      neiss:[]
    }
  },
  methods: {
    
  },
 
  created: function(){
       console.log('i was just created');
       eventBus.$on('newSearchRequested',function(searchData){
           console.log(searchData);
           
       })
  }
}
</script>

<style lang="css">
</style>
