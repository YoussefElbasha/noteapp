import FontSize from '@/icons/font-size.svg'
import { useEditorContext } from '@/app/contexts/editor-context'
import DropdownMenuButton from '../dropdown-menu/dropdown-menu-button'
import DropdownMenu from '../dropdown-menu/dropdown-menu'

const HeadingDropDown = () => {
  const { editor } = useEditorContext()

  if (!editor) {
    return null
  }

  return (
    <DropdownMenu
      icon={
        <FontSize className='w-5 h-5 text-[#9c9ea1] group-hover:text-[#e5e6eb]' />
      }
      sideAdjustment='-left-2'
    >
      <DropdownMenuButton
        onClick={() => editor.chain().focus().setParagraph().run()}
        checked={editor.isActive('paragraph')}
        ariaLabel='Paragraph'
      >
        <p className='text-[13px] py-[2px] '>Regular text</p>
      </DropdownMenuButton>

      <DropdownMenuButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        checked={editor.isActive('heading', { level: 1 })}
        ariaLabel='Heading 1'
      >
        <h1 className='text-base font-bold'>Heading 1</h1>
      </DropdownMenuButton>

      <DropdownMenuButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        checked={editor.isActive('heading', { level: 2 })}
        ariaLabel='Heading 2'
      >
        <h2 className='text-sm font-bold py-[2px]'>Heading 2</h2>
      </DropdownMenuButton>

      <DropdownMenuButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        checked={editor.isActive('heading', { level: 3 })}
        ariaLabel='Heading 3'
      >
        <h3 className='text-xs font-bold py-[4px]'>Heading 3</h3>
      </DropdownMenuButton>
    </DropdownMenu>
  )
}

export default HeadingDropDown
