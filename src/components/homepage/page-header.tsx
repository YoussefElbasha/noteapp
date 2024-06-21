import { useEditorContext } from '@/app/contexts/editor-context'
import { useEditorStore } from '@/app/contexts/editor-store-provider'
import { db } from '@/database/db.model'
import { useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { format } from 'date-fns'

// TODO: when title becomes too big the textarea scrollbar is too fat and the textarea has weird behavior
const PageHeader = () => {
  const { currentNote } = useEditorContext()
  // const { currentNote } = useEditorStore((state) => state)
  const [title, setTitle] = useState(currentNote?.title ?? '')
  const [date, setDate] = useState(new Date())

  // useEffect(() => {
  //   if (currentNote) {
  //     setTitle(currentNote?.title ?? '')
  //     setDate(currentNote?.createdAt?.toLocaleTimeString() ?? '')
  //   }
  // }, [])

  useEffect(() => {
    setTitle(currentNote?.title ?? '')
    setDate(currentNote?.createdAt ?? new Date())
  }, [currentNote])

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // TODO: add debouncing or throttling
    setTitle(e.target.value)
    db.userNotes.update(currentNote?.id, {
      title: e.target.value,
    })
  }

  return (
    <div className='mb-5'>
      <TextareaAutosize
        className='w-full min-h-[2.625rem] mt-5 text-4xl font-bold tracking-wide align-top bg-transparent outline-none resize-none text-text-dark placeholder:text-text-dark/25 text-pretty'
        cacheMeasurements
        rows={1}
        placeholder='Untitled Note'
        value={title}
        // value={currentNote?.title ?? ''}
        onChange={handleTitleChange}
      />
      <p className='bg-transparent text-[#B4B4B4]'>
        {format(date, 'MMMM d, yyyy')}
      </p>
    </div>
  )
}

export default PageHeader
