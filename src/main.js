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

export const eventBus = new Vue()
Vue.config.productionTip = false
Vue.use(VueMaterial)
Vue.use(vueResource)
Vue.use(VueLodash, lodash)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
