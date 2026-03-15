import { useState, type FormEvent } from 'react'
import type { Note } from '../types/note'

type NoteFormData = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>

type Props = {
  initialValues?: Partial<Note>
  onSubmit: (data: NoteFormData) => void
  submitLabel?: string
}

export default function NoteForm({
  initialValues = {},
  onSubmit,
  submitLabel = 'Save',
}: Props) {
  const [title, setTitle] = useState(initialValues.title ?? '')
  const [body, setBody] = useState(initialValues.body ?? '')
  const [tags, setTags] = useState(initialValues.tags?.join(', ') ?? '')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onSubmit({
      title,
      body,
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      pinned: initialValues.pinned ?? false,
    })
  }

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className="form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title…"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          name="body"
          className="form-input form-textarea"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your note…"
          rows={10}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="tags">Tags</label>
        <input
          id="tags"
          name="tags"
          type="text"
          className="form-input"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="tag1, tag2, tag3"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        {submitLabel}
      </button>
    </form>
  )
}
