<template lang='html'>

  <md-table v-once>
  <md-table-header>
    <md-table-row>
      <md-table-head >Recall Id</md-table-head>
      <md-table-head >Recall Number</md-table-head>
      <md-table-head >Recall Recall Date</md-table-head>
      <md-table-head >Url</md-table-head>
      <md-table-head >Title</md-table-head>
    </md-table-row>
  </md-table-header>

  <md-table-body>
    <md-table-row v-for="(row, index) in recall" :key="rowindex" :md-item="row">
      <md-table-cell v-for="(column, columnIndex) in row" :key="columnIndex"  v-if="columnIndex !== 'Description'">
            {{ column }}
          </md-table-cell>

    </md-table-row>
  </md-table-body>
</md-table>

</template>

<script>
// imports here
export default {
  name: 'recallGridResults',
  components: {

  },
  data: function () {
    return {
      recall: []
    }
  },
  methods: {

  },
  created: function () {
  }
}
</script>

<style lang='css'>
</style>
