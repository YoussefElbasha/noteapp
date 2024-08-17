'use client'

import { useEditorContext } from '@/app/contexts/editor-context'
import TipTap from '@/components/editor/tiptap'
import PageHeader from '@/components/homepage/page-header'
import { useEditorStore } from '@/app/contexts/editor-store-provider'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/database/db.model'
import { use, useEffect } from 'react'

const EditorPane = () => {
  const { editor, currentNote, initialized } = useEditorContext()

  if (!editor) {
    return null
  }

  return (
    <div className='max-w-[60%] pl-[calc(0.0445*100%)] flex flex-col flex-1 mx-auto'>
      {initialized && editor ? (
        currentNote ? (
          <>
            <PageHeader />
            <TipTap />
          </>
        ) : (
          <div className='text-center text-text-dark my-auto'>
            Create a new note
          </div>
        )
      ) : null}
    </div>
  )
}

export default EditorPane
