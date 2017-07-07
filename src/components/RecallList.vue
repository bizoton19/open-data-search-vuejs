<template lang="html">
  <h1>Recalls</h1>
</template>

<script>
export default {
  name: 'recallList',
  data: function () {
    return {
      recall: []
    }
  },
  methods: {

  },
  created: function () {
    console.log('Created...')
    // this.$http.get('https://www.saferproducts.gov/RestWebServices/RecallReduced?format=json')
    //  .then(function (response) {
    //    console.log(response.data)
    //  })
  }
}

</script>

<style lang="css">
</style>
