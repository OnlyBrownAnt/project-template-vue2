const state = () => ({
  routeToPath: '',
  routeFromPath: '',

  isHeaderShow: true, // 导航栏是否显示
  navTitle: '', // 导航栏标题

  keepAliveList: [], // keepAlive include list
  keepAliveSet: new Set([]), // keepAlive include set
})

const getters = {}

const mutations = {
  addToKeepAlive(state, value) {
    if (state.keepAliveSet.has(value)) {
      console.log(`there is already exists ${value} in the keepalive!`);
    } else {
      state.keepAliveList.push(value);
      state.keepAliveSet.add(value);
    }
  },
  removeFromKeepAlive(state, value) {
    if (state.keepAliveSet.has(value)) {
      let index = state.keepAliveList.indexOf(value);
      state.keepAliveList.splice(index, 1);
      state.keepAliveSet.delete(value);
    } else {
      console.log(`there is no ${value} in the keepalive!`);
    }
  },
  removeFromKeepAliveAll(state) {
    state.keepAliveSet.clear();
    state.keepAliveList = [];
  },
  setRouteToPath(state, value) {
    state.routeToPath = value
  },
  setRouteFromPath(state, value) {
    state.routeFromPath = value
  },
  setIsHeaderShow(state, value) {
    state.isHeaderShow = value;
  },
  setNavTitle(state, value) {
    state.navTitle = value;
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
  modules: {}
}
