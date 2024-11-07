// store/usuarios.js
import { addUserToFirestore, deleteUserFromFirestore, getUsersFromFirestore, updateUserFromFirestore } from "@/services/usuariosService";

const state = {
  usuarios: [],
  selectedUser: null,
};

const mutations = {
  SET_USUARIOS(state, usuarios) {
    console.log('Guardando usuarios en el estado:', usuarios);
    state.usuarios = usuarios;
  },
  ADD_USUARIO(state, usuario) {
    state.usuarios.push(usuario);
  },
  REMOVE_USUARIO(state, id) {
    state.usuarios = state.usuarios.filter(usuario => usuario.id !== id);
  },
  UPDATE_USUARIO(state, updatedUsuario) {
    const index = state.usuarios.findIndex(usuario => usuario.id === updatedUsuario.id);
    if (index !== -1) {
      state.usuarios.splice(index, 1, updatedUsuario);
    }
  },
  SET_SELECTED_USER(state, usuario) {
    state.selectedUser = usuario;
  },
};

const actions = {
  async fetchUsuarios({ commit }) {
    const  usuarios  = await getUsersFromFirestore();
    console.log('usuarios en firestore',usuarios  );
    commit("SET_USUARIOS", usuarios);
  },
  async addUsuario({ commit }, nombre) {
    const id= await addUserToFirestore(nombre)
    commit("ADD_USUARIO", {id, nombre});
  },
  async deleteUsuario({ commit }, id) {
    await deleteUserFromFirestore(id)
    commit("REMOVE_USUARIO", id);
  },
  async updateUsuario({ commit }, usuario) {
    await updateUserFromFirestore(usuario)
    commit("UPDATE_USUARIO", usuario);
  },
  setSelectedUser({ commit }, usuario) {
    commit("SET_SELECTED_USER", usuario);
  },
};

const getters = {
  usuarios: (state) => state.usuarios,
  selectedUser: (state) => state.selectedUser,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
