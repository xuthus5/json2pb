import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import VueClipboard from 'vue-clipboard2'

import VueHighlightJS from 'vue-highlight.js';

import VueCodemirror from 'vue-codemirror'

// import base style
import 'codemirror/lib/codemirror.css'

// Highlight.js languages (Only required languages)
import protobuf from 'highlight.js/lib/languages/protobuf';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'highlight.js/styles/default.css';

require("codemirror/mode/javascript/javascript")
import "codemirror/theme/base16-light.css";

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueClipboard)
Vue.use(VueHighlightJS, {
	languages: {
		protobuf
	}
});
Vue.use(VueCodemirror, /* {
	options: { theme: 'base16-dark', ... },
	events: ['scroll', ...]
  } */)

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
