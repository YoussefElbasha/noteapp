'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { Editor, useEditor } from '@tiptap/react'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle, { TextStyleOptions } from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import CharacterCount from '@tiptap/extension-character-count'
import Underline from '@tiptap/extension-underline'
import { useLiveQuery } from 'dexie-react-hooks'
import { db, Note } from '@/database/db.model'
import { useDebouncedCallback, useThrottledCallback } from 'use-debounce'
import { Markdown } from 'tiptap-markdown'
import Image from '@tiptap/extension-image'

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
      class:
        'min-h-[100px] max-h-[500px] ml-[50%] translate-x-[-50%] my-4 first:mt-0',
    },
  }),
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

type EditorStates = {
  editor: Editor | null
  currentNote: Note | undefined
  activePages: number[]
  currentNoteUpdatedAt: Date | undefined
  initialized: boolean
  isSaving: boolean
}

type EditorActions = {
  setCurrentNote: (newNote: Note | undefined) => void
  closeActivePage: (id: number) => void
  deleteNote: (id: number | undefined) => void
  addNewNote: () => void
  setInitialized: (initizalized: boolean) => void
  setIsSaving: (isSaving: boolean) => void
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
  isSaving: false,
  setIsSaving: () => {},
})

export const EditorContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [currentNote, setNote] = useState<Note | undefined>(undefined)
  const [activePages, setActivePages] = useState<number[]>([])

  const [currentNoteUpdatedAt, setCurrentNoteUpdatedAt] = useState<
    Date | undefined
  >(undefined)

  const [initialized, setInitialized] = useState<boolean>(false)

  const [isSaving, setIsSaving] = useState<boolean>(false)

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
      setActivePages((prev) => {
        if (!newNote.id) return prev

        if (prev.length === 0) {
          localStorage.setItem('activePages', JSON.stringify([newNote.id]))
          return [newNote.id]
        }
        return prev
      })
      return
    }

    if (!activePages.includes(newNote.id)) {
      if (activePages.length >= 7) {
        const newArray = [...activePages]
        newArray[activePages.indexOf(oldNoteId)] = newNote.id
        setActivePages(newArray)
        localStorage.setItem('activePages', JSON.stringify(newArray))
      } else {
        const newActivePages = [...activePages, newNote.id]
        setActivePages(newActivePages)
        localStorage.setItem('activePages', JSON.stringify(newActivePages))
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
            localStorage.setItem('activePages', JSON.stringify(newActivePages))
          })
      } else {
        setCurrentNote(undefined)
        localStorage.setItem('activePages', JSON.stringify([]))
      }
    }

    const newActivePages = activePages.filter((pageId) => pageId !== id)
    setActivePages(newActivePages)
    localStorage.setItem('activePages', JSON.stringify(newActivePages))
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
  }

  const throttled = useThrottledCallback(async (value) => {
    const targetDuration = 500
    const start = performance.now()
    setIsSaving(true)
    const updatedAt = new Date()
    const updatedNote = await db.userNotes.update(currentNote?.id, {
      content: value.editor.getJSON(),
      updatedAt: updatedAt,
    })
    setCurrentNoteUpdatedAt(updatedAt)

    const end = performance.now()
    const executionDuration = end - start

    const timeoutDuration = Math.max(0, targetDuration - executionDuration)

    const timeout = setTimeout(() => {
      setIsSaving(false)
      clearTimeout(timeout)
    }, timeoutDuration)
  }, 5000)

  const editor = useEditor({
    extensions: extensions,
    content: currentNote?.content || defaultContent,
    editorProps: editorProps,
    onUpdate: (value) => throttled(value),
  })

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('activePages') || '[]')

    if (history.length > 0) {
      const latestOpenedNote = db.userNotes
        .orderBy('lastOpenedAt')
        .last()
        .then((note) => {
          setActivePages(
            JSON.parse(localStorage.getItem('activePages') || '[]')
          )
          setCurrentNote(note)
          setInitialized(true)
        })
        .catch((err) => {
          console.log('err', err)
        })
    } else {
      setActivePages([])
      setInitialized(true)
    }
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
        isSaving,
        setIsSaving,
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
