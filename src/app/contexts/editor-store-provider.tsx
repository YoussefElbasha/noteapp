'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'
import {
  type EditorStore,
  createEditorStore,
} from '@/app/contexts/editor-store-next'
import { db } from '@/database/db.model'
import { useEditor } from '@tiptap/react'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle, { TextStyleOptions } from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import CharacterCount from '@tiptap/extension-character-count'
import { useLiveQuery } from 'dexie-react-hooks'

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] } as Partial<TextStyleOptions>),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  CharacterCount,
]

const defaultContent = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
    },
  ],
}

const editorProps = {
  attributes: {
    class:
      'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none bg-red-500 text-text-dark overflow-y-auto min-h-[calc(100vh-2.62rem-1.25rem-1.25rem-1.5rem)]',
  },
}

export type EditorStoreApi = ReturnType<typeof createEditorStore>

export const EditorStoreContext = createContext<EditorStoreApi | undefined>(
  undefined
)

export interface EditorStoreProviderProps {
  children: ReactNode
}

export const EditorStoreProvider = ({ children }: EditorStoreProviderProps) => {
  const editor = useEditor({
    extensions: extensions,
    content: defaultContent,
    editorProps: editorProps,
  })

  // console.log(editor)

  const notes = useLiveQuery(() => db.userNotes.toArray())

  let currentNote

  if (notes?.length === 0) {
    db.userNotes
      .add({
        title: '',
        content: defaultContent,
        createdAt: new Date(),
      })
      .then((note) => {
        currentNote = note
      })
  } else {
    currentNote = notes?.[0]
  }

  const storeRef = useRef<EditorStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createEditorStore({
      editor: editor,
      currentNote: currentNote,
    })
  }

  return (
    <EditorStoreContext.Provider value={storeRef.current}>
      {children}
    </EditorStoreContext.Provider>
  )
}

export const useEditorStore = <T,>(selector: (store: EditorStore) => T): T => {
  const editorStoreContext = useContext(EditorStoreContext)

  if (!editorStoreContext) {
    throw new Error(`useEditorStore must be used within EditorStoreProvider`)
  }

  return useStore(editorStoreContext, selector)
}
