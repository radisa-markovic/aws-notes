import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="page page--center">
      <h2>404 — Page not found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">
        Go home
      </Link>
    </main>
  )
}
