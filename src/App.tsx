import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NotesProvider } from './context/NotesContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CreateNote from './pages/CreateNote'
import NoteDetail from './pages/NoteDetail'
import EditNote from './pages/EditNote'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <NotesProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes/new" element={<CreateNote />} />
          <Route path="/notes/:id" element={<NoteDetail />} />
          <Route path="/notes/:id/edit" element={<EditNote />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </NotesProvider>
  )
}
