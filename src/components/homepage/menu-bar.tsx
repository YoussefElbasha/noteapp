'use client'

import Trash from '@/icons/trash.svg'
import Upload from '@/icons/upload.svg'
import Add from '@/icons/add.svg'
import Download from '@/icons/download.svg'
import { useEditorContext } from '@/app/contexts/editor-context'
import MenuSheet from '../menu-sheet/menu-sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn/dropdown'
import JsonIcon from '@/icons/json-icon.svg'
import Markdown from '@/icons/markdown.svg'
import HtmlIcon from '@/icons/html.svg'
import saveAs from 'file-saver'
import { useEffect, useRef, useState } from 'react'
import { db } from '@/database/db.model'

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
  const { editor, currentNote, deleteNote, addNewNote } = useEditorContext()

  const [blob, setBlob] = useState<Blob | null>(null)

  useEffect(() => {
    if (!blob) return

    const reader = new FileReader()

    reader.onload = () => {
      editor?.commands.setImage({
        src: `${reader.result}`,
      })
    }

    reader.readAsDataURL(blob)
  }, [blob])

  const inputRef = useRef<HTMLInputElement>(null)

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!inputRef || !inputRef.current) return
    inputRef.current.click()
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const files = e.target.files
    if (!files) return

    const file = files[0]

    const fileBlob = new Blob([file], {
      type: 'image/png',
    })

    setBlob(fileBlob)

    e.target.value = ''
  }

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

        {currentNote && (
          <>
            <form onSubmit={(e) => e.preventDefault()}>
              <button onClick={(e) => handleButtonClick(e)}>
                <Upload className='transition-colors min-w-5 min-h-5 max-w-5 max-h-5 text-text-dark/60 hover:text-text-dark' />
              </button>
              <input
                ref={inputRef}
                type='file'
                accept='image/*'
                hidden
                onChange={handleFileUpload}
              />
            </form>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Download className='transition-colors min-w-5 min-h-5 max-w-5 max-h-5 text-text-dark/60 hover:text-text-dark' />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='bg-component-background-dark  leading-[1.625rem] tracking-[-0.0125rem] rounded-md border-none gap-5'
                side='right'
                sideOffset={20}
              >
                <DropdownMenuItem
                  className='pl-2'
                  onClick={async () => {
                    const markdown = editor?.storage.markdown.getMarkdown()

                    const blob = new Blob([markdown], {
                      type: 'text/plain',
                    })

                    const currentTitle = await db.userNotes
                      .get(currentNote?.id)
                      .then((note) => {
                        return note?.title
                      })

                    saveAs(
                      blob,
                      `${!currentTitle ? 'untitled' : currentTitle}.md`
                    )
                  }}
                >
                  <Markdown className='w-6 h-6 mr-2 stroke-0 -translate-y-[0.18rem]' />
                  <p className='text-[13px] py-[2px] '>Markdown</p>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className='pl-2'
                  onClick={async () => {
                    // use .content or nah?
                    const Json = JSON.stringify(editor?.getJSON())

                    const blob = new Blob([Json], {
                      type: 'application/json;charset=utf-8',
                    })

                    const currentTitle = await db.userNotes
                      .get(currentNote?.id)
                      .then((note) => {
                        return note?.title
                      })

                    saveAs(
                      blob,
                      `${!currentTitle ? 'untitled' : currentTitle}.json`
                    )
                  }}
                >
                  <JsonIcon className='w-6 h-6 mr-2 stroke-current' />
                  <p className='text-[13px] py-[2px] '>JSON</p>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className='pl-2'
                  onClick={async () => {
                    const html = editor?.getHTML()

                    if (!html) return

                    const blob = new Blob([html], {
                      type: 'text/plain',
                    })

                    const currentTitle = await db.userNotes
                      .get(currentNote?.id)
                      .then((note) => {
                        return note?.title
                      })

                    saveAs(
                      blob,
                      `${!currentTitle ? 'untitled' : currentTitle}.html`
                    )
                  }}
                >
                  <HtmlIcon className='w-6 h-6 mr-2 fill-current' />
                  <p className='text-[13px] py-[2px] '>HTML</p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <button
              onClick={() => {
                deleteNote(currentNote?.id)
              }}
            >
              <Trash className='transition-colors min-w-5 min-h-5 max-w-5 max-h-5 text-text-dark/60 hover:text-text-dark' />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default MenuBar
