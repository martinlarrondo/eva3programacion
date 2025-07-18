import { useEffect, useState } from 'react';
import { Registro } from './types/Registro';
import Formulario from './componentes/Formulario';
import Lista from './componentes/Lista';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc 
} from "firebase/firestore";
import { db } from './firebase'; 
function App() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [registroEditando, setRegistroEditando] = useState<Registro | null>(null);
   const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    const cargarRegistros = async () => {
      setLoading(true);
      setError(null);
      try {
        const querySnapshot = await getDocs(collection(db, "registros"));
        const listaRegistros = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Registro[];
        setRegistros(listaRegistros);
      } catch (error) {
        setError("Error al cargar registros");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    cargarRegistros();
  }, []);


  const agregarRegistro = async (nuevo: Registro) => {
    try {
      const { id, ...data } = nuevo;
      if (id) {
        
        const docRef = doc(db, "registros", id);
        await updateDoc(docRef, data);
        setRegistros(registros.map(r => (r.id === id ? nuevo : r)));
      } else {
        
        const docRef = await addDoc(collection(db, "registros"), data);
        setRegistros([...registros, { ...nuevo, id: docRef.id }]);
      }
    } catch (error) {
      console.error("Error al guardar registro:", error);
    }
  };

   
  const eliminarRegistro = async (id: string) => {
    try {
      await deleteDoc(doc(db, "registros", id));
      setRegistros(registros.filter(r => r.id !== id));
    } catch (error) {
      console.error("Error al eliminar registro:", error);
    }
  };

  const editarRegistro = (reg: Registro) => setRegistroEditando(reg);
  const limpiarEdicion = () => setRegistroEditando(null);

  return (
    <>
      <Formulario onAgregar={agregarRegistro} registroEditando={registroEditando} onActualizar={limpiarEdicion} />
      <Lista registros={registros} onEliminar={eliminarRegistro} onEditar={editarRegistro} />
    </>
  );
}

export default App;
