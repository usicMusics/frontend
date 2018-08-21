// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// Add Module
import axios from 'axios'
import JSAlert from 'js-alert'
import moment from 'moment'
import VModal from 'vue-js-modal'

// stylesheet
import 'vue-loading-overlay/dist/vue-loading.min.css'
import 'aplayer/dist/Aplayer.min.css'
// import 'fontawesome/css/all.css'

Vue.prototype.$baseURL = 'https://usicmusic.herokuapp.com'

// console.log(Vue.prototype.$baseURL)
axios.defaults.baseURL = Vue.prototype.$baseURL
axios.defaults.headers.common['x-access-token'] = localStorage['token']
Vue.prototype.$moment = moment
Vue.prototype.$http = axios
Vue.prototype.$js = JSAlert

Vue.use(VModal)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
