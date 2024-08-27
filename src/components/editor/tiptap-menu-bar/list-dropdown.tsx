import DropdownMenu from '@/components/dropdown-menu/dropdown-menu'
import BulletList from '@/icons/list-unordered.svg'
import DropdownMenuButton from '@/components/dropdown-menu/dropdown-menu-button'
import { useEditorContext } from '@/app/contexts/editor-context'
import OrderedList from '@/icons/list-ordered.svg'

const ListDropDown = () => {
  const { editor } = useEditorContext()

  if (!editor) {
    return null
  }

  return (
    <DropdownMenu
      icon={
        <BulletList className='w-54 h-5 text-[#9c9ea1] group-hover:text-[#e5e6eb]' />
      }
      sideAdjustment='-right-2'
      className='pr-0.5'
    >
      <DropdownMenuButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        checked={editor.isActive('bulletList')}
        ariaLabel='Bullet List'
      >
        <BulletList className='w-6 h-6 mr-2' />
        <p>Bullet List</p>
      </DropdownMenuButton>

      <DropdownMenuButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        checked={editor.isActive('orderedList')}
        ariaLabel='Ordered List'
      >
        <OrderedList className='w-6 h-6 mr-2' />
        <h1>Ordered List</h1>
      </DropdownMenuButton>
    </DropdownMenu>
  )
}

export default ListDropDown
