<template>
  <div>
    <h1>Datos desde Firestore</h1>

    <ul>
      <li v-for="animal in animales" :key="animal.id">
        {{ animal.nombre }}
        <button @click="eliminarAnimal(animal.id)">Eliminar</button>
      </li>
    </ul>

    <input v-model="nuevoAnimal" placeholder="Agregar nuevo animal" />
    <button @click="agregarAnimal">Agregar</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { db } from "../firebase/firebaseConfig.js";
import { addDoc, collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const animales = ref([]);
const nuevoAnimal = ref("");

// Cargar animales desde Firestore
const cargarAnimales = async () => {
  const animalesRef = collection(db, "animales");
  const query = await getDocs(animalesRef);
  animales.value = query.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
};
cargarAnimales();


const agregarAnimal = async () => {
  if (nuevoAnimal.value.trim() !== "") {
    const animal = {
      nombre: nuevoAnimal.value,
      done: false
    };
    await addDoc(collection(db, "animales"), animal);
    nuevoAnimal.value = "";
    cargarAnimales();
  }
};


const eliminarAnimal = async (id) => {
  await deleteDoc(doc(db, "animales", id));
  cargarAnimales();
};
</script>
