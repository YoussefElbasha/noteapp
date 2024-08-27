'use client'

import ActivePages from '@/components/home-page/active-pages/active-pages'
import CharacterCount from '@/components/home-page/character-count'
import EditorPane from '@/components/editor/editor-pane/editor-pane'
import MenuBar from '@/components/menu-bar/menu-bar'

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
