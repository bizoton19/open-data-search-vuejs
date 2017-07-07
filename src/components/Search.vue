<template>
  <div id="search">

    <md-card>
      <md-card-header> Search Recalls</md-card-header>
      <md-card-actions>
        <md-input-container md-inline>
          <md-input
          placeholder="Search..."
          v-model="searchquery"
           id="searchquery">
         </md-input>
          <a href="#" v-on:click="search(searchquery)">
            <md-icon class="md-size-1x md-accent"
            >search</md-icon></a>

        </md-input-container>
      </md-card-actions>
    </md-card>
    <br>
    <p v-if="hasResults">Result Count: {{resultCount}}</p>
    <p v-if="noResult && isSearchComplete">
      <md-icon class="md-size-1x md-warn">help</md-icon> search returned no result please try another query</p>
    <p v-if="!searchButtonclicked || searchquery===null">
      <md-icon class="md-size-1x md-warn">help_outline</md-icon>
      {{searchquery?'Query=' + searchquery:'Please enter a query'}}
    </p>
    <md-spinner :md-size="60" md-indeterminate class="md-warn" v-if="searchButtonclicked && !isSearchComplete"></md-spinner>
    <searchListResults :recall="recall" v-if="hasResults">
    </searchListResults>

  </div>
</template>

<script>
//import searchGridResults from './SearchGridResults'
import searchListResults from './SearchListResults'

