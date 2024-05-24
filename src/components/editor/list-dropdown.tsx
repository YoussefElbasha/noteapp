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

const ListDropDown = () => {
  const { editor } = useEditorContext()

  if (!editor) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:bg-zinc-200/50 py-0.5 pl-1 rounded-md flex flex-row justify-center items-center [&[data-state=open]]:bg-zinc-200">
        <BulletList className="w-6 h-6" />
        <ChevronDown className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-white leading-[1.625rem] tracking-[-0.0125rem] rounded-md p-0.5 border-none"
        align="end"
        sideOffset={4}
        alignOffset={-2}
      >
        <DropdownMenuCheckboxItem
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          checked={editor.isActive('bulletList')}
          aria-label="Bullet List"
          className="pl-0.5"
        >
          <BulletList className="w-6 h-6 mr-2" />
          <p>Bullet List</p>
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          checked={editor.isActive('orderedList')}
          aria-label="Ordered List"
          className="pl-0.5"
        >
          <OrderedList className="w-6 h-6 mr-2" />
          <h1>Ordered List</h1>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ListDropDown
