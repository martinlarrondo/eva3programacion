import Formulario from './components/Formulario';
import Lista from './components/Lista';
import { useEffect, useState } from 'react';
import { Registro } from './types/Registro';
import Formulario from './componentes/Formulario';
import Lista from './componentes/Lista';

function App() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [registroEditando, setRegistroEditando] = useState<Registro | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("registros");
    if (data) setRegistros(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("registros", JSON.stringify(registros));
  }, [registros]);

  const agregarRegistro = (nuevo: Registro) => {
    const yaExiste = registros.some(r => r.id === nuevo.id);
    if (yaExiste) {
      setRegistros(registros.map(r => r.id === nuevo.id ? nuevo : r));
    } else {
      setRegistros([...registros, { ...nuevo, id: Date.now().toString() }]);
    }
  };

  const eliminarRegistro = (id: string) => {
    setRegistros(registros.filter(r => r.id !== id));
  };

  const editarRegistro = (reg: Registro) => {
    setRegistroEditando(reg);
  };

  const limpiarEdicion = () => setRegistroEditando(null);

  return (
    <>
      <Formulario onAgregar={agregarRegistro} registroEditando={registroEditando} onActualizar={limpiarEdicion} />
      <Lista registros={registros} onEliminar={eliminarRegistro} onEditar={editarRegistro} />
    </>
  );
}

export default App;