export default {
  name: 'search',
  components: {
    //  searchGridResults,
    searchListResults

  },
  data: function () {
    return {
      recall: [],
      searchquery: null,
      recallData: [],
      hasResults: false,
      resultCount: 0,
      isSearchComplete:false,
      searchButtonclicked: false
    }
  },
  computed: {
    noResult: function () {
      return (this.searchButtonclicked && !this.hasResults && this.searchquery!=null)
    }
  },
  methods: {
    search: function (searchquery) {
      var that = this;
      that.searchButtonclicked = true;
      that.isSearchComplete=false;
      that.hasResults = false;
      that.resultCount = 0;
      that.recallData = [];
      that.recall = [];
      if(searchquery===null){
          that.isSearchComplete= true;
        return;
      }

      that.$http.get('https://www.saferproducts.gov/RestWebServices/RecallReduced?format=json')
        .then(function (response) {
          var responseData = response.data;
          console.log('responsdata is ' + responseData);
          var counter=0;
          for (var r = 0; r < responseData.length; r++) {
            if (responseData[r].Title != null) {
              if (responseData[r].Title.toLowerCase().includes(searchquery.toLowerCase())) {
                console.log(responseData[r].Title)
                if(that.recall.length <50){
                console.log('not over limit  length is'+ that.recall.length);
                that.recall.push(responseData[r])
                that.hasResults = true
                that.resultCount = that.recall.length
              }
              else{
                console.log('over limit, len is: '+ that.recall.length);
                that.isSearchComplete= true;
                return;
              }
              }
            }
          }
          that.isSearchComplete= true;
        });
    }
  },
  mounted: function () {
    this.recallData = [{
      'RecallID': 8083,
      'RecallNumber': '17181',
      'RecallDate': '2017-06-27T00:00:00',
      'Description': 'This recall involves TNT Red, White, & Blue Smoke fireworks. The recalled fireworks are pyrotechnic devices that make smoke when lit. They were sold in a bag containing three canisters: one red, one blue and one white. Each colored smoke firework is a cardboard cylinder tube that measures about 1 inch in diameter and 5 inches long. The TNT logo, “Red, White & Blue Smoke” and UPC number 027736036561 appear on the packaging.',
      'URL': 'https://www.cpsc.gov/Recalls/2017/Fireworks-Recalled-By-American-Promotional-Events',
      'Title': 'Fireworks Recalled By American Promotional Events Due to Burn and Injury Hazards',
      'Hazards': [{
        'Name': 'The fuel gauge retainer can collapse and leak fuel, posing a fire hazard.',
        'HazardTypeID': '34'
      },
      {
        'Name': 'The fuel gauge retainer can collapse and leak fuel, posing a electrical hazard.',
        'HazardTypeID': '32'
      }

      ],
      'Products': [{
        'Type': 'Gas lighters',
        'CategoryID': '1158'
      },
      {
        'Type': 'Fuel Gauge',
        'CategoryID': '1159'
      }
      ]
    },
    {
      'RecallID': 8081,
      'RecallNumber': '17751',
      'RecallDate': '2017-06-20T00:00:00',
      'Description': 'This recall involves 2017 Mule™ utility vehicles, Teryx® and Teryx4™ recreational off-highway vicles, and Brute Force® 750 all-t The 2017 Mule utility vehicle is a four-wheel off-highway vehicle with side by side seating for two to six people and automotive style controls. The model name is printed on the right and left front fender. For the Mule SX series and the Mule 4000 series, the vehicle identification number (VIN) is located under the seat. For the Pro models, the VIN is located on the steel frame between the right front lower A-arm mounts. The 2017 Teryx recreational off-highway vehicle is a four-wheel off-highway vehicle with seating for two or four people and automotive style controls. The model name is printed on the right and left front fender. The VIN is located on the steel frame between the right front lower A-arm mounts.The 2017 Brute Force 750 4x4i all-terrain vehicle is a four-wheel off-highway vehicle with seating for one person. The model name is printed on the right and left front fender. The VIN is located on the steel frame between the left front lower A-arm mounts. The vehicles were sold in various colors. Model Year Model VIN Range Brute Force 750 all-terrain vehicles 2017 BRUTE FORCE 750 4x4i EPS JKAVFDL11HB506155 - JKAVFDG10HB512832 2017 BRUTE FORCE 750 4x4i EPS Camo 2017 BRUTE FORCE 750 4x4i EPS 2017 BRUTE FORCE 750 4x4i Teryx recreational off-highway vehicles 2017 TERYX JKBRFCH17HB501204 - JKBRTCG10HB507422 2017 TERYX LE 2017 TERYX Camo 2017 TERYX4 2017 TERYX4 LE 2017 TERYX4 Camo Mule utility vehicles 2017 MULE SX 4x4 JKBAFSL19HB500313 - JK1AFCR14HB531308 2017 MULE SX 2017 MULE SX 4x4 XC 2017 MULE SX 4x4 XC Camo 2017 MULE SX 4x4 XC SE 2017 MULE SX 4x4 SE 2017 MULE 4010 4X4 2017 MULE 4000 2017 MULE 4010 Trans4x4 2017 MULE 4010 Trans4x4 Camo 2017 MULE 4010 4x4 SE 2017 MULE 4010 Trans4x4 SE 2017 MULE PRO-FXT 2017 MULE PRO-FXT EPS 2017 MULE PRO-FXT EPS LE 2017 MULE PRO-FXT EPS Camo 2017 MULE PRO-FX 2017 MULE PRO-FX ESP 2017 MULE PRO-FX ESP LE 2017 MULE PRO-FX ESP Camo 2017 MULE PRO-FXT Ranch Edition 2017 MULE PRO-FX Ranch Edition 2017 MULE PRO-DXT 2017 MULE PRO-DXT EPS 2017 MULE PRO-DXT EPS LE 2017 MULE PRO-DX 2017 MULE PRO-DX EPS',
      'URL': 'https://www.cpsc.gov/Recalls/2017/Kawasaki-Recalls-Utility-Vehicles-Recreational-Off-Highway-Vehicles-and-All-Terrain-Vehicles-Recall-Alert',
      'Title': 'Kawasaki Recalls Utility Vehicles, Recreational Off-Highway Vehicles and All-Terrain Vehicles Due to Fire Hazard (Recall Alert)',
      'Hazards': [{
        'Name': 'The fuel gauge retainer can collapse and leak fuel, posing a fire hazard.',
        'HazardTypeID': '34'
      },
      {
        'Name': 'The fuel gauge retainer can collapse and leak fuel, posing a electrical hazard.',
        'HazardTypeID': '32'
      }
      ],
      'Products': [{
        'Type': 'Gas lighters',
        'CategoryID': '1158'
      },
      {
        'Type': 'Fuel Gauge',
        'CategoryID': '1159'
      }
      ]
    }
    ]

  }
}


</script>
