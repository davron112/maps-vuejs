import Vue from 'vue'
import App from './App.vue'
import uswds from 'uswds'
import Element from 'element-ui'

Vue.config.productionTip = false
Vue.use(uswds)

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import vuetify from './plugins/vuetify';
import Vuetify from 'vuetify'

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

