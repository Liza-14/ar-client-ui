import { createStore } from 'vuex';
import muttations from './mutations';
import actions from './actions';

// Create a new store instance.
const store = createStore({
  state() {
    return {
      user: null,
    };
  },
  mutations: muttations,
  actions,
});

export default store;
