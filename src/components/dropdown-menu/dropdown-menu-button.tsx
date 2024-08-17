import { Check } from 'lucide-react'

type DropdownMenuButtonProps = {
  onClick: () => void
  checked: boolean
  ariaLabel: string
  children: React.ReactNode
}

const DropdownMenuButton = ({
  onClick,
  checked,
  ariaLabel,
  children,
}: DropdownMenuButtonProps) => {
  return (
    <button
      className='relative w-full flex select-none items-center rounded-lg py-1  pr-8 pl-2 text-sm outline-none transition-colors hover:bg-tiptap-menu-bar-background-hover hover:text-[#e5e6eb] text-[#9c9ea1]'
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
      {checked && (
        <span className='absolute right-2 flex h-4 w-4 items-center justify-center'>
          <Check className='h-4 w-4' />
        </span>
      )}
    </button>
  )
}

export default DropdownMenuButton
