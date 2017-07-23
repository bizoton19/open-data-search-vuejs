<template>
<div>
   <recallSearchRefiner>
   </recallSearchRefiner>
    <recallListResults>
    </recallListResults>
</div>
</template>
<script>
import recallListResults from './RecallListResults'
import recallGridResults from './RecallGridResults'
import recallSearchRefiner from './RecallSearchRefiner'
import recallService from './RecallService'
export default {
    components:{
        recallListResults,
        recallGridResults,
        recallSearchRefiner,
        recallService
    },
     prop:{
         searchquery:{
         type:string,
         required:true
         }
     },
     computed:{

     },
     data:()=> {
         recall:[]
     },
     methods:{

     }
}
</script>
<style>

</style>

