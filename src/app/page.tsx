'use client'

import TipTap from '@/components/editor/tiptap'
import ActivePages from '@/components/homepage/active-pages'
import CharacterCount from '@/components/homepage/character-count'
import EditorPane from '@/components/homepage/editor-pane'
import MenuBar from '@/components/homepage/menu-bar'
import PageHeader from '@/components/homepage/page-header'

const HomePage = () => {
  return (
    <main className='relative flex flex-row min-h-screen overflow-y-auto min-w-screen bg-background-dark'>
      <MenuBar />
      <EditorPane />
      <ActivePages />
      <CharacterCount />
    </main>
  )
}

export default HomePage

//  min-h-[calc(100vh-0.5rem-0.5rem)] max-h-[calc(100vh-0.5rem-0.5rem)]

//  onClick={() => {
//  editor?.commands.clearContent()
//  }}

//  onClick={() => editor?.commands.setContent(note.content)}
