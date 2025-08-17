import React, { useEffect, useState } from 'react'
import { Consultas, Citas } from '../../services/api'
import { useCrud, ErrorBox, Loading } from '../../components/crud-helpers'

export default function ConsultasPage(){
  const { items, form, editingId, loading, error, onChange, save, edit, remove, reset } =
    useCrud(Consultas, { cita: '', motivo:'', diagnostico:'', tratamiento:'' })

  const [citas, setCitas] = useState([])

  useEffect(() => { Citas.list().then(setCitas) }, [])

  return (
    <div>
      <h2>Consultas</h2>
      <div className="card">
        <form onSubmit={save} className="toolbar" style={{flexWrap:'wrap'}}>
          <select name="cita" value={form.cita||''} onChange={onChange} required>
            <option value="">Cita...</option>
            {citas.map(c => <option key={c.id} value={c.id}>#{c.id} — {c.fecha} {c.hora}</option>)}
          </select>
          <input name="motivo" placeholder="Motivo" value={form.motivo||''} onChange={onChange} required />
          <input name="diagnostico" placeholder="Diagnóstico" value={form.diagnostico||''} onChange={onChange} required />
          <input name="tratamiento" placeholder="Tratamiento" value={form.tratamiento||''} onChange={onChange} required />
          <button type="submit">{editingId ? 'Actualizar' : 'Crear'}</button>
          {editingId && <button type="button" onClick={reset}>Cancelar</button>}
        </form>
        <ErrorBox error={error} />
        <Loading show={loading} />
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th><th>Cita</th><th>Motivo</th><th>Diagnóstico</th><th>Tratamiento</th><th></th>
          </tr>
        </thead>
        <tbody>
          {items.map(x => (
            <tr key={x.id}>
              <td>{x.id}</td>
              <td>{typeof x.cita === 'object' ? `#${x.cita.id}` : x.cita}</td>
              <td>{x.motivo}</td>
              <td>{x.diagnostico}</td>
              <td>{x.tratamiento}</td>
              <td>
                <button onClick={() => edit(x.id)}>Editar</button>
                <button onClick={() => remove(x.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
