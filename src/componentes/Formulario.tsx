import { useState, useEffect } from 'react';
import { Registro } from '../types/Registro';

interface Props {
  onAgregar: (reg: Registro) => void;
  registroEditando?: Registro | null;
  onActualizar: () => void;
}

const Formulario = ({ onAgregar, registroEditando, onActualizar }: Props) => {
  const [formData, setFormData] = useState<Registro>({
    id: '',
    nombre: '',
    edad: 0,
    genero: '',
    descripcion: '',
    fecha: ''
  });

  const [errorNombre, setErrorNombre] = useState('');
  const [errorEdad, setErrorEdad] = useState('');

  useEffect(() => {
    if (registroEditando) {
      setFormData(registroEditando);
    }
  }, [registroEditando]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'edad' ? Number(value) : value
    }));

    
    if (name === 'nombre') {
      if (value.trim().length < 3) {
        setErrorNombre('El nombre debe tener al menos 3 caracteres');
      } else {
        setErrorNombre('');
      }
    }

    
    if (name === 'edad') {
      if (Number(value) <= 0) {
        setErrorEdad('La edad debe ser mayor a 0');
      } else {
        setErrorEdad('');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.nombre.trim().length < 3) {
      setErrorNombre('El nombre debe tener al menos 3 caracteres');
      return;
    }

    if (formData.edad <= 0) {
      setErrorEdad('La edad debe ser mayor a 0');
      return;
    }

    if (
      !formData.nombre ||
      !formData.genero ||
      !formData.descripcion ||
      !formData.fecha
    ) {
      alert('Todos los campos son requeridos');
      return;
    }

    const nuevoRegistro = {
      ...formData,
      id: formData.id || Date.now().toString()
    };

    onAgregar(nuevoRegistro);

    setFormData({
      id: '',
      nombre: '',
      edad: 0,
      genero: '',
      descripcion: '',
      fecha: ''
    });

    setErrorNombre('');
    setErrorEdad('');
    onActualizar();
  };

  return (
    <form onSubmit={handleSubmit}>
      nombre<br />
      <input
        type="text"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
      /><br />
      {errorNombre && <span style={{ color: 'red' }}>{errorNombre}</span>}<br />

      edad<br />
      <input
        type="number"
        name="edad"
        value={formData.edad}
        onChange={handleChange}
        required
      /><br />
      {errorEdad && <span style={{ color: 'red' }}>{errorEdad}</span>}<br />

      genero<br />
      <select
        name="genero"
        value={formData.genero}
        onChange={handleChange}
        required
      >
        <option value="">Seleccione género</option>
        <option value="Hombre">Hombre</option>
        <option value="Mujer">Mujer</option>
        <option value="Prefiero no decir">Prefiero no decir</option>
      </select><br />

      fecha de nacimiento<br />
      <input
        type="date"
        name="fecha"
        value={formData.fecha}
        onChange={handleChange}
        required
      /><br />

      descripción<br />
      <textarea
        name="descripcion"
        value={formData.descripcion}
        onChange={handleChange}
        required
      /><br />

      <button type="submit">
        {formData.id ? 'Actualizar' : 'Agregar'}
      </button>
    </form>
  );
};

export default Formulario;
