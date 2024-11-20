<template>
  <div>
    <input v-model="nombre" placeholder="Nombre del usuario" />
    <input v-model="email" placeholder="Email del usuario" />
    <button @click="submit">{{ editMode ? 'Actualizar' : 'Agregar' }}</button>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const nombre = ref("");
const email = ref("");
const editMode = ref(false);
const usuarioId = ref(null);


const resetForm = () => {
  nombre.value = "";
  email.value = "";
  editMode.value = false;
  usuarioId.value = null;
};
const setUserForEdit = (usuario) => {
  nombre.value = usuario.nombre;
  email.value = usuario.email;
  editMode.value = true;
  usuarioId.value = usuario.id;
};

watch(
  () => store.state.usuarios.selectedUser,
  (usuario) => {
    if (usuario) {
      setUserForEdit(usuario);
    } else {
      resetForm();
    }
  }
);

const submit = () => {
  if (editMode.value) {
    store.dispatch("usuarios/updateUsuario", { id: usuarioId.value, nombre: nombre.value, email: email.value });
  } else {
    store.dispatch("usuarios/addUsuario", { nombre: nombre.value, email: email.value });
  }
  resetForm();
};

</script>
