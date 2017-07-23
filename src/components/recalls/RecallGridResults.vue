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
    console.log('Created searchGridResults...')
    // this.$http.get('https://www.saferproducts.gov/RestWebServices/RecallReduced?format=json')
    //  .then(function (response) {
    this.recall = [{
      'RecallID': 8083,
      'RecallNumber': '17181',
      'RecallDate': '2017-06-27T00:00:00',
      'Description': 'This recall involves TNT Red, White, & Blue Smoke fireworks. The recalled fireworks are pyrotechnic devices that make smoke when lit. They were sold in a bag containing three canisters: one red, one blue and one white. Each colored smoke firework is a cardboard cylinder tube that measures about 1 inch in diameter and 5 inches long. The TNT logo, “Red, White & Blue Smoke” and UPC number 027736036561 appear on the packaging.',
      'URL': 'https://www.cpsc.gov/Recalls/2017/Fireworks-Recalled-By-American-Promotional-Events',
      'Title': 'Fireworks Recalled By American Promotional Events Due to Burn and Injury Hazards'
    },
    {
      'RecallID': 8081,
      'RecallNumber': '17751',
      'RecallDate': '2017-06-20T00:00:00',
      'Description': 'This recall involves 2017 Mule™ utility vehicles, Teryx® and Teryx4™ recreational off-highway vicles, and Brute Force® 750 all-t The 2017 Mule utility vehicle is a four-wheel off-highway vehicle with side by side seating for two to six people and automotive style controls. The model name is printed on the right and left front fender. For the Mule SX series and the Mule 4000 series, the vehicle identification number (VIN) is located under the seat. For the Pro models, the VIN is located on the steel frame between the right front lower A-arm mounts. The 2017 Teryx recreational off-highway vehicle is a four-wheel off-highway vehicle with seating for two or four people and automotive style controls. The model name is printed on the right and left front fender. The VIN is located on the steel frame between the right front lower A-arm mounts.The 2017 Brute Force 750 4x4i all-terrain vehicle is a four-wheel off-highway vehicle with seating for one person. The model name is printed on the right and left front fender. The VIN is located on the steel frame between the left front lower A-arm mounts. The vehicles were sold in various colors. Model Year Model VIN Range Brute Force 750 all-terrain vehicles 2017 BRUTE FORCE 750 4x4i EPS JKAVFDL11HB506155 - JKAVFDG10HB512832 2017 BRUTE FORCE 750 4x4i EPS Camo 2017 BRUTE FORCE 750 4x4i EPS 2017 BRUTE FORCE 750 4x4i Teryx recreational off-highway vehicles 2017 TERYX JKBRFCH17HB501204 - JKBRTCG10HB507422 2017 TERYX LE 2017 TERYX Camo 2017 TERYX4 2017 TERYX4 LE 2017 TERYX4 Camo Mule utility vehicles 2017 MULE SX 4x4 JKBAFSL19HB500313 - JK1AFCR14HB531308 2017 MULE SX 2017 MULE SX 4x4 XC 2017 MULE SX 4x4 XC Camo 2017 MULE SX 4x4 XC SE 2017 MULE SX 4x4 SE 2017 MULE 4010 4X4 2017 MULE 4000 2017 MULE 4010 Trans4x4 2017 MULE 4010 Trans4x4 Camo 2017 MULE 4010 4x4 SE 2017 MULE 4010 Trans4x4 SE 2017 MULE PRO-FXT 2017 MULE PRO-FXT EPS 2017 MULE PRO-FXT EPS LE 2017 MULE PRO-FXT EPS Camo 2017 MULE PRO-FX 2017 MULE PRO-FX ESP 2017 MULE PRO-FX ESP LE 2017 MULE PRO-FX ESP Camo 2017 MULE PRO-FXT Ranch Edition 2017 MULE PRO-FX Ranch Edition 2017 MULE PRO-DXT 2017 MULE PRO-DXT EPS 2017 MULE PRO-DXT EPS LE 2017 MULE PRO-DX 2017 MULE PRO-DX EPS',
      'URL': 'https://www.cpsc.gov/Recalls/2017/Kawasaki-Recalls-Utility-Vehicles-Recreational-Off-Highway-Vehicles-and-All-Terrain-Vehicles-Recall-Alert',
      'Title': 'Kawasaki Recalls Utility Vehicles, Recreational Off-Highway Vehicles and All-Terrain Vehicles Due to Fire Hazard (Recall Alert)'
    }]
  }
}
</script>

<style lang='css'>
</style>
