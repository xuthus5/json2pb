import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import VueClipboard from 'vue-clipboard2'

import VueHighlightJS from 'vue-highlight.js';

// Highlight.js languages (Only required languages)
import protobuf from 'highlight.js/lib/languages/protobuf';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'highlight.js/styles/default.css';

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueClipboard)
Vue.use(VueHighlightJS, {
	languages: {
		protobuf
	}
});

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
