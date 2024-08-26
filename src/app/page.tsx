'use client'

import ActivePages from '@/components/homepage/active-pages'
import CharacterCount from '@/components/homepage/character-count'
import EditorPane from '@/components/homepage/editor-pane'
import MenuBar from '@/components/homepage/menu-bar'

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
