import { useState } from 'react';
import { Registro } from '../types/Registro';

const Formulario = () => {
  const [formData, setFormData] = useState<Registro>({
    id: '',
    nombre: '',
    edad: 0,
    genero: '',
    descripcion: '',
    fecha: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'edad' ? Number(value) : value });
  };

  return (
    <form>
      nombre<br />
      <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} /><br />

      edad<br />
      <input type="number" name="edad" value={formData.edad} onChange={handleChange} /><br />

      genero<br />
      <select name="genero" value={formData.genero} onChange={handleChange}>
        <option value="">Seleccione género</option>
        <option value="Hombre">Hombre</option>
        <option value="Mujer">Mujer</option>
        <option value="Prefiero no decir">Prefiero no decir</option>
      </select><br />

      fecha de nacimiento<br />
      <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} /><br />

      descripción<br />
      <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} /><br />

      <button type="submit">Agregar</button>
    </form>
  );
};

export default Formulario;
