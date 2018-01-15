// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import vueResource from 'vue-resource'
import lodash from 'lodash'
import VueLodash from 'vue-lodash/dist/vue-lodash.min'

Vue.config.productionTip = false
Vue.use(VueMaterial)
Vue.use(vueResource)
Vue.use(VueLodash, lodash)
    /* eslint-disable no-new */
export const eventBus = new Vue({
    methods: {
        publishSearchAggregations(aggs) {
            this.$emit('newAggsReceived', aggs)
        },
        publishPageSelection(pageNumber){
            this.$emit('newPageSelected',pageNumber)
        }


    }
})
Vue.filter('capitalize',(value)=>{
    if(!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
})
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})