import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import PacientesPage from './pages/Pacientes/Page'
import MedicosPage from './pages/Medicos/Page'
import CitasPage from './pages/Citas/Page'
import ConsultasPage from './pages/Consultas/Page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'pacientes', element: <PacientesPage /> },
      { path: 'medicos', element: <MedicosPage /> },
      { path: 'citas', element: <CitasPage /> },
      { path: 'consultas', element: <ConsultasPage /> }
    ]
  }
])

export default router
