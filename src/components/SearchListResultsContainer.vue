<template lang="html">
  <div >

  <recallListResults :recall="dataContainer.recalls">
  </recallListResults>
  <neissListResults :neiss="dataContainer.neiss">

  </neissListResults>
 </div>
</template>

<script>
import recallListResults from './recalls/RecallListResults'
import neissListResults from './neiss/NeissListResults'

import _ from 'lodash'
export default {
  name: 'searchListResultsContainer',
  components: {
   recallListResults,
   neissListResults,
  },
  props: {
    dataContainer: {
      
      required: true
    }
  },
  computed: {

  },
  data: function () {
    return {

    }
  },
  watch: {
     
  },
}
</script>

<style lang="css">

</style>
