<template >
<div class="phone-viewport">
<md-toolbar>
    <md-button class="md-icon-button" @click="toggleLeftSidenav">
      <md-icon>menu</md-icon>
    </md-button>

    <h2 class="md-title">Filter Bar</h2>
  </md-toolbar>
  
 <md-sidenav class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')">
    <md-toolbar class="md-large">
      <div class="md-toolbar-container">
        <h3 class="md-title">Refine</h3>
       
      </div>
     </md-toolbar>
     <div>
         <md-list v-for="dataType in dataTypes" :key="dataType">
       <md-list-item><input type="checkbox" v-bind:id="dataType" v-model="checkboxes" :value="dataType" >
     {{dataType}}</md-list-item>
     </md-list>

  <p v-if="checkboxes.length>0">Selected: {{checkboxes.join()}}</p>
  <md-button class="md-raised md-warn">Apply Filter</md-button>
        </div>
  </md-sidenav>
</div>
</template>
<script>
export default {
  name: "searchResultsRefiner",
  components: {

  },
  props: {
    dataTypes: {
      type: Array,
      required: true
    }
  },
  computed: {

  },
  data: function () {
    return {
      checkboxes:[],
     

    }
  },
   methods: {
    toggleLeftSidenav() {
      this.$refs.leftSidenav.toggle();
    },
    toggleRightSidenav() {
      this.$refs.rightSidenav.toggle();
    },
    closeRightSidenav() {
      this.$refs.rightSidenav.close();
    },
    open(ref) {
      console.log('Opened: ' + ref);
    },
    close(ref) {
      console.log('Closed: ' + ref);
    }
  }
}
</script>
<style>

</style>


