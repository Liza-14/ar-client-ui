/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
import VueCookies from 'vue-cookies';

const api = process.env.VUE_APP_API_URL;

const actions = {
  login(context, loginForm) {
    fetch(
      `${api}/api/login`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginForm),
      },
    )
      .then((res) => res.json())
      .then((data) => {
        context.commit('setUser', data.user);
        VueCookies.set('token', data.token, '1d');
        VueCookies.set('id', data.user.id, '1d');
      });
  },
  register(context, loginForm) {
    fetch(
      `${api}/api/reg`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginForm),
      },
    )
      .then((res) => res.json())
      .then((data) => {
        context.commit('setUser', data.user);
        VueCookies.set('token', data.token, '1d');
        VueCookies.set('id', data.user.id, '1d');
      });
  },
  getUserData(context, payload) {
    fetch(
      `${api}/api/user/${VueCookies.get('id')}`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${VueCookies.get('token')}`,
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        context.commit('setUser', data);
      });
  },
  loadAllExhibitions(context, payload) {
    fetch(`${api}/api/exhibitions`)
      .then((res) => res.json())
      .then((data) => context.commit('setExhibitions', data));
  },
  loadExhibitionById(context, id) {
    const item = context.state.exhibitions.find((x) => x.id.toString() === id.toString());

    if (item) {
      context.commit('setExhibitionToEdit', item);
    } else {
      fetch(`${api}/api/exhibition/${id}`)
        .then((res) => res.json())
        .then((data) => context.commit('setExhibitionToEdit', data));
    }
  },
  logout(context, payload) {
    VueCookies.remove('token');
    VueCookies.remove('id');
    context.commit('removeUser');
  },
  createExhibition(context, payload) {
    fetch(
      `${api}/api/exhibition`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${VueCookies.get('token')}`,
        },
        body: JSON.stringify(payload),
      },
    )
      .then((res) => res.json())
      .then((data) => {
        context.commit('addExhibition', data);
      });
  },
  loadPictures(context, id) {
    fetch(`${api}/api/pictures/${id}`)
      .then((res) => res.json())
      .then((pictures) => context.commit('setExhibitionPictures', { pictures, id }));
  },
  uploadPicture(context, payload) {
    const formData = new FormData();
    formData.append('imagefile', payload.imagefile);
    formData.append('name', payload.name);
    formData.append('description', payload.description);
    formData.append('authorid', payload.authorid);
    formData.append('exhibitionid', payload.exhibitionid);
    fetch(
      `${api}/api/picture`,
      {
        method: 'post',
        body: formData,
        headers: {
          Accept: '*/*',
          authorization: `Bearer ${VueCookies.get('token')}`,
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        context.dispatch('loadPictures', payload.exhibitionid);
      });
  },
  uploadArVideo(context, payload) {
    const formData = new FormData();
    formData.append('videofile', payload.videoFile);
    formData.append('pictureId', payload.pictureId);
    fetch(
      `${api}/api/video`,
      {
        method: 'post',
        body: formData,
        headers: {
          Accept: '*/*',
          authorization: `Bearer ${VueCookies.get('token')}`,
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        context.dispatch('loadPictures', payload.exhibitionid);
      });
  },
  deletePicture(context, payload) {
    fetch(
      `${api}/api/picture/${payload.id}`,
      {
        method: 'delete',
        headers: {
          authorization: `Bearer ${VueCookies.get('token')}`,
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        context.dispatch('loadPictures', payload.exhibitionid);
      });
  },
  generateTargets(context, exhibitionId) {
    context.commit('setLoading', true);

    function readProgress(reader) {
      reader.read().then((c) => {
        const decoder = new TextDecoder();
        const m = decoder.decode(c.value || new Uint8Array(), { stream: !c.done });
        context.commit('setProgressMessage', m);
        if (c.done) {
          context.commit('setProgressMessage', '');
          context.commit('setLoading', false);
        } else {
          context.commit('setProgressMessage', '0');
          context.commit('setLoading', true);
          readProgress(reader);
        }
      });
    }

    fetch(
      `${api}/api/generate/${exhibitionId}`,
      {
        method: 'post',
        headers: {
          authorization: `Bearer ${VueCookies.get('token')}`,
        },
        timeout: 2400000,
      },
    )
      .then((res) => readProgress(res.body.getReader()));
  },
};

export default actions;
