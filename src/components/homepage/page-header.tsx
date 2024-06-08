import { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

const PageHeader = () => {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')

  return (
    <div className="mb-5">
      <TextareaAutosize
        className="w-full min-h-[2.625rem] mt-5 text-4xl font-bold tracking-wide align-top bg-transparent outline-none resize-none text-text-dark placeholder:text-text-dark/25 text-pretty"
        cacheMeasurements
        rows={1}
        placeholder="Untitled Note"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <p className="bg-transparent text-[#B4B4B4]">date</p>
    </div>
  )
}

export default PageHeader
