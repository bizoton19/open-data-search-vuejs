<template>
 <div id="searchAggs">
<div class="well" >
    <span v-for="partitions in typePartitions" :key="partitions.key" >
     <span><h4><input type="checkbox" id="type" :value="partitions.key" v-model="aggsCheckboxes">
     <label class="label label-default" for="type-check">{{partitions.key| capitalize}}({{partitions.doc_count}})</label></h4></span>
     </span>
     <span v-for="partitions in sourcePartitions" :key="partitions.key" >
     <h4><input type="checkbox" id="artifactsource"  :value="partitions.key" v-model="aggsCheckboxes">
      <label class="label label-default" for="source-check">{{partitions.key | capitalize}}({{partitions.doc_count}})</label></h4>
      </span>
 <p>{{aggsCheckboxes}}</p>
</div>
    </div>

    
 </div>
</template>
<script>
import { eventBus } from "../main";
export default {
  name: "SearchAggregation",
  components: {
    eventBus
  },
  data: function() {
    return {
      aggsCheckboxes: [],
      aggregations: {
        artifactTypes: [],
        artifactSources: []
      },
      hasResult:false
    };
  },
  computed: {
    typePartitions: function() {
      return this.aggregations.artifactTypes;
    },
    sourcePartitions: function() {
      return this.aggregations.artifactSources;
    }
  },

  methods: {},
  created: function() {
    var that = this;
    eventBus.$on("noResult",(hasResult)=>{//move this to pre created
     that.hasResult = hasResult
     console.log('SearchAggregation Created and has result is : '+that.hasResult)
    })
    
      console.log('SearchAggregation Created and has result is : '+that.hasResult+' new aggs received ')
    eventBus.$on("newAggsReceived", aggs => {
      
      that.aggregations.artifactTypes = aggs.artifact_type.buckets;
      that.aggregations.artifactSources = aggs.artifact_source.buckets;
    });
    
  }
};
</script>

