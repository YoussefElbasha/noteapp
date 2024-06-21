import { useEditorContext } from '@/app/contexts/editor-context'
import ActivePagesButton from './active-pages-button'

const ActivePages = () => {
  const { activePages } = useEditorContext()
  return (
    <div className='fixed flex flex-row items-center justify-center gap-2 bottom-3 left-8'>
      {activePages.map((noteId, index) => (
        <ActivePagesButton
          key={noteId}
          noteId={noteId}
          pageNumber={index + 1}
        />
      ))}
      {/* <ActivePagesButton pageNumber='1' />
      <ActivePagesButton pageNumber='2' />
      <ActivePagesButton pageNumber='3' /> */}

      {/*  <ActivePagesButton pageNumber="4" />
      <ActivePagesButton pageNumber="5" />
      <ActivePagesButton pageNumber="6" />
      <ActivePagesButton pageNumber="7" /> */}
    </div>
  )
}

export default ActivePages
