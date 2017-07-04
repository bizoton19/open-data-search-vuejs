<template lang="html">
  <div>

  <md-card>
  <md-list v-for="rec in recall" :key="rec.RecallNumber" >

      <md-list-item>
        <md-avatar>
          <md-icon class="md-size-2x md-warn">cached</md-icon>
        </md-avatar>
        <div  class="md-list-text-container">
          <h2>{{rec.Title}}</h2>
          <span>Recall Date: {{rec.RecallDate}}</span>
          <p>{{rec.Description}}</p>
          <!--Products-->
          <md-list-item md-expand-multiple>
          <span>Products</span>
          <md-list-expand>
           <md-list v-for="recp in rec.Products">
                 <md-list-item class="md-dense md-inset ">
                 <span >{{recp.Type}}</span>
               </md-list-item>
           </md-list>
         </md-list-expand>
       </md-list-item>
       <!--Hazards-->
       <md-list-item md-expand-multiple>
       <span>Hazards</span>
       <md-list-expand>
        <md-list v-for="rech in rec.Hazards">
              <md-list-item class="md-inset" >
              <span >{{rech.Name}}</span>
            </md-list-item>
        </md-list>
      </md-list-expand>
    </md-list-item >
         </div>
          <a class="md-icon-button md-list-action" v-bind:href="rec.URL" target="_blank">
            <md-icon class="md-primary">arrow_forward</md-icon>
          </a>
      </md-list-item>
      <md-divider class="md-inset"></md-divider>

 </md-list>
 </md-card>
 </div>
</template>

<script>
import recallList from './RecallList'
export default {
  name: 'searchListResults',
  components: {
    recallList
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
  created: function() {
    console.log('Created searchListResults...')
    // this.$http.get('https://www.saferproducts.gov/RestWebServices/RecallReduced?format=json')
    //  .then(function (response) {
    //    console.log(response.data)
    //  })
   console.log(this.recallData)
   console.log(this.recall)

  }
}
</script>

<style lang="css">
</style>
