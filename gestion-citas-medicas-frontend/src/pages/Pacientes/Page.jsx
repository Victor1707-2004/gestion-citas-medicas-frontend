import React from 'react'
import { Pacientes } from '../../services/api'
import { useCrud, ErrorBox, Loading } from '../../components/crud-helpers'

export default function PacientesPage(){
  const { items, form, editingId, loading, error, onChange, save, edit, remove, reset } =
    useCrud(Pacientes, { nombres:'', apellidos:'', cedula:'', correo:'', telefono:'' })

  return (
    <div>
      <h2>Pacientes</h2>
      <div className="card">
        <form onSubmit={save} className="toolbar" style={{flexWrap:'wrap'}}>
          <input name="nombres" placeholder="Nombres" value={form.nombres||''} onChange={onChange} required />
          <input name="apellidos" placeholder="Apellidos" value={form.apellidos||''} onChange={onChange} required />
          <input name="cedula" placeholder="Cédula" value={form.cedula||''} onChange={onChange} required />
          <input name="correo" placeholder="Correo" type="email" value={form.correo||''} onChange={onChange} required />
          <input name="telefono" placeholder="Teléfono" value={form.telefono||''} onChange={onChange} required />
          <button type="submit">{editingId ? 'Actualizar' : 'Crear'}</button>
          {editingId && <button type="button" onClick={reset}>Cancelar</button>}
        </form>
        <ErrorBox error={error} />
        <Loading show={loading} />
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th><th>Nombre</th><th>Cédula</th><th>Correo</th><th>Teléfono</th><th></th>
          </tr>
        </thead>
        <tbody>
          {items.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombres} {p.apellidos}</td>
              <td>{p.cedula}</td>
              <td>{p.correo}</td>
              <td>{p.telefono}</td>
              <td>
                <button onClick={() => edit(p.id)}>Editar</button>
                <button onClick={() => remove(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
