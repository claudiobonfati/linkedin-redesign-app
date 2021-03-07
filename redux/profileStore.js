import { createStore, action } from 'easy-peasy';

const profileStore = createStore({
  user: {
    profile: null,
    setProfile: action((state, payload) => {
      state.profile = payload;
    }),
  },
});

export default profileStore;
