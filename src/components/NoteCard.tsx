import { Link } from 'react-router-dom'
import type { Note } from '../types/note'

type Props = {
  note: Note
  onDelete: (id: string) => void
  onPin: (id: string) => void
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function NoteCard({ note, onDelete, onPin }: Props) {
  const preview = note.body.length > 120 ? note.body.slice(0, 120) + '…' : note.body

  return (
    <article className={`note-card${note.pinned ? ' note-card--pinned' : ''}`}>
      <header className="note-card__header">
        <h3 className="note-card__title">{note.title}</h3>
        <button
          className={`pin-btn${note.pinned ? ' pin-btn--active' : ''}`}
          onClick={() => onPin(note.id)}
          title={note.pinned ? 'Unpin' : 'Pin'}
          aria-label={note.pinned ? 'Unpin note' : 'Pin note'}
        >
          📌
        </button>
      </header>

      {note.tags && note.tags.length > 0 && (
        <div className="note-card__tags">
          {note.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      <p className="note-card__preview">{preview}</p>

      <footer className="note-card__footer">
        <time className="note-card__date">{formatDate(note.updatedAt)}</time>
        <div className="note-card__actions">
          <Link to={`/notes/${note.id}`} className="btn btn-sm">
            View
          </Link>
          <Link to={`/notes/${note.id}/edit`} className="btn btn-sm">
            Edit
          </Link>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => onDelete(note.id)}
          >
            Delete
          </button>
        </div>
      </footer>
    </article>
  )
}
