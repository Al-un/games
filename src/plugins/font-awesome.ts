import Vue from 'vue';

// FontAwesome
// https://github.com/FortAwesome/vue-fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCoffee,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faChevronDown,
  faHome,
  faSignOutAlt,
  faUndo
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faCoffee,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faChevronDown,
  faHome,
  faSignOutAlt,
  faUndo
);
Vue.component('fa-icon', FontAwesomeIcon);
