import { useState, useMemo } from 'react'
import NoteCard from '../components/NoteCard'
import { useNotes } from '../hooks/useNotes'

export default function Home() {
  const { notes, deleteNote, pinNote } = useNotes()
  const [search, setSearch] = useState('')

  const filteredNotes = useMemo(() => {
    const q = search.toLowerCase()
    return notes
      .filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.body.toLowerCase().includes(q) ||
          n.tags?.some((t) => t.toLowerCase().includes(q)),
      )
      .slice()
      .sort((a, b) => {
        if (!!b.pinned !== !!a.pinned) return b.pinned ? 1 : -1
        return b.updatedAt.localeCompare(a.updatedAt)
      })
  }, [notes, search])

  return (
    <main className="page">
      <div className="page-header">
        <h1>All Notes</h1>
        <input
          className="search-input"
          type="search"
          placeholder="Search notes…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredNotes.length === 0 ? (
        <p className="empty-state">
          {search ? 'No notes match your search.' : 'No notes yet. Create one!'}
        </p>
      ) : (
        <section className="note-grid">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={deleteNote}
              onPin={pinNote}
            />
          ))}
        </section>
      )}
    </main>
  )
}
