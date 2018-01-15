<template lang="html">
  
  <div>
    <md-tabs class="md-transparent" md-centered md-elevation="2">
  <md-tab md-label="Data (LIST)" md-icon="note">
    <md-ink-ripple />
  <md-card  >
  <md-list v-for="rec in results" :key="rec.uuid"  >
     
      <md-list-item>
        <md-avatar>
          <md-icon class="md-size-2x green">cached</md-icon>
        </md-avatar>
        <div  class="md-list-text-container">
          <h2><a v-bind:href="rec.url" target="_blank">{{rec.title}}</a></h2>
          <h3>Category: {{rec.category}}</h3>
          <p>Type: {{rec.type|capitalize}}</p>
          
          <span>{{rec.type|capitalize}} Date: {{rec.artifactDate}}</span>
          <p>{{rec.description}}</p>
         </div>
          <a class="md-icon-button md-list-action" v-bind:href="rec.url" target="_blank">
            <md-icon class="md-primary">arrow_forward</md-icon>
          </a>
      </md-list-item>
      
      <md-divider class="md-inset"></md-divider>
    

 </md-list>
 </md-card>
  </md-tab>

  <md-tab md-label="Images" md-icon="collections">
    <md-list v-for="(rec,position) in results" :key="rec.uuid"  >
      <md-list-item>
  <md-card md-with-hover v-for="(img, index) in rec.images">

  <md-card-media md-ratio="4:3">
   <a :href="rec.url" target=_blank> <img :src="img.uRL" alt="open data"></a>
  </md-card-media>

  <md-card-content>
    {{rec.title}}
  </md-card-content>

  <md-card-actions>
    <md-button>Go</md-button>
    
  </md-card-actions>
</md-card>

   </md-list-item>
  </md-list>
 </md-card>
 </md-tab>
 </md-tabs>
 
 </div>

 </div>
</template>

<script>
import { eventBus } from "../main";
export default {
  name: "searchResults",
  components: {},
  props: {
    results: {
      required: true
    }
  },

  computed: {},
  data: function() {
    return {};
  },
  methods: {},
  created: function() {}
};
</script>

<style lang="css">

</style>
