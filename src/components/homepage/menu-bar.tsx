import Trash from '@/icons/trash.svg'
import Upload from '@/icons/upload.svg'
import Add from '@/icons/add.svg'
import { useEditorContext } from '@/app/contexts/editor-context'
import MenuSheet from './menu-sheet'
import { useEditorStore } from '@/app/contexts/editor-store-provider'

const items = [
  // {
  //   id: 0,
  //   text: 'Andy efefefefefefefefefefefwdwdwwdwdwdwdwdwdwdwdwdwdwd',
  //   type: 'page',
  // },
  // {
  //   id: 1,
  //   text: 'Harry',
  //   type: 'folder',
  //   children: [{ id: 2, text: 'David', type: 'page' }],
  // },
]

const MenuBar = () => {
  const { currentNote, deleteNote, addNewNote } = useEditorContext()

  // const { editor, currentNote, setCurrentNote } = useEditorStore(
  //   (state) => state
  // )

  return (
    <div className='fixed flex flex-col items-center justify-start h-full max-h-screen min-h-screen px-6 py-6 bg-transparent'>
      <MenuSheet />
      <div className='flex flex-col items-center justify-start h-full gap-6 py-12'>
        <button
          onClick={() => {
            addNewNote()
          }}
        >
          <Add className='transition-colors min-w-5 min-h-5 max-w-5 max-h-5 text-text-dark/60 hover:text-text-dark' />
        </button>
        <button onClick={() => alert(currentNote?.id)}>
          <Upload className='transition-colors min-w-5 min-h-5 max-w-5 max-h-5 text-text-dark/60 hover:text-text-dark' />
        </button>
        <button
          onClick={() => {
            deleteNote(currentNote?.id)
          }}
        >
          <Trash className='transition-colors min-w-5 min-h-5 max-w-5 max-h-5 text-text-dark/60 hover:text-text-dark' />
        </button>
      </div>
    </div>
  )
}

export default MenuBar
