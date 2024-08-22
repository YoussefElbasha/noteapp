'use client'

import { createContext, use, useContext, useEffect, useState } from 'react'
import { Editor, useEditor } from '@tiptap/react'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle, { TextStyleOptions } from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import CharacterCount from '@tiptap/extension-character-count'
import Underline from '@tiptap/extension-underline'
import { useLiveQuery } from 'dexie-react-hooks'
import { db, Note } from '@/database/db.model'
import { useDebouncedCallback } from 'use-debounce'
import { Markdown } from 'tiptap-markdown'
import Image from '@tiptap/extension-image'
import ImageResize from 'tiptap-extension-resize-image'

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
  Underline,
  Markdown,
  Image.configure({
    allowBase64: true,
    HTMLAttributes: {
      class: 'min-h-[100px] max-h-[500px] ml-[50%] translate-x-[-50%] my-2',
    },
  }),
  // ImageResize
  // BubbleMenu.configure({
  //   element: document.querySelector('.menu'),
  // }),
]

export const defaultContent = {
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
      'tiptap prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none bg-transparent text-text-dark overflow-y-auto min-h-[calc(100vh-2.62rem-1.25rem-1.25rem-1.5rem-5rem)] overflow-x-hidden',
  },
}

// min-h-[calc(100vh-2.62rem-1.25rem-1.25rem-1.5rem)]

type EditorStates = {
  editor: Editor | null
  currentNote: Note | undefined
  activePages: number[]
  currentNoteUpdatedAt: Date | undefined
  initialized: boolean
}

type EditorActions = {
  setCurrentNote: (newNote: Note | undefined) => void
  closeActivePage: (id: number) => void
  deleteNote: (id: number | undefined) => void
  addNewNote: () => void
  setInitialized: (initizalized: boolean) => void
}

type EditorContext = EditorStates & EditorActions

export const EditorContext = createContext<EditorContext>({
  editor: null,
  currentNote: undefined,
  setCurrentNote: () => {},
  activePages: [],
  closeActivePage: () => {},
  addNewNote: () => {},
  deleteNote: () => {},
  currentNoteUpdatedAt: undefined,
  initialized: false,
  setInitialized: () => {},
})

export const EditorContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const notesList = useLiveQuery(() => db.userNotes.toArray())

  const [currentNote, setNote] = useState<Note | undefined>(undefined)
  const [activePages, setActivePages] = useState<number[]>([])

  const [currentNoteUpdatedAt, setCurrentNoteUpdatedAt] = useState<
    Date | undefined
  >(undefined)

  const [initialized, setInitialized] = useState<boolean>(false)

  const setCurrentNote = (newNote: Note | undefined) => {
    // TODO: check the logic of this
    if (!newNote || !newNote.id) {
      setNote(undefined)
      editor?.commands.setContent(defaultContent)
      return
    }

    const oldNoteId = currentNote?.id

    if (!oldNoteId) {
      db.userNotes.update(newNote.id, {
        lastOpenedAt: new Date(),
      })
      setNote(newNote)
      editor?.commands.setContent(newNote.content)
      setCurrentNoteUpdatedAt(newNote.updatedAt)
      setActivePages([newNote.id])
      return
    }

    if (!activePages.includes(newNote.id)) {
      if (activePages.length >= 7) {
        const newArray = [...activePages]
        newArray[activePages.indexOf(oldNoteId)] = newNote.id
        setActivePages(newArray)
      } else {
        const newActivePages = [...activePages, newNote.id]
        setActivePages(newActivePages)
      }
    }

    db.userNotes.update(newNote.id, {
      lastOpenedAt: new Date(),
    })
    setNote(newNote)
    editor?.commands.setContent(newNote.content)
    setCurrentNoteUpdatedAt(newNote.updatedAt)
  }

  const closeActivePage = (id: number) => {
    if (id === currentNote?.id) {
      if (activePages.length > 1) {
        db.userNotes
          .get(activePages.filter((noteId) => id !== noteId)[0])
          .then((note) => {
            setCurrentNote(note)
            const newActivePages = activePages.filter((pageId) => pageId !== id)
            setActivePages(newActivePages)
          })
      } else {
        setCurrentNote(undefined)
      }
    }

    const newActivePages = activePages.filter((pageId) => pageId !== id)
    setActivePages(newActivePages)
  }

  const addNewNote = async () => {
    const newNoteId = await db.userNotes.add({
      title: '',
      content: defaultContent,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastOpenedAt: new Date(),
    })

    const note = db.userNotes.get(newNoteId).then((note) => {
      setCurrentNote(note)
      setCurrentNoteUpdatedAt(note?.updatedAt)
      editor?.commands.setContent(defaultContent)
    })
  }

  const deleteNote = (id: number | undefined) => {
    if (!id) return

    db.userNotes.delete(id)

    closeActivePage(id)

    // if (id === currentNote?.id) {
    //   if (notesList && notesList?.length > 1) {
    //     setCurrentNote(notesList?.[0])
    //   } else {
    //     setCurrentNote(undefined)
    //   }
    // }
  }

  // useEffect(() => {
  //   const notes = db.userNotes.toArray().then((notes) => {
  //     if (notes?.length !== 0) {
  //       if (!notes[0] || !notes[0].id) {
  //         return
  //       }
  //       setCurrentNote(notes[0])
  //     }
  //   })
  // }, [])

  const debounced = useDebouncedCallback((value) => {
    const updatedAt = new Date()
    db.userNotes.update(currentNote?.id, {
      content: value.editor.getJSON(),
      updatedAt: updatedAt,
    })
    setCurrentNoteUpdatedAt(updatedAt)
  }, 1000)

  const editor = useEditor({
    extensions: extensions,
    content: currentNote?.content || defaultContent,
    editorProps: editorProps,
    onUpdate: (value) => debounced(value),
  })

  useEffect(() => {
    const latestOpenedNote = db.userNotes
      .orderBy('lastOpenedAt')
      .last()
      .then((note) => {
        setCurrentNote(note)
        setInitialized(true)
      })
      .catch((err) => {
        console.log('err', err)
      })
  }, [editor])

  return (
    <EditorContext.Provider
      value={{
        editor,
        currentNote,
        setCurrentNote,
        activePages,
        closeActivePage,
        addNewNote,
        deleteNote,
        currentNoteUpdatedAt,
        initialized,
        setInitialized,
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}

export const useEditorContext = () => {
  const editor = useContext(EditorContext)

  if (!editor) {
    throw new Error(
      'useEditorContext must be used within a EditorContextProvider'
    )
  }

  return editor
}
