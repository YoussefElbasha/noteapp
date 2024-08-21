import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/shadcn/sheet'
import Nestable from 'react-nestable'
import cn from 'classnames'
import Menu from '@/icons/menu.svg'
import Folder from '@/icons/folder.svg'
import Page from '@/icons/page.svg'
import TrashAlt from '@/icons/delete-alt.svg'
import AddNoCircle from '@/icons/add-no-circle.svg'
import { defaultContent, useEditorContext } from '@/app/contexts/editor-context'
import { db, Note } from '@/database/db.model'
import { useLiveQuery } from 'dexie-react-hooks'
import NestableNoteButton from './nestable-note-button'
import NestableFolderButton from './nestable-folder-button'

const MenuSheet = () => {
  const { editor, currentNote, setCurrentNote, deleteNote } = useEditorContext()

  const notesList =
    useLiveQuery(() =>
      db.userNotes.toArray().then((notes) => {
        return notes.map((note) => {
          return {
            id: note.id,
            note: note,
            type: 'note',
          }
        })
      })
    ) ?? []

  const foldersList =
    useLiveQuery(() =>
      db.folders.toArray().then((folders) => {
        return folders.map((folder) => {
          return {
            id: folder.id,
            title: folder.title,
            type: 'folder',
          }
        })
      })
    ) ?? []

  // const nestableItems = notesList?.map((note) => {
  //   return {
  //     id: note.id,
  //     note: note,
  //     type: 'note',
  //   }
  // })

  // const folderNestableItems = foldersList?.map((folder) => {
  //   return {
  //     id: folder.id,
  //     title: folder.title,
  //     type: 'folder',
  //   }
  // })

  // if(!folderNestableItems) return null

  // join notes and folders

  const nestableItems = [...notesList, ...foldersList]

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className='transition-colors min-w-5 min-h-5 max-w-5 max-h-5 text-text-dark/60 hover:text-text-dark' />
      </SheetTrigger>
      <SheetContent side={'left'}>
        <SheetHeader>
          <SheetTitle>Pages</SheetTitle>
        </SheetHeader>
        <Nestable
          maxDepth={2}
          // disableDrag
          className='flex-1 px-8 overflow-y-auto'
          items={nestableItems}
          renderItem={({ item }) => {
            if (item.type === 'note') {
              return <NestableNoteButton item={item} />
            } else return <NestableFolderButton item={item} />
          }}
        />
        <SheetFooter>
          <div className='flex flex-row items-center justify-center w-full gap-2'>
            <button
              className='flex flex-row items-center justify-center w-full py-2 transition-all rounded bg-component-background-dark hover:brightness-110 group'
              // TODO: use addNewNote from context
              onClick={() => {
                db.folders
                  .add({
                    title: '',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  })
                  .then((folderId) => {
                    console.log(folderId)
                  })
              }}
            >
              <p className='text-sm transition-colors text-text-dark/60 group-hover:text-text-dark'>
                Add Folder
              </p>
            </button>
            <button
              className='flex flex-row items-center justify-center w-full py-2 transition-all rounded bg-component-background-dark hover:brightness-110 group'
              // TODO: use addNewNote from context
              onClick={() => {
                db.userNotes
                  .add({
                    title: '',
                    content: defaultContent,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    lastOpenedAt: new Date(),
                  })
                  .then((noteId) => {
                    db.userNotes.get(noteId).then((note) => {
                      setCurrentNote(note)
                      editor?.commands.setContent(defaultContent)
                    })
                  })
              }}
            >
              <p className='text-sm transition-colors text-text-dark/60 group-hover:text-text-dark'>
                Add Page
              </p>
            </button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default MenuSheet
