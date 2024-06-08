'use client'

import TipTap from '@/components/editor/tiptap'
import ActivePages from '@/components/homepage/active-pages'
// import { db } from '@/database/db.model'
// import { useLiveQuery } from 'dexie-react-hooks'
// import { useEditorContext } from './contexts/editor-context'
import CharacterCount from '@/components/homepage/character-count'
import MenuBar from '@/components/homepage/menu-bar'
import PageHeader from '@/components/homepage/page-header'

const HomePage = () => {
  // const { editor } = useEditorContext()

  // const notesList = useLiveQuery(() => db.userNotes.toArray())

  return (
    <main className="relative flex flex-row min-h-screen overflow-y-auto min-w-screen bg-background-dark">
      <MenuBar />
      <div className="max-w-[60%] pl-[calc(0.0445*100%)] flex flex-col flex-1 mx-auto">
        <PageHeader />
        <TipTap />
      </div>
      <ActivePages />
      <CharacterCount />
    </main>
  )
}

export default HomePage

// min-h-[calc(100vh-0.5rem-0.5rem)] max-h-[calc(100vh-0.5rem-0.5rem)]

// <div className="flex flex-col w-[15%] min-h-[calc(100vh-0.5rem-0.5rem)] max-h-[calc(100vh-0.5rem-0.5rem)] gap-[0.45rem]">
//         <div className="rounded-md bg-white h-[5%] flex flex-row items-center justify-start px-2 py-0.5">
//           <Booklet className="w-[1.3rem] h-[1.3rem] mr-1" />
//           <h1 className="text-lg font-bold">noteapp</h1>
//           <button
//             className="ml-auto mr-1 rounded-md hover:bg-zinc-200/50"
//             title="New Note"
//             onClick={() => {
//               editor?.commands.clearContent()
//             }}
//           >
//             <Minimize className="w-7 h-7" />
//           </button>
//           <button
//             className="hover:bg-zinc-200/50 p-0.5 rounded-md"
//             title="New Note"
//             onClick={() => {
//               editor?.commands.clearContent()
//             }}
//           >
//             <NewNote className="w-6 h-6" />
//           </button>
//         </div>
//         <div className="flex flex-col items-start justify-start h-full px-1 py-1 overflow-auto bg-white rounded-md">
//           <Accordion type="single" collapsible className="w-full ">
//             <AccordionItem value="item-1" className="border-b-0 ">
//               <AccordionTrigger className="px-1 py-1 rounded-md hover:bg-zinc-200/50">
//                 <div className="flex flex-row items-center justify-center gap-1">
//                   <Folder className="w-4 h-4 -translate-y-px" />
//                   <p className="overflow-hidden text-sm truncate">
//                     Is it accessible?
//                   </p>
//                 </div>
//               </AccordionTrigger>
//               {notesList?.map((note, index) => (
//                 <AccordionContent key={index}>
//                   <button
//                     key={index}
//                     onClick={() => editor?.commands.setContent(note.content)}
//                     className="hover:bg-zinc-200/50 rounded-md w-full flex flex-row items-center justify-start pr-1 pl-[0.35rem] py-1 gap-1.5"
//                     title="Save"
//                   >
//                     <ArrowTurnUp className="w-3 h-3 rotate-90 translate-y-px" />
//                     <p className="overflow-hidden text-sm truncate">
//                       {/* {note.id} */}
//                       efuebfjebfefnemfbekbmfbejfebs
//                     </p>
//                   </button>
//                 </AccordionContent>
//               ))}
//             </AccordionItem>
//           </Accordion>
//         </div>
//       </div>
