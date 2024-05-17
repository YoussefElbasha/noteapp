import { Editor, useCurrentEditor } from '@tiptap/react'
import cn from 'classnames'
import Bold from '@/icons/bold.svg'
import Italic from '@/icons/italic.svg'
import Strike from '@/icons/strikethrough.svg'
import BlockQuote from '@/icons/double-quotes-r.svg'
import Code from '@/icons/code-view.svg'
import CodeBlock from '@/icons/code-block.svg'
import { useMemo } from 'react'
import HeadingDropDown from './heading-dropdown'
import ListDropDown from './list-dropdown'
import { db } from '@/database/db.model'

type MenuBarProps = {
  editor?: Editor | null
}

// const MenuBar = ({ editor }: MenuBarProps) => {
const MenuBar = () => {
  const { editor } = useCurrentEditor()

  const menuButtons = useMemo(() => {
    if (!editor) {
      return []
    }

    return [
      {
        command: () => editor.chain().focus().toggleBold().run(),
        disabled: () => !editor.can().chain().focus().toggleBold().run(),
        isActive: 'bold',
        icon: <Bold className="w-6 h-6" />,
        title: 'Bold',
      },
      {
        command: () => editor.chain().focus().toggleItalic().run(),
        disabled: () => !editor.can().chain().focus().toggleItalic().run(),
        isActive: 'italic',
        icon: <Italic className="w-6 h-6" />,
        title: 'Italic',
      },
      {
        command: () => editor.chain().focus().toggleStrike().run(),
        disabled: () => !editor.can().chain().focus().toggleStrike().run(),
        isActive: 'strike',
        icon: <Strike className="w-6 h-6" />,
        title: 'Strike',
      },
      {
        command: () => editor.chain().focus().toggleBlockquote().run(),
        isActive: 'blockquote',
        icon: <BlockQuote className="w-6 h-6" />,
        title: 'blockquote',
      },
      {
        command: () => editor.chain().focus().toggleCode().run(),
        disabled: () => !editor.can().chain().focus().toggleCode().run(),
        isActive: 'code',
        icon: <Code className="w-6 h-6" />,
        title: 'Code',
      },
      {
        command: () => editor.chain().focus().toggleCodeBlock().run(),
        isActive: 'codeBlock',
        icon: <CodeBlock className="w-6 h-6" />,
        title: 'Code Block',
      },
    ]
  }, [editor])

  if (!editor) {
    return null
  }

  const test = {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Yous ',
          },
        ],
      },
    ],
  }

  const test2 = {
    type: 'doc',
    content: [
      {
        type: 'heading',
        attrs: {
          level: 2,
        },
        content: [
          {
            type: 'text',
            text: 'Hi there,',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'this is a ',
          },
          {
            type: 'text',
            marks: [
              {
                type: 'italic',
              },
            ],
            text: 'basic',
          },
          {
            type: 'text',
            text: ' example of ',
          },
          {
            type: 'text',
            marks: [
              {
                type: 'bold',
              },
            ],
            text: 'tiptap',
          },
          {
            type: 'text',
            text: '. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:',
          },
        ],
      },
      {
        type: 'bulletList',
        content: [
          {
            type: 'listItem',
            attrs: {
              color: '',
            },
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'That’s a bullet list with one …',
                  },
                ],
              },
            ],
          },
          {
            type: 'listItem',
            attrs: {
              color: '',
            },
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: '… or two list items.',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:',
          },
        ],
      },
      {
        type: 'codeBlock',
        attrs: {
          language: 'css',
        },
        content: [
          {
            type: 'text',
            text: 'body {\ndisplay: none;\n}',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.',
          },
        ],
      },
      {
        type: 'blockquote',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'Wow, that’s amazing. Good work, boy! 👏 ',
              },
              {
                type: 'hardBreak',
              },
              {
                type: 'text',
                text: '— Mom',
              },
            ],
          },
        ],
      },
    ],
  }

  // const test3 = editor.getJSON()

  return (
    <div className="ml-auto flex flex-row justify-start items-center p-0.5 gap-0.5 rounded-md bg-white w-fit ">
      <button
        aria-label="Save"
        onClick={() => console.log(editor.getJSON())}
        className="hover:bg-zinc-200/50 p-0.5 rounded-md"
        title="Save"
      >
        Save
      </button>

      <button
        aria-label="Save"
        onClick={() => {
          db.userNotes.add({ content: editor.getJSON() })
        }}
        className="hover:bg-zinc-200/50 p-0.5 rounded-md"
        title="Save"
      >
        Save to db
      </button>

      <button
        aria-label="Save"
        onClick={() => editor.commands.setContent(test)}
        className="hover:bg-zinc-200/50 p-0.5 rounded-md"
        title="Save"
      >
        Set
      </button>
      <HeadingDropDown />
      {menuButtons.map((button, index) => (
        <button
          key={index}
          onClick={button.command}
          disabled={button.disabled?.() ?? false}
          className={cn('hover:bg-zinc-200/50 p-0.5 rounded-md', {
            'bg-zinc-200 ': editor.isActive(button.isActive),
            'bg-white ': !editor.isActive(button.isActive),
          })}
          title={button.title}
        >
          {button.icon}
        </button>
      ))}
      <div className="inline-block  min-h-[1em] my-1 w-[1px] self-stretch bg-zinc-200"></div>
      <ListDropDown />
    </div>
  )
}

export default MenuBar
