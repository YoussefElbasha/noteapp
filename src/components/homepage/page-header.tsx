import { useEditorContext } from '@/app/contexts/editor-context'
import { db } from '@/database/db.model'
import { useEffect, useRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import formatDate from '@/lib/format-date'

// TODO: when title becomes too big the textarea scrollbar is too fat and the textarea has weird behavior
const PageHeader = () => {
  const { currentNote, currentNoteUpdatedAt, isSaving } = useEditorContext()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [title, setTitle] = useState(currentNote?.title ?? '')
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    setTitle(currentNote?.title ?? '')
    if (!currentNote?.title) {
      textareaRef.current?.focus()
    }
  }, [currentNote])

  useEffect(() => {
    setDate(currentNoteUpdatedAt ?? new Date())
  }, [currentNoteUpdatedAt])

  const handleTitleChange = async (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    // TODO: add debouncing or throttling
    setTitle(e.target.value)
    const updatedAt = new Date()
    await db.userNotes.update(currentNote?.id, {
      title: e.target.value,
      updatedAt: updatedAt,
    })
    setDate(updatedAt)
  }

  return (
    <div className='mb-5'>
      <TextareaAutosize
        ref={textareaRef}
        className='w-full min-h-[2.625rem] mt-5 text-4xl font-bold tracking-wide align-top bg-transparent outline-none resize-none text-text-dark placeholder:text-text-dark/25 text-pretty'
        cacheMeasurements
        rows={1}
        placeholder='Untitled Note'
        value={title}
        onChange={handleTitleChange}
      />
      {isSaving ? (
        <p className='bg-transparent text-[#B4B4B4]'>⭕ Saving...</p>
      ) : (
        // <>
        //   <span className='bg-transparent text-[#B4B4B4]'>Saving</span>
        //   <span className='bg-transparent text-[#B4B4B4]'>.</span>
        //   <span className='bg-transparent text-[#B4B4B4] fade-in-0'>.</span>
        //   <span className='bg-transparent text-[#B4B4B4] fade-in-0'>.</span>
        // </>
        <p className='bg-transparent text-[#B4B4B4]'>{formatDate(date)}</p>
      )}
    </div>
  )
}

export default PageHeader
