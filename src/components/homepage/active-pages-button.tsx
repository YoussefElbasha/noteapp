import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn/tooltip'

type ActivePagesButtonProps = {
  pageNumber: string
}

const ActivePagesButton = ({ pageNumber }: ActivePagesButtonProps) => {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <div className="relative group">
          <TooltipTrigger className="max-w-[2.32rem] min-w-[2.32rem] text-center py-2 text-sm rounded-lg bg-component-background-dark text-white/60 overflow-hidden truncate">
            {pageNumber}
          </TooltipTrigger>
          <button
            className="invisible absolute w-[0.75rem] h-[0.75rem] bg-orange-dark -top-[10%] -right-[12%] z-[100] text-white rounded-full group-hover:visible group-hover:animate-in group-hover:fade-in delay-100"
            onClick={() => alert('close')}
          ></button>
        </div>
        <TooltipContent>
          <p>Page {pageNumber}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default ActivePagesButton

{
  /* <button className="max-w-[2.32rem] min-w-[2.32rem] text-center py-2 text-sm rounded-lg bg-component-background-dark text-white/60 overflow-hidden truncate">
            {pageNumber}
          </button> */
}

{
  /* <button className="px-3.5 py-2 text-sm rounded-lg bg-component-background-dark text-white/60 ">
        2
</button> */
}
