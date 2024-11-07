<template>
  <div>
    <h2>se ve el componente</h2>
    <ul>
      <li v-for="usuario in usuarios" :key="usuario.id">
        {{ usuario.nombre }}
        <button @click="editUsuario(usuario)">Editar</button>

        <button @click="deleteUsuario(usuario.id)">Eliminar</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const usuarios = computed(() => store.state.usuarios.usuarios);

    onMounted(() => {
      store.dispatch("usuarios/fetchUsuarios");
    });

    const deleteUsuario = (id) => {
      store.dispatch("usuarios/deleteUsuario", id);
    };

    const editUsuario = (usuario) => {
      store.dispatch('usuarios/setSelectedUser', usuario)
    };

    return {
      usuarios,
      deleteUsuario,
      editUsuario,
    };
  }
};





</script>
