/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
import VueCookies from 'vue-cookies';

const actions = {
  login(context, loginForm) {
    fetch(
      'http://192.168.1.122:9000/api/login',
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
      `http://192.168.1.122:9000/api/user/${VueCookies.get('id')}`,
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
    fetch('http://192.168.1.122:9000/api/exhibitions')
      .then((res) => res.json())
      .then((data) => context.commit('setExhibitions', data));
  },
  loadExhibitionById(context, id) {
    const item = context.state.exhibitions.find((x) => x.id.toString() === id.toString());

    if (item) {
      context.commit('setExhibitionToEdit', item);
    } else {
      fetch(`http://192.168.1.122:9000/api/exhibition/${id}`)
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
      'http://192.168.1.122:9000/api/exhibition',
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
    fetch(`http://192.168.1.122:9000/api/pictures/${id}`)
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
      'http://192.168.1.122:9000/api/picture',
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
      'http://192.168.1.122:9000/api/video',
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
      `http://192.168.1.122:9000/api/picture/${payload.id}`,
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
    fetch(
      `http://192.168.1.122:9000/api/generate/${exhibitionId}`,
      {
        method: 'post',
        headers: {
          authorization: `Bearer ${VueCookies.get('token')}`,
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        context.commit('setLoading', false);
        console.log(data);
      });
  },
};

export default actions;
