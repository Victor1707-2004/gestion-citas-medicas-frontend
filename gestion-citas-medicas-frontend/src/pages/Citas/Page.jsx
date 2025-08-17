import React, { useEffect, useState } from 'react'
import { Citas, Pacientes, Medicos } from '../../services/api'
import { useCrud, ErrorBox, Loading } from '../../components/crud-helpers'

export default function CitasPage(){
  const { items, form, editingId, loading, error, onChange, save, edit, remove, reset } =
    useCrud(Citas, { paciente: '', medico: '', fecha: '', hora: '', estado: 'Pendiente' })

  const [pacientes, setPacientes] = useState([])
  const [medicos, setMedicos] = useState([])

  useEffect(() => {
    Pacientes.list().then(setPacientes)
    Medicos.list().then(setMedicos)
  }, [])

  return (
    <div>
      <h2>Citas</h2>
      <div className="card">
        <form onSubmit={save} className="toolbar" style={{flexWrap:'wrap'}}>
          <select name="paciente" value={form.paciente||''} onChange={onChange} required>
            <option value="">Paciente...</option>
            {pacientes.map(p => <option key={p.id} value={p.id}>{p.nombres} {p.apellidos}</option>)}
          </select>
          <select name="medico" value={form.medico||''} onChange={onChange} required>
            <option value="">Médico...</option>
            {medicos.map(m => <option key={m.id} value={m.id}>{m.nombres} {m.apellidos} — {m.especialidad}</option>)}
          </select>
          <input name="fecha" type="date" value={form.fecha||''} onChange={onChange} required />
          <input name="hora" type="time" value={form.hora||''} onChange={onChange} required />
          <select name="estado" value={form.estado||'Pendiente'} onChange={onChange}>
            <option>Pendiente</option>
            <option>Confirmada</option>
            <option>Cancelada</option>
            <option>Atendida</option>
          </select>
          <button type="submit">{editingId ? 'Actualizar' : 'Crear'}</button>
          {editingId && <button type="button" onClick={reset}>Cancelar</button>}
        </form>
        <ErrorBox error={error} />
        <Loading show={loading} />
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th><th>Paciente</th><th>Médico</th><th>Fecha</th><th>Hora</th><th>Estado</th><th></th>
          </tr>
        </thead>
        <tbody>
          {items.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{typeof c.paciente === 'object' ? `${c.paciente.nombres} ${c.paciente.apellidos}` : c.paciente}</td>
              <td>{typeof c.medico === 'object' ? `${c.medico.nombres} ${c.medico.apellidos}` : c.medico}</td>
              <td>{c.fecha}</td>
              <td>{c.hora}</td>
              <td>{c.estado}</td>
              <td>
                <button onClick={() => edit(c.id)}>Editar</button>
                <button onClick={() => remove(c.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
