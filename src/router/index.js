import Vue from 'vue'
import Router from 'vue-router'
import SearchPageContainer from '@/components/SearchPageContainer'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'searchPageContainer',
        component: SearchPageContainer
    }]
})