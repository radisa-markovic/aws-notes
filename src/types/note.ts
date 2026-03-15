export type Note = {
  id: string
  title: string
  body: string
  createdAt: string
  updatedAt: string
  tags?: string[]
  pinned?: boolean
}

export type NotesState = {
  notes: Note[]
}

export type NotesActions = {
  addNote: (draft: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateNote: (id: string, patch: Partial<Note>) => void
  deleteNote: (id: string) => void
  pinNote: (id: string) => void
}

export type NotesContextValue = NotesState & NotesActions
