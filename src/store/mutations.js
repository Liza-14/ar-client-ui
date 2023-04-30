/* eslint-disable no-param-reassign */
const muttations = {
  setUser(state, user) {
    state.user = user;
  },
  setExhibitions(state, data) {
    state.exhibitions = data;
  },
  addExhibition(state, data) {
    state.exhibitions.push(data);
  },
  removeUser(state) {
    state.user = null;
  },
  setExhibitionPictures(state, payload) {
    state.pictures[payload.id] = payload.pictures;
  },
  setExhibitionToEdit(state, data) {
    state.exhibitionToEdit = data;
  },
  setLoading(state, value) {
    state.loading = value;
  },
};

export default muttations;
