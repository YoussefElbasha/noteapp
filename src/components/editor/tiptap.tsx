'use client'

import { EditorContent } from '@tiptap/react'
import React from 'react'
import MenuBar from './menubar'
import { useEditorContext } from '@/app/contexts/editor-context'

const TipTap = () => {
  const { editor } = useEditorContext()

  return (
    // <EditorProvider
    //   slotBefore={<MenuBar />}
    //   extensions={extensions}
    //   content={content}
    //   editorProps={editorProps}

    //   // onFocus={(editor) => console.log('editor focused', editor)}
    // >
    //   {/* <FloatingMenu>This is the floating menu</FloatingMenu> */}
    //   {/* <BubbleMenu>
    //     <MenuBar />
    //   </BubbleMenu> */}
    // </EditorProvider>

    <>
      <MenuBar />
      <EditorContent editor={editor} />
    </>
  )
}

export default TipTap
