'use client'

import { useEditorContext } from '@/app/contexts/editor-context'
import TipTap from '@/components/editor/tiptap'
import PageHeader from '@/components/homepage/page-header'
import { useEditorStore } from '@/app/contexts/editor-store-provider'

const EditorPane = () => {
  const { currentNote } = useEditorContext()
  // const { currentNote } = useEditorStore((state) => state)

  return (
    <div className='max-w-[60%] pl-[calc(0.0445*100%)] flex flex-col flex-1 mx-auto'>
      {currentNote ? (
        <>
          <PageHeader />
          <TipTap />
        </>
      ) : (
        <div className='text-center text-text-dark my-auto'>
          Create a new note
        </div>
      )}
    </div>
  )
}

export default EditorPane
