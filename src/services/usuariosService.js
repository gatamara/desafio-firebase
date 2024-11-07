import { db } from "@/firebase/firebaseConfig";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";

export const getUsersFromFirestore = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "usuarios"));
    const usuarios = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(usuarios);
    return usuarios;


  } catch (error) {
    console.error("Error al obtener usuarios de Firestore: ", error);
    throw new Error("No se pudo obtener los usuarios de Firestore");
  }
};

export const deleteUserFromFirestore = async (id) =>{
  await deleteDoc(doc(db, "usuarios", id));
}
export const addUserToFirestore = async (nombre) =>{
  const docRef = await addDoc(collection(db, "usuarios"), { nombre })
  console.log(docRef);
  return docRef.id

}

export const updateUserFromFirestore =async (usuario) =>{
  await updateDoc(doc(db, "usuarios", usuario.id), { nombre: usuario.nombre });
}
