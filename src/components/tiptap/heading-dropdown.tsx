import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/shadcn/dropdown'
import FontSize from '@/icons/font-size.svg'
import ChevronDown from '@/icons/arrow-down-s-line.svg'
import { useCurrentEditor } from '@tiptap/react'

const HeadingDropDown = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:bg-zinc-200/50 py-0.5 pl-1 rounded-md flex flex-row justify-center items-center [&[data-state=open]]:bg-zinc-200">
        <FontSize className="w-6 h-6" />
        <ChevronDown className="w-4 h-4 " />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-white leading-[1.625rem] tracking-[-0.0125rem] rounded-md p-0.5 border-none"
        align="start"
        sideOffset={4}
        alignOffset={-3}
      >
        <DropdownMenuCheckboxItem
          onClick={() => editor.chain().focus().setParagraph().run()}
          checked={editor.isActive('paragraph')}
          aria-label="Paragraph"
          className="pl-1"
        >
          <p className="text-[13px] py-[2px]">Regular text</p>
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          checked={editor.isActive('heading', { level: 1 })}
          aria-label="Heading 1"
          className="pl-1"
        >
          <h1 className="text-base font-bold">Heading 1</h1>
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          checked={editor.isActive('heading', { level: 2 })}
          aria-label="Heading 2"
          className="pl-1"
        >
          <h2 className="text-sm font-bold py-[2px]">Heading 2</h2>
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          checked={editor.isActive('heading', { level: 3 })}
          aria-label="Heading 3"
          className="pl-1"
        >
          <h3 className="text-xs font-bold py-[4px]">Heading 3</h3>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default HeadingDropDown
