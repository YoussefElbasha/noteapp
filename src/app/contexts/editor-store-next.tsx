import { Note } from '@/database/db.model'
import { Editor } from '@tiptap/react'
import { createStore } from 'zustand'

export type EditorState = {
  editor: Editor | null
  currentNote: Note | undefined
}

export type EditorActions = {
  setCurrentNote: (newNote: Note) => void
}

export type EditorStore = EditorState & EditorActions

export const defaultInitState: EditorState = {
  editor: null,
  currentNote: undefined,
}

export const createEditorStore = (
  initState: EditorState = defaultInitState
) => {
  return createStore<EditorStore>()((set) => ({
    ...initState,
    setCurrentNote: (newNote) =>
      set({
        currentNote: newNote,
      }),
  }))
}
