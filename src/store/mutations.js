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
  setPictureToEdit(state, data) {
    state.pictureToEdit = data;
  },
  setLoading(state, value) {
    state.loading = value;
  },
  setProgressMessage(state, value) {
    state.progressMessage = value;
  },
  setCurrentSurveys(state, value) {
    state.currentSurveys = value;
  },
};

export default muttations;
