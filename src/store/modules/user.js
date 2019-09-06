import { login, logout, getInfo } from '@/api/user';
import router, { resetRouter } from '@/router';

const states = {
  token: '',
  name: '',
  avatar: '',
  phone: '',
  role: '',
  email: '',
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_PHONE: (state, phone) => {
    state.phone = phone;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLE: (state, role) => {
    state.role = role;
  },
  SET_EMAIL: (state, email) => {
    state.email = email;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password })
        .then((response) => {
          const { data } = response;
          commit('SET_TOKEN', data.token);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then((response) => {
          const { data } = response;

          if (!data) {
            reject(new Error('验证失败，请重新登录'));
          }

          const {
            role, name, avatar, phone, email,
          } = data;

          // role must be a non-empty string
          if (!role) {
            reject(new Error('获取用户信息：用户必须分配角色'));
          }

          commit('SET_ROLE', role);
          commit('SET_NAME', name);
          commit('SET_AVATAR', avatar);
          commit('SET_PHONE', phone);
          commit('SET_EMAIL', email);
          resolve(data);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit('SET_TOKEN', '');
          commit('SET_ROLE', '');
          resetRouter();
          resolve();
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '');
      commit('SET_ROLE', '');
      resolve();
    });
  },

  // dynamically modify permissions
  changeRole({ commit, dispatch }, newRole) {
    return new Promise(async (resolve) => {
      const token = `${newRole}-token`;

      commit('SET_TOKEN', token);

      const { role } = await dispatch('getInfo');

      resetRouter();

      // generate accessible routes map based on role
      const accessRoutes = await dispatch('permission/generateRoutes', role, { root: true });

      // dynamically add accessible routes
      router.addRoutes(accessRoutes);

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true });

      resolve();
    });
  },
};

export default {
  namespaced: true,
  state: states,
  mutations,
  actions,
};
