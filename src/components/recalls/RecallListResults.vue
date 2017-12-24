<template lang="html">
  <div>
    
   <md-ink-ripple />
  <md-card  >
     
  <md-list v-for="rec in filteredRecallData" :key="rec.recallNumber"  >
     
      <md-list-item>
        <md-avatar>
          <md-icon class="md-size-2x green">cached</md-icon>
        </md-avatar>
        <div  class="md-list-text-container">
          <h2><a v-bind:href="rec.uRL" target="_blank">{{rec.title}}</a></h2>
          <span>Recall Date: {{rec.recallDate}}</span>
          <p>{{rec.description}}</p>
          <!--Products-->
          <md-list-item md-expand-multiple>
          <span>Products</span>
          <md-list-expand>
           <md-list v-for="recp in rec.products">
                 <md-list-item class="md-dense md-inset ">
                 <span >{{recp.type}}</span>
               </md-list-item>
           </md-list>
         </md-list-expand>
       </md-list-item>
       <!--Hazards-->
       <md-list-item md-expand-multiple>
         <span>Injuries</span>
         <md-list-expand>
          <md-list v-for="reci in rec.injuries">
              <md-list-item class="md-inset" >
              <span >{{reci.name}}</span>
            </md-list-item>
        </md-list>
      </md-list-expand>
    </md-list-item >
         </div>
          <a class="md-icon-button md-list-action" v-bind:href="rec.uRL" target="_blank">
            <md-icon class="md-primary">arrow_forward</md-icon>
          </a>
      </md-list-item>
      <md-divider class="md-inset"></md-divider>

 </md-list>
 </md-card>
 </div>
</template>

<script>
import { eventBus } from "../../main";
export default {
  name: "recallListResults",
  components: {},
  props: {
    response: {
      required: false
    }
  },

  computed: {
    filteredRecallData: function() {
      var that = this;
      that.recall = [];
      var responseData = that.response.hits.hits;
     
      for (var r = 0; r < responseData.length; r++) {
        var data = responseData[r]._source;
        var type = responseData[r]._type;

        if (type === "recall") {
          that.recall.push(data);
        }
      }
      return that.recall;
    }
   
  },
  data: function() {
    return {
      recall: [],
      searchData: null
    };
  },
  methods: {
    filterbyDataSetType: function(res) {
      var that = this;
      that.recall = [];
      var responseData = res.hits.hits;

      for (var r = 0; r < responseData.length; r++) {
        var data = responseData[r]._source;
        var type = responseData[r]._type;

        console.log(data);
        if (type === "recall") {
          that.recall.push(data);
        }
      }
      return that.recall;
    }
  },
  created: function(){
    console.log(" RecallListResult was just created");
  }
};
</script>

<style lang="css">

</style>
