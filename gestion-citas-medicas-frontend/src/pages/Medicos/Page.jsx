import React from 'react'
import { Medicos } from '../../services/api'
import { useCrud, ErrorBox, Loading } from '../../components/crud-helpers'

export default function MedicosPage(){
  const { items, form, editingId, loading, error, onChange, save, edit, remove, reset } =
    useCrud(Medicos, { nombres:'', apellidos:'', especialidad:'', correo:'' })

  return (
    <div>
      <h2>Médicos</h2>
      <div className="card">
        <form onSubmit={save} className="toolbar" style={{flexWrap:'wrap'}}>
          <input name="nombres" placeholder="Nombres" value={form.nombres||''} onChange={onChange} required />
          <input name="apellidos" placeholder="Apellidos" value={form.apellidos||''} onChange={onChange} required />
          <input name="especialidad" placeholder="Especialidad" value={form.especialidad||''} onChange={onChange} required />
          <input name="correo" placeholder="Correo" type="email" value={form.correo||''} onChange={onChange} required />
          <button type="submit">{editingId ? 'Actualizar' : 'Crear'}</button>
          {editingId && <button type="button" onClick={reset}>Cancelar</button>}
        </form>
        <ErrorBox error={error} />
        <Loading show={loading} />
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th><th>Nombre</th><th>Especialidad</th><th>Correo</th><th></th>
          </tr>
        </thead>
        <tbody>
          {items.map(m => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.nombres} {m.apellidos}</td>
              <td>{m.especialidad}</td>
              <td>{m.correo}</td>
              <td>
                <button onClick={() => edit(m.id)}>Editar</button>
                <button onClick={() => remove(m.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
