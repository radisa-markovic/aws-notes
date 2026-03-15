import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        📝 MILAN TAROT Notes
      </Link>
      <NavLink to="/notes/new" className="btn btn-primary">
        + New Note
      </NavLink>
    </nav>
  )
}
