import { useContext } from 'react'
import { NotesContext } from '../context/NotesContext'
import type { NotesContextValue } from '../types/note'

export function useNotes(): NotesContextValue {
  const ctx = useContext(NotesContext)
  if (!ctx) throw new Error('useNotes must be used inside <NotesProvider>')
  return ctx
}
