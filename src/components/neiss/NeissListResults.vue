<template lang="html">
  <div>

  <md-card>
  <md-list v-for="neissCase in neiss" :key="neissCase.cpscCaseNumber" >

      <md-list-item>
        <md-avatar>
          <md-icon class="md-size-2x md-primary">accessibility</md-icon>
        </md-avatar>
        <div  class="md-list-text-container">
          <h2>
              <a href="#" target="_blank">
              Emergency room injury involving {{ neissCase.products[0].description.toLowerCase()}}, {{ neissCase.products[1].description.toLowerCase()}}
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

export default {
  name: 'neissListResults',
  components: {

  },
  props:{
    neiss:{
      type:Array,
      required:true
    }
  },
  computed:{

  },
  data: function() {
    return {
      
    }
  },
  methods: {

  },
}
</script>

<style lang="css">
</style>
