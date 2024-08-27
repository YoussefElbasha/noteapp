import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/shadcn/sheet'
import Nestable from 'react-nestable'
import Menu from '@/icons/menu.svg'
import { useEditorContext } from '@/app/contexts/editor-context'
import { db } from '@/database/db.model'
import { useLiveQuery } from 'dexie-react-hooks'
import NestableNoteButton from './nestable-note-button'

const MenuSheet = () => {
  const { addNewNote } = useEditorContext()

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

  const nestableItems = [...notesList]

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
          maxDepth={1}
          disableDrag
          className='flex-1 px-8 overflow-y-auto'
          items={nestableItems}
          renderItem={({ item }) => {
            return <NestableNoteButton item={item} />
          }}
        />
        <SheetFooter>
          <button
            className='flex flex-row items-center justify-center w-full py-2 transition-all rounded bg-component-background-dark hover:brightness-110 group'
            onClick={() => {
              addNewNote()
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
