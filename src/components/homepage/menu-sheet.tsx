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
import { db } from '@/database/db.model'
import { useLiveQuery } from 'dexie-react-hooks'

const MenuSheet = () => {
  const { editor, currentNote, setCurrentNote, deleteNote } = useEditorContext()

  const notesList = useLiveQuery(() => db.userNotes.toArray())

  const nestableItems = notesList?.map((note) => {
    return {
      id: note.id,
      note: note,
      type: 'page',
    }
  })

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
          // maxDepth={2}
          maxDepth={1}
          disableDrag
          className='flex-1 px-8 overflow-y-auto'
          items={nestableItems}
          renderItem={({ item }) => {
            return (
              <div
                className={cn(
                  'flex flex-row items-center justify-between w-full py-2 rounded group cursor-pointer',
                  // {
                  //   // TODO: fix little twitchy effect that happens when you click on another note
                  //   'bg-hover-dark  border-hover-dark border-x-[10px] box-content -ml-[10px]':
                  //     item.id === currentNote?.id,
                  // }
                  // {
                  //   'px-2 -mx-2 bg-hover-dark': item.id === currentNote?.id,
                  // }
                  { 'full-bleed bg-hover-dark': item.id === currentNote?.id }
                )}
                onClick={() => {
                  // editor?.commands.setContent(item.note.content)
                  setCurrentNote(item.note)
                }}
              >
                <div className='flex flex-row items-center justify-between gap-2 overflow-hidden'>
                  {item.type === 'folder' ? (
                    <Folder className=' min-w-5 min-h-5 max-w-5 max-h-5 text-text-dark/60' />
                  ) : (
                    <Page className=' min-w-5 min-h-5 max-w-5 max-h-5 text-text-dark/60' />
                  )}
                  <p className='text-sm truncate text-text-dark'>
                    {item.note.title === '' ? 'untitled' : item.note.title}
                  </p>
                </div>
                <div className='flex flex-row items-center justify-center gap-2'>
                  {/* <button
                    onClick={(e) => {
                      e.stopPropagation()
                      alert(item.id)
                    }}
                    className='invisible group-hover:visible'
                  >
                    <AddNoCircle className='transition-colors min-w-4 min-h-4 max-w-4 max-h-4 text-text-dark/60 hover:text-text-dark' />
                  </button> */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      // db.userNotes.delete(item.id)

                      // if (currentNote?.id === item.id) {
                      //   db.userNotes.toArray().then((notes) => {
                      //     if (notes?.length !== 0) {
                      //       setCurrentNote(notes?.[0])
                      //     } else {
                      //       setCurrentNote(undefined)
                      //     }
                      //   })
                      // }

                      deleteNote(item.id)
                    }}
                    className='invisible group-hover:visible'
                  >
                    <TrashAlt className='transition-colors min-w-4 min-h-4 max-w-4 max-h-4 text-text-dark/60 hover:text-text-dark' />
                  </button>
                </div>
              </div>
            )
          }}
        />
        <SheetFooter>
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
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default MenuSheet
