<template lang="html">
  <div>
   <md-ink-ripple />
  <md-card  >
     
  <md-list v-for="rec in recall" :key="rec.recallNumber" >
     
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

export default {
  name: 'recallListResults',
  components: {

  },
  props:{
    recall:{
      type:Array,
      required:true
    }
  },
  computed:{
       
  },
  data: function() {
    return {
      recalls: []
    }
  },
  methods: {
       
  },
}
</script>

<style lang="css">
</style>
