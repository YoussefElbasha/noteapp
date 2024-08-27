import { useEditorContext } from '@/app/contexts/editor-context'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn/tooltip'
import { db } from '@/database/db.model'
import { useLiveQuery } from 'dexie-react-hooks'
import cn from 'classnames'
import { useHotkeys } from 'react-hotkeys-hook'

type ActivePagesButtonProps = {
  noteId: number
  pageNumber: number
}

const ActivePagesButton = ({ pageNumber, noteId }: ActivePagesButtonProps) => {
  const { currentNote, setCurrentNote, closeActivePage } = useEditorContext()
  const note = useLiveQuery(() => db.userNotes.get(noteId))

  useHotkeys(
    `ctrl+${pageNumber}`,
    (_, handler) => {
      setCurrentNote(note)
    },
    {
      enableOnContentEditable: true,
      enableOnFormTags: true,
      preventDefault: true,
    }
  )

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <div className='relative group'>
          <TooltipTrigger
            className={cn(
              'max-w-[2.32rem] min-w-[2.32rem] text-center py-2 text-sm rounded-lg text-white/60 overflow-hidden truncate',
              {
                'bg-component-background-dark brightness-150':
                  noteId === currentNote?.id,
                'bg-component-background-dark': noteId !== currentNote?.id,
              }
            )}
            onClick={() => setCurrentNote(note)}
          >
            {pageNumber}
          </TooltipTrigger>
          <button
            className='invisible absolute w-[0.75rem] h-[0.75rem] bg-orange-dark -top-[10%] -right-[12%] z-[100] text-white rounded-full group-hover:visible group-hover:animate-in group-hover:fade-in delay-100'
            onClick={() => {
              closeActivePage(noteId)
            }}
          ></button>
        </div>
        <TooltipContent>
          <p className='max-w-[20ch] truncate'>
            {note?.title === '' ? 'untitled' : note?.title}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default ActivePagesButton
