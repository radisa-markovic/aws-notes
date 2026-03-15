import { Link, useParams, Navigate } from 'react-router-dom'
import { useNotes } from '../hooks/useNotes'

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function NoteDetail() {
  const { id } = useParams<{ id: string }>()
  const { notes } = useNotes()

  const note = notes.find((n) => n.id === id)
  if (!note) return <Navigate to="/404" replace />

  return (
    <main className="page page--narrow">
      <Link to="/" className="back-link">
        ← Back
      </Link>

      <article className="note-detail">
        <header className="note-detail__header">
          <h1>{note.title}</h1>
          {note.pinned && <span className="pin-badge">📌 Pinned</span>}
        </header>

        <p className="note-detail__meta">
          Created: {formatDate(note.createdAt)} &nbsp;·&nbsp; Updated:{' '}
          {formatDate(note.updatedAt)}
        </p>

        {note.tags && note.tags.length > 0 && (
          <div className="note-detail__tags">
            {note.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="note-detail__body">{note.body}</div>

        <footer className="note-detail__footer">
          <Link to={`/notes/${note.id}/edit`} className="btn btn-primary">
            Edit
          </Link>
        </footer>
      </article>
    </main>
  )
}
