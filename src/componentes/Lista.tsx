import { Registro } from '../types/Registro';

interface Props {
  registros: Registro[];
  onEliminar: (id: string) => void;
  onEditar: (reg: Registro) => void;
}

const Lista = ({ registros, onEliminar, onEditar }: Props) => {
  return (
    <>
      Registro<br />
      {registros.map((reg) => (
        <div key={reg.id} style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '5px' }}>
          <strong>Nombre:</strong> {reg.nombre}<br />
          <strong>Edad:</strong> {reg.edad}<br />
          <strong>Género:</strong> {reg.genero}<br />
          <strong>Fecha de nacimiento:</strong> {reg.fecha}<br />
          <strong>Descripción:</strong> {reg.descripcion}<br />
          <button onClick={() => onEditar(reg)}>Editar</button>
          <button onClick={() => onEliminar(reg.id!)}>Eliminar</button>
        </div>
      ))}
    </>
  );
};

export default Lista;
