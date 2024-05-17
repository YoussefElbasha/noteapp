'use client'

import TipTap from '@/components/tiptap/tiptap'
import { db } from '@/database/db.model'
import { JSONContent, useCurrentEditor, useEditor } from '@tiptap/react'
import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react'

const HomePage = () => {
  const [content, setContent] = useState<JSONContent>({
    type: 'doc',
    content: [
      {
        type: 'paragraph',
      },
    ],
  })
  const notesList = useLiveQuery(() => db.userNotes.toArray())
  const { editor } = useCurrentEditor()
  return (
    <main className="flex flex-col min-h-screen p-2 min-w-screen bg-neutral-400">
      <div className="flex flex-col min-h-[calc(100vh-0.5rem-0.5rem)] max-h-[calc(100vh-0.5rem-0.5rem)] [&_div:nth-child(2)]:flex [&_div:nth-child(2)]:flex-1 [&_div:nth-child(2)]:flex-col [&_div:nth-child(2)]:overflow-y-auto">
        <div className="flex flex-row justify-between items-center p-0.5 gap-0.5 rounded-md bg-white w-fit ">
          {notesList?.map((note, index) => (
            <button
              key={index}
              // onClick={() => setContent(note.content)}
              onClick={() => editor?.commands.setContent(note.content, true)}
              className="hover:bg-zinc-200/50 p-0.5 rounded-md"
              title="Save"
            >
              {note.id}
            </button>
          ))}
        </div>
        {/* <TipTap /> */}
        <TipTap content={content} />
      </div>
    </main>
  )
}

export default HomePage
