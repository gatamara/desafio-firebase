<template>
  <div>
    <input v-model="nombre" placeholder="Nombre del usuario" />
    <button @click="submit">{{ editMode ? 'Actualizar' : 'Agregar' }}</button>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const nombre = ref("");
const editMode = ref(false);
const usuarioId = ref(null);

const setUserForEdit = (usuario) => {
  nombre.value = usuario.nombre;
  editMode.value = true;
  usuarioId.value = usuario.id;
};


const resetForm = () => {
  nombre.value = "";
  editMode.value = false;
  usuarioId.value = null;
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
    store.dispatch("usuarios/updateUsuario", { id: usuarioId.value, nombre: nombre.value });
  } else {
    store.dispatch("usuarios/addUsuario", nombre.value);

  }
  resetForm();
};

</script>
