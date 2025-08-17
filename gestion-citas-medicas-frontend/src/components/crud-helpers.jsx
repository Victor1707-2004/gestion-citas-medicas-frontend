import React, { useEffect, useState } from 'react'

export function useCrud(service, initial = {}){
  const [items, setItems] = useState([])
  const [form, setForm] = useState(initial)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const load = async () => {
    setLoading(true); setError(null)
    try {
      const data = await service.list()
      setItems(data)
    } catch (e) {
      setError(e?.response?.data || e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const onChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({...prev, [name]: value}))
  }

  const reset = () => { setForm(initial); setEditingId(null) }

  const save = async (evt) => {
    evt.preventDefault()
    setLoading(true); setError(null)
    try {
      if (editingId) {
        await service.update(editingId, form)
      } else {
        await service.create(form)
      }
      reset(); await load()
    } catch (e) {
      setError(e?.response?.data || e.message)
    } finally {
      setLoading(false)
    }
  }

  const edit = async (id) => {
    setLoading(true); setError(null)
    try {
      const data = await service.retrieve(id)
      setForm(data); setEditingId(id)
    } catch (e) {
      setError(e?.response?.data || e.message)
    } finally {
      setLoading(false)
    }
  }

  const remove = async (id) => {
    if (!confirm('¿Eliminar este registro?')) return
    setLoading(true); setError(null)
    try {
      await service.destroy(id)
      await load()
    } catch (e) {
      setError(e?.response?.data || e.message)
    } finally {
      setLoading(false)
    }
  }

  return { items, form, editingId, loading, error, onChange, save, edit, remove, reset }
}

export function ErrorBox({error}){
  if(!error) return null
  const msg = typeof error === 'string' ? error : JSON.stringify(error)
  return <div className="card" style={{borderColor: '#ef4444'}}>❌ {msg}</div>
}

export function Loading({show}){
  if(!show) return null
  return <div className="card">Cargando...</div>
}
