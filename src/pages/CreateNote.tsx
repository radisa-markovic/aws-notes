import { useNavigate } from 'react-router-dom'
import NoteForm from '../components/NoteForm'
import { useNotes } from '../hooks/useNotes'
import type { Note } from '../types/note'

export default function CreateNote() {
  const { addNote } = useNotes()
  const navigate = useNavigate()

  function handleSubmit(data: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) {
    addNote(data)
    navigate('/')
  }

  return (
    <main className="page page--narrow">
      <h1>New Note</h1>
      <NoteForm onSubmit={handleSubmit} submitLabel="Create" />
    </main>
  )
}
