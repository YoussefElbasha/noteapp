import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/shadcn/sheet'
import Nestable from 'react-nestable'
import cn from 'classnames'
import Trash from '@/icons/trash.svg'
import Upload from '@/icons/upload.svg'
import Add from '@/icons/add.svg'
import Menu from '@/icons/menu.svg'
import Folder from '@/icons/folder.svg'
import Page from '@/icons/page.svg'
import TrashAlt from '@/icons/delete-alt.svg'
import AddNoCircle from '@/icons/add-no-circle.svg'

const items = [
  {
    id: 0,
    text: 'Andy efefefefefefefefefefefwdwdwwdwdwdwdwdwdwdwdwdwdwd',
    type: 'page',
  },
  {
    id: 1,
    text: 'Harry',
    type: 'folder',
    children: [{ id: 2, text: 'David', type: 'page' }],
  },
]

const MenuBar = () => {
  return (
    <div className="fixed flex flex-col items-center justify-start h-full max-h-screen min-h-screen px-6 py-6 bg-transparent">
      <Sheet>
        <SheetTrigger>
          <Menu className="transition-colors min-w-5 min-h-5 max-w-5 max-h-5 text-text-dark/60 hover:text-text-dark" />
        </SheetTrigger>
        <SheetContent side={'left'}>
          <SheetHeader>
            <SheetTitle>Pages</SheetTitle>
          </SheetHeader>
          <Nestable
            maxDepth={2}
            className="flex-1 px-8 overflow-y-auto"
            items={items}
            renderItem={({ item }) => {
              return (
                <button
                  className={cn(
                    'flex flex-row items-center justify-between w-full py-2 rounded group',
                    {
                      'bg-hover-dark  border-hover-dark border-x-[10px] box-content -ml-[10px]':
                        item.type === 'folder',
                    }
                    // { 'full-bleed bg-hover-dark': item.type === 'folder' }
                    // { 'px-2 -mx-2 bg-hover-dark': item.type === 'folder' }
                  )}
                >
                  <div className="flex flex-row items-center justify-between gap-2 overflow-hidden">
                    {item.type === 'folder' ? (
                      <Folder className=" min-w-5 min-h-5 max-w-5 max-h-5 text-text-dark/60" />
                    ) : (
                      <Page className=" min-w-5 min-h-5 max-w-5 max-h-5 text-text-dark/60" />
                    )}
                    <p className="text-sm truncate text-text-dark">
                      {item.text}
                    </p>
                  </div>
                  <div className="flex flex-row items-center justify-center gap-2">
                    <button
                      onClick={() => alert('Add')}
                      className="invisible group-hover:visible"
                    >
                      <AddNoCircle className="transition-colors min-w-4 min-h-4 max-w-4 max-h-4 text-text-dark/60 hover:text-text-dark" />
                    </button>
                    <button
                      onClick={() => alert('Add')}
                      className="invisible group-hover:visible"
                    >
                      <TrashAlt className="transition-colors min-w-4 min-h-4 max-w-4 max-h-4 text-text-dark/60 hover:text-text-dark" />
                    </button>
                  </div>
                </button>
              )
            }}
          />
          <SheetFooter>
            <button className="flex flex-row items-center justify-center w-full py-2 transition-all rounded bg-component-background-dark hover:brightness-110 group ">
              <p className="text-sm transition-colors text-text-dark/60 group-hover:text-text-dark">
                Add Page
              </p>
            </button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <div className="flex flex-col items-center justify-start h-full gap-6 py-12">
        <button>
          <Add className="transition-colors min-w-5 min-h-5 max-w-5 max-h-5 text-text-dark/60 hover:text-text-dark" />
        </button>
        <button>
          <Upload className="transition-colors min-w-5 min-h-5 max-w-5 max-h-5 text-text-dark/60 hover:text-text-dark" />
        </button>
        <button>
          <Trash className="transition-colors min-w-5 min-h-5 max-w-5 max-h-5 text-text-dark/60 hover:text-text-dark" />
        </button>
      </div>
    </div>
  )
}

export default MenuBar
