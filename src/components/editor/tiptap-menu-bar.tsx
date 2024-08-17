import cn from 'classnames'
import Bold from '@/icons/bold.svg'
import Italic from '@/icons/italic.svg'
import Strike from '@/icons/strikethrough.svg'
import BlockQuote from '@/icons/double-quotes-r.svg'
import Code from '@/icons/code-view.svg'
import CodeBlock from '@/icons/code-block.svg'
import { useMemo, useState } from 'react'
import HeadingDropDown from './heading-dropdown'
import ListDropDown from './list-dropdown'
import { db } from '@/database/db.model'
import { useEditorContext } from '@/app/contexts/editor-context'

const TipTapMenuBar = () => {
  const { editor } = useEditorContext()

  // const { editor } = useEditorStore((state) => state)

  const menuButtons = useMemo(() => {
    if (!editor) {
      return []
    }

    return [
      {
        command: () => editor.chain().focus().toggleBold().run(),
        disabled: () => !editor.can().chain().focus().toggleBold().run(),
        isActive: 'bold',
        icon: <Bold className='w-5 h-5' />,
        title: 'Bold',
      },
      {
        command: () => editor.chain().focus().toggleItalic().run(),
        disabled: () => !editor.can().chain().focus().toggleItalic().run(),
        isActive: 'italic',
        icon: <Italic className='w-5 h-5' />,
        title: 'Italic',
      },
      {
        command: () => editor.chain().focus().toggleStrike().run(),
        disabled: () => !editor.can().chain().focus().toggleStrike().run(),
        isActive: 'strike',
        icon: <Strike className='w-5 h-5' />,
        title: 'Strike',
      },
      {
        command: () => editor.chain().focus().toggleBlockquote().run(),
        isActive: 'blockquote',
        icon: <BlockQuote className='w-5 h-5' />,
        title: 'blockquote',
      },
      {
        command: () => editor.chain().focus().toggleCode().run(),
        disabled: () => !editor.can().chain().focus().toggleCode().run(),
        isActive: 'code',
        icon: <Code className='w-5 h-5' />,
        title: 'Code',
      },
      {
        command: () => editor.chain().focus().toggleCodeBlock().run(),
        isActive: 'codeBlock',
        icon: <CodeBlock className='w-5 h-5' />,
        title: 'Code Block',
      },
    ]
  }, [editor])

  if (!editor) {
    return null
  }

  // hover:bg-zinc-200/50

  return (
    <div className='ml-auto flex flex-row justify-start items-center px-2 py-2 gap-1 rounded-xl bg-component-background-dark w-fit'>
      {/* <OldHeadingDropDown /> */}
      <HeadingDropDown />

      <div className='inline-block min-h-[1em] my-0.5 w-[0px] border-r-[1.6px] self-stretch border-[#3e414a]'></div>

      {menuButtons.map((button, index) => (
        <button
          key={index}
          onClick={button.command}
          disabled={button.disabled?.() ?? false}
          className={cn(
            'hover:bg-tiptap-menu-bar-background-hover hover:text-[#e5e6eb] py-0.5 px-[0.15rem] rounded-md transition-colors',
            {
              'bg-[#2d3038] text-[#e5e6eb]': editor.isActive(button.isActive),
              ' bg-transparent text-[#9c9ea1]': !editor.isActive(
                button.isActive
              ),
            }
          )}
          title={button.title}
        >
          {button.icon}
        </button>
      ))}
      <div className='inline-block min-h-[1em] my-0.5 w-[0px] border-r-[1.6px] self-stretch border-[#3e414a]'></div>
      <ListDropDown />
      {/* <OldListDropDown />  */}
    </div>
  )
}

export default TipTapMenuBar
