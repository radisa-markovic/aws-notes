import { useNavigate, useParams, Navigate } from 'react-router-dom'
import NoteForm from '../components/NoteForm'
import { useNotes } from '../hooks/useNotes'
import type { Note } from '../types/note'

export default function EditNote() {
  const { id } = useParams<{ id: string }>()
  const { notes, updateNote } = useNotes()
  const navigate = useNavigate()

  const note = notes.find((n) => n.id === id)
  if (!note) return <Navigate to="/404" replace />

  function handleSubmit(data: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) {
    updateNote(id!, data)
    navigate(`/notes/${id}`)
  }

  return (
    <main className="page page--narrow">
      <h1>Edit Note</h1>
      <NoteForm initialValues={note} onSubmit={handleSubmit} submitLabel="Update" />
    </main>
  )
}
