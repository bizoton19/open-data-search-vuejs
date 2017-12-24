<template>
 <div id="searchAggs">
    <span v-for="partitions in typePartitions" :key="partitions.key" >
     <span><input type="checkbox" id="type" :value="partitions.key" v-model="aggsCheckboxes">
     <label for="type-check">{{partitions.key| capitalize}}({{partitions.doc_count}})</label></span>
     </span>
     <span v-for="partitions in sourcePartitions" :key="partitions.key" >
     <input type="checkbox" id="artifactsource"  :value="partitions.key" v-model="aggsCheckboxes">
      <label for="source-check">{{partitions.key | capitalize}}({{partitions.doc_count}})</label>
      </span>
 <p>{{aggsCheckboxes}}</p>
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
      }
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
    eventBus.$on("newAggsReceived", aggs => {
      var that = this;
      that.aggregations.artifactTypes = aggs.artifact_type.buckets;
      that.aggregations.artifactSources = aggs.artifact_source.buckets;
    });
  }
};
</script>

