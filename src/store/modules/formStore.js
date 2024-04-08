const state = {
  formLists: [],
};
const getters = {
  getFormLists: (state) => state.formLists,
};

const mutations = {
  CREATE_FORM(state, data) {
    state.formLists.push(data);
  },

  DELETE_FORM(state, data) {
    let formListIndex = state.formLists.findIndex((item) => item._id == data);
    if (formListIndex >= 0) {
      state.formLists.splice(formListIndex, 1);
    }
  },

  UPDATE_FORM_LISTS(state, data) {
    console.log("kya yeh chala");
    let formListIndex = state.formLists.findIndex(
      (item) => item._id == data._id
    );
    if (formListIndex >= 0)
      state.formLists[formListIndex] = {
        ...state.formLists[formListIndex],
        ...data,
      };
  },
};

export default {
  state,
  getters,
  mutations,
};
