import { useState } from 'react'
import ChevronDown from '@/icons/arrow-down-s-line.svg'
import cn from 'classnames'
import { useEditorContext } from '@/app/contexts/editor-context'
import { useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

type DropdownMenuProps = {
  icon: React.ReactNode
  children: React.ReactNode
  sideAdjustment: string
  className?: string
}

const DropdownMenu = ({
  icon,
  children,
  sideAdjustment,
  className,
}: DropdownMenuProps) => {
  const { editor } = useEditorContext()

  const [open, setOpen] = useState(false)

  const ref = useRef(null)

  const handleClickOutside = () => {
    setOpen(false)
  }

  useOnClickOutside(ref, handleClickOutside)

  if (!editor) {
    return null
  }

  return (
    <div className='relative' onClick={() => setOpen(!open)} ref={ref}>
      <button
        className={cn(
          'hover:bg-tiptap-menu-bar-background-hover group py-0.5 pl-1 rounded-md flex flex-row justify-center items-center transition-colors',
          { 'bg-[#2d3038]': open },
          className
        )}
      >
        {icon}
        <ChevronDown className='w-4 h-4 text-[#9c9ea1] group-hover:text-[#e5e6eb]' />
      </button>
      {open && (
        <div
          className={cn(
            'absolute top-[2.15rem] bg-component-background-dark leading-[1.625rem] tracking-[-0.0125rem] rounded-xl  border-none z-50 min-w-max overflow-hidden bg-popover p-1 text-popover-foreground shadow-md',
            sideAdjustment,
            {
              'animate-in fade-in-0 zoom-in-95 slide-in-from-top-2': open,
            }
            // doesn't work, boolean state makes it disappear to fast, could fix using visibility
            // {
            //   'animate-out fade-out-0 zoom-out-95 slide-in-from-top-2': !open,
            // }
          )}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export default DropdownMenu
