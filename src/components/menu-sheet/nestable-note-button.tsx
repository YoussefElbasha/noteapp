import cn from 'classnames'
import Page from '@/icons/page.svg'
import TrashAlt from '@/icons/delete-alt.svg'
import { useEditorContext } from '@/app/contexts/editor-context'
import { Note } from '@/database/db.model'

type NestableNoteButtonProps = {
  item: any

  // {
  //   id: number | undefined
  //   note: Note
  //   type: string
  // }
}

const NestableNoteButton = ({ item }: NestableNoteButtonProps) => {
  const { currentNote, setCurrentNote, deleteNote } = useEditorContext()

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
        <Page className=' min-w-5 min-h-5 max-w-5 max-h-5 text-text-dark/60' />
        <p className='text-sm truncate text-text-dark'>
          {item.note.title === '' ? 'untitled' : item.note.title}
        </p>
      </div>
      <div className='flex flex-row items-center justify-center gap-2'>
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
}

export default NestableNoteButton
