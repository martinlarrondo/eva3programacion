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
        <div key={reg.id}>
          {reg.nombre}<br />
          {reg.edad}<br />
          {reg.genero}<br />
          {reg.fecha}<br />
          {reg.descripcion}<br />
          <button onClick={() => onEditar(reg)}>Editar</button>
          <button onClick={() => onEliminar(reg.id)}>Eliminar</button>
        </div>
      ))}
    </>
  );
};

export default Lista;
