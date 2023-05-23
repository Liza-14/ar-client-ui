/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
import VueCookies from 'vue-cookies';

const api = process.env.VUE_APP_API_URL;

const actions = {
  login(context, loginForm) {
    return fetch(
      `${api}/api/login`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginForm),
      },
    )
      .then(async (res) => {
        res.data = await res.json();
        return res;
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.data.error);
        }
        context.commit('setUser', res.data.user);
        VueCookies.set('token', res.data.token, '1d');
        VueCookies.set('id', res.data.user.id, '1d');
      });
  },
  register(context, loginForm) {
    return fetch(
      `${api}/api/reg`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginForm),
      },
    )
      .then(async (res) => {
        res.data = await res.json();
        return res;
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.data.error);
        }
        context.commit('setUser', res.data.user);
        VueCookies.set('token', res.data.token, '1d');
        VueCookies.set('id', res.data.user.id, '1d');
      });
  },
  getUserData(context, payload) {
    const id = VueCookies.get('id');
    if (!id) return null;
    return fetch(
      `${api}/api/user/${id}`,
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
  loadPictureById(context, id) {
    const item = Object.values(context.state.pictures)[0]?.find((x) => x.id.toString() === id.toString());

    if (item) {
      context.commit('setPictureToEdit', item);
    } else {
      fetch(`${api}/api/picture/${id}`)
        .then((res) => res.json())
        .then((data) => context.commit('setPictureToEdit', data));
    }
  },
  logout(context, payload) {
    VueCookies.remove('token');
    VueCookies.remove('id');
    context.commit('removeUser');
  },
  createExhibition(context, payload) {
    return fetch(
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
    return fetch(`${api}/api/pictures/${id}`)
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
        context.dispatch('loadPictureById', payload.pictureId);
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
  deleteVideo(context, payload) {
    fetch(
      `${api}/api/video/${payload.id}`,
      {
        method: 'delete',
        headers: {
          authorization: `Bearer ${VueCookies.get('token')}`,
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        context.dispatch('loadPictureById', payload.pictureid);
      });
  },
  deleteExhibition(context, payload) {
    return fetch(
      `${api}/api/exhibition/${payload.id}`,
      {
        method: 'delete',
        headers: {
          authorization: `Bearer ${VueCookies.get('token')}`,
        },
      },
    )
      .then(() => {
        context.dispatch('loadAllExhibitions');
        context.dispatch('loadPictures', payload.id);
      });
  },
  generateTargets(context, exhibitionId) {
    context.commit('setLoading', true);
    context.commit('setProgressMessage', '0');
    function readProgress(reader) {
      reader.read().then((c) => {
        const decoder = new TextDecoder();
        const m = decoder.decode(c.value || new Uint8Array(), { stream: !c.done });
        context.commit('setProgressMessage', m);
        if (c.done) {
          context.commit('setProgressMessage', false);
          context.commit('setLoading', false);
        } else {
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
        signal: AbortSignal.timeout(2400000),
      },
    )
      .then((res) => readProgress(res.body.getReader()));
  },
  createSurvey(context, payload) {
    return fetch(
      `${api}/api/survey`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${VueCookies.get('token')}`,
        },
        body: JSON.stringify(payload),
      },
    );
  },
  getSurveys(context, exhibitionId) {
    return fetch(`${api}/api/surveys/${exhibitionId}`)
      .then((res) => res.json())
      .then((surveys) => context.commit('setCurrentSurveys', surveys));
  },
};

export default actions;
