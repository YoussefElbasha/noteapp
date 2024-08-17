import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/shadcn/dropdown'
import FontSize from '@/icons/font-size.svg'
import ChevronDown from '@/icons/arrow-down-s-line.svg'
import { useEditorContext } from '@/app/contexts/editor-context'
import { useEditorStore } from '@/app/contexts/editor-store-provider'
import { useState } from 'react'

const HeadingDropDown = () => {
  const { editor } = useEditorContext()

  // const { editor } = useEditorStore((state) => state)

  const [open, setOpen] = useState(false)

  if (!editor) {
    return null
  }

  return (
    <>
      {/* <button
        className='hover:bg-tiptap-menu-bar-background-hover group py-0.5 pl-1 rounded-md flex flex-row justify-center items-center [&[data-state=open]]:bg-[#2d3038] transition-colors'
        onClick={() => {
          setOpen(!open)
          console.log('open', open)
        }}
      >
        <FontSize className='w-5 h-5 text-[#9c9ea1] group-hover:text-[#e5e6eb]' />
        <ChevronDown className='w-4 h-4 text-[#9c9ea1] group-hover:text-[#e5e6eb]' />
      </button> */}
      <DropdownMenu
      // open={open}
      // onOpenChange={() => {
      //   setOpen(!open)
      //   console.log('open', open)
      // }}
      >
        <DropdownMenuTrigger
          className='hover:bg-tiptap-menu-bar-background-hover group py-0.5 pl-1 rounded-md flex flex-row justify-center items-center [&[data-state=open]]:bg-[#2d3038] transition-colors'
          // onClick={(e) => {
          //   console.log('clicked')
          // }}
          // asChild={true}
        >
          <FontSize className='w-5 h-5 text-[#9c9ea1] group-hover:text-[#e5e6eb]' />
          <ChevronDown className='w-4 h-4 text-[#9c9ea1] group-hover:text-[#e5e6eb]' />
          {/* <button
            className='hover:bg-tiptap-menu-bar-background-hover group py-0.5 pl-1 rounded-md flex flex-row justify-center items-center [&[data-state=open]]:bg-[#2d3038] transition-colors'
            onClick={(e) => {
              // setOpen(!open)
              setOpen((prevOpen) => !prevOpen)
              console.log('open', open)
            }}
          >
            <FontSize className='w-5 h-5 text-[#9c9ea1] group-hover:text-[#e5e6eb]' />
            <ChevronDown className='w-4 h-4 text-[#9c9ea1] group-hover:text-[#e5e6eb]' />
          </button> */}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className='bg-component-background-dark  leading-[1.625rem] tracking-[-0.0125rem] rounded-md p-0.5 border-none'
          align='start'
          sideOffset={10}
          alignOffset={-8}
          // hideWhenDetached={true}
        >
          <DropdownMenuCheckboxItem
            onClick={() => editor.chain().focus().setParagraph().run()}
            checked={editor.isActive('paragraph')}
            aria-label='Paragraph'
            className='pl-1'
          >
            <p className='text-[13px] py-[2px] '>Regular text</p>
          </DropdownMenuCheckboxItem>

          <DropdownMenuCheckboxItem
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            checked={editor.isActive('heading', { level: 1 })}
            aria-label='Heading 1'
            className='pl-1'
          >
            <h1 className='text-base font-bold'>Heading 1</h1>
          </DropdownMenuCheckboxItem>

          <DropdownMenuCheckboxItem
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            checked={editor.isActive('heading', { level: 2 })}
            aria-label='Heading 2'
            className='pl-1'
          >
            <h2 className='text-sm font-bold py-[2px]'>Heading 2</h2>
          </DropdownMenuCheckboxItem>

          <DropdownMenuCheckboxItem
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            checked={editor.isActive('heading', { level: 3 })}
            aria-label='Heading 3'
            className='pl-1'
          >
            <h3 className='text-xs font-bold py-[4px]'>Heading 3</h3>
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default HeadingDropDown
