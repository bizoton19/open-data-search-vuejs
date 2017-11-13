<template>
 <div id="searchAggs">
    <span v-for="partitions in typePartitions" :key="partitions.key" >
     <span><input type="checkbox" id="type" :value="partitions.key" v-model="aggsCheckboxes">
     <label for="type-check">{{partitions.key}}({{partitions.count}})</label></span>
     </span>
     <span v-for="partitions in sourcePartitions" :key="partitions.key" >
     <input type="checkbox" id="artifactsource"  :value="partitions.key" v-model="aggsCheckboxes">
      <label for="source-check">{{partitions.key}}({{partitions.count}})</label>
      </span>
 <p>{{aggsCheckboxes}}</p>
 </div>
</template>
<script>
export default {
  name: "SearchAggregation",
  components: {},
  props: {
    aggs: {
      required: true
    }
  },
  computed: {
    typePartitions: function() {
      var artifactTypes =
        this.aggs.artifact_type.buckets;
        artifactTypes.forEach((element)=>
           this.aggregations.artifactType.push({
          key: element.key,
          count: element.doc_count
        }))
        
     
      return this.aggregations.artifactType;
    },
    sourcePartitions: function() {
      var artifactSources =
        this.aggs.artifact_source.buckets;
        artifactSources.forEach((source)=>
          this.aggregations.artifactSource.push({
            key:source.key,
            count:source.doc_count
          }))
      return this.aggregations.artifactSource;
    }
  },
  data: function() {
    return {
      aggsCheckboxes:[],
      aggregations: {
        artifactType: [],
        artifactSource: []
      }
    };
  },
  methods: {
    
  }
};
</script>

