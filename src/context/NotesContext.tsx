import { createContext, useState, useCallback, type ReactNode } from 'react'
import type { Note, NotesContextValue } from '../types/note'

const STORAGE_KEY = 'aws-notes'

function loadFromStorage(): Note[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Note[]) : []
  } catch {
    return []
  }
}

function persist(notes: Note[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
}

export const NotesContext = createContext<NotesContextValue | null>(null)

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>(loadFromStorage)

  const addNote = useCallback(
    (draft: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
      const now = new Date().toISOString()
      const note: Note = {
        ...draft,
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
      }
      setNotes((prev) => {
        const next = [note, ...prev]
        persist(next)
        return next
      })
    },
    [],
  )

  const updateNote = useCallback((id: string, patch: Partial<Note>) => {
    setNotes((prev) => {
      const next = prev.map((n) =>
        n.id === id ? { ...n, ...patch, updatedAt: new Date().toISOString() } : n,
      )
      persist(next)
      return next
    })
  }, [])

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => {
      const next = prev.filter((n) => n.id !== id)
      persist(next)
      return next
    })
  }, [])

  const pinNote = useCallback(
    (id: string) => {
      setNotes((prev) => {
        const next = prev.map((n) =>
          n.id === id
            ? { ...n, pinned: !n.pinned, updatedAt: new Date().toISOString() }
            : n,
        )
        persist(next)
        return next
      })
    },
    [],
  )

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote, pinNote }}>
      {children}
    </NotesContext.Provider>
  )
}
