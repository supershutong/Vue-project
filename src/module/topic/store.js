import { fetchItems } from "./api/api"

export const LIST_TYPE = {
  TOP: "top",
  HOT: "hot",
  NEW: "new"
}

export const store = {
  namespaced: true,
  state: {
    activeType: LIST_TYPE.TOP,
    top: {
      items: [],
      pageInfo: {}
    },
    hot: {
      items: [],
      pageInfo: {}
    },
    new: {
      items: [],
      pageInfo: {}
    }
  },
  mutations: {
    SET_ACTIVE_TYPE: (state, { type }) => {
      state.activeType = type
    },
    SET_LIST: (state, { items, pageInfo }) => {
      state[state.activeType].pageInfo = pageInfo
      items.forEach(item => {
        state[state.activeType].items.push(item)
      })
    }
  },
  actions: {
    FETCH_LIST_DATA: async ({ commit, state }, { type }) => {
      commit("SET_ACTIVE_TYPE", { type })
      const after = state[type].pageInfo.endCursor || 0
      const { items, pageInfo } = await fetchItems({ type, after })
      return commit("SET_LIST", { items, pageInfo })
    }
  }
}
