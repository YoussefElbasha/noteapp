import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/shadcn/dropdown'
import ChevronDown from '@/icons/arrow-down-s-line.svg'
import BulletList from '@/icons/list-unordered.svg'
import OrderedList from '@/icons/list-ordered.svg'
import { useEditorContext } from '@/app/contexts/editor-context'
import { useEditorStore } from '@/app/contexts/editor-store-provider'

const ListDropDown = () => {
  const { editor } = useEditorContext()

  // const { editor } = useEditorStore((state) => state)

  if (!editor) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='hover:bg-tiptap-menu-bar-background-hover group py-0.5 pl-1 pr-0.5 rounded-md flex flex-row justify-center items-center [&[data-state=open]]:bg-[#2d3038] transition-colors'>
        <BulletList className='w-5 h-5 text-[#9c9ea1] group-hover:text-[#e5e6eb]' />
        <ChevronDown className='w-4 h-4 text-[#9c9ea1] group-hover:text-[#e5e6eb]' />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='bg-component-background-dark  leading-[1.625rem] tracking-[-0.0125rem] rounded-md p-0.5 border-none'
        align='end'
        sideOffset={10}
        alignOffset={-8}
      >
        <DropdownMenuCheckboxItem
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          checked={editor.isActive('bulletList')}
          aria-label='Bullet List'
          className='pl-0.5'
        >
          <BulletList className='w-6 h-6 mr-2' />
          <p>Bullet List</p>
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          checked={editor.isActive('orderedList')}
          aria-label='Ordered List'
          className='pl-0.5'
        >
          <OrderedList className='w-6 h-6 mr-2' />
          <h1>Ordered List</h1>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ListDropDown
