<template>
    <div>

  <md-card>
  <md-list v-for="inc in incidents" :key="inc.incidentReportNumber" >

      <md-list-item>
        <md-avatar>
          <md-icon class="md-size-2x md-warn">cached</md-icon>
        </md-avatar>
        <div  class="md-list-text-container">
          <h2><a v-bind:href="inc.uRL" target="_blank">{{inc.title}}</a></h2>
          <span>Incident Report Date: {{inc.incidentReportDate}}</span>
          <p>{{inc.description}}</p>
          <!--Products-->
          <md-list-item md-expand-multiple>
          <span>Products</span>
          <md-list-expand>
           <md-list v-for="incp in inc.products">
                 <md-list-item class="md-dense md-inset ">
                 <span >{{incp.type}}</span>
               </md-list-item>
           </md-list>
         </md-list-expand>
       </md-list-item>
       <!--Hazards-->
       <md-list-item md-expand-multiple>
         <span>Injuries</span>
         <md-list-expand>
          <md-list v-for="inc in incp.injuries">
              <md-list-item class="md-inset" >
              <span >{{inc.name}}</span>
            </md-list-item>
        </md-list>
      </md-list-expand>
    </md-list-item >
         </div>
          <a class="md-icon-button md-list-action" v-bind:href="incident.uRL" target="_blank">
            <md-icon class="md-primary">arrow_forward</md-icon>
          </a>
      </md-list-item>
      <md-divider class="md-inset"></md-divider>

 </md-list>
 </md-card>
 </div>

</template>
 <script>
 export default{
     name:'incidentListResults',
     components:{

     },
     prop:{
         incident:{
         type:Array,
         required:true
         }
     },
     computed:{

     },
     data:()=> {
         incidents:[]
     },
     methods:{

     }
 }
 </script>
 <style lang="css">
</style>
 
