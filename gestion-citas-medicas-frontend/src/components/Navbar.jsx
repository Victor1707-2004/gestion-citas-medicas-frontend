import React from 'react'
import { NavLink } from 'react-router-dom'

const LinkItem = ({to, children}) => (
  <NavLink to={to} className={({isActive}) => isActive ? 'active' : undefined}>
    {children}
  </NavLink>
)

export default function Navbar(){
  return (
    <nav>
      <LinkItem to="/">Inicio</LinkItem>
      <LinkItem to="/pacientes">Pacientes</LinkItem>
      <LinkItem to="/medicos">Médicos</LinkItem>
      <LinkItem to="/citas">Citas</LinkItem>
      <LinkItem to="/consultas">Consultas</LinkItem>
    </nav>
  )
}
