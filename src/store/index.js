import { createStore } from "vuex";
import usuarios from "./usuarios";

const store = createStore({
  modules: {
    usuarios,
  },
});

export default store;
