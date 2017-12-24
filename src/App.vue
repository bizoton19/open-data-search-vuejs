<template>
<div id="app" class="container">
  
  <img src="./assets/logo.png">
  <md-boards :md-auto="true" :md-infinite="false" :md-duration="20000" :md-swipeable="true" :md-controls="true">
    <md-board id="slide1">
      <h4>Welcome to the unified open data search tool</h4>
    </md-board>

    <md-board id="slide2">
      <h4>
      You can start by looking at our data inventories<md-icon class="md-size-1x md-accent">view_day</md-icon> and their discriptions.
    </h4>
    </md-board>

    <md-board id="slide3">
      <h4>You can also navigate to your reporting
  section to generate <md-icon class="md-size-1x md-accent">receipt</md-icon> reports,
   <md-icon class="md-size-1x md-accent">timeline</md-icon>
  charts and graphs.</h4>
    </md-board>
  </md-boards>

  <router-view></router-view>
 
</div>
</template>

<script>
import searchInitiator from './components/SearchInitiator'
export default {
  name: 'app' // ,
  //components: {
  //search
  //}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
