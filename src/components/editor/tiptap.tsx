'use client'

import { EditorContent } from '@tiptap/react'
import React from 'react'
import TipTapMenuBar from './tiptap-menu-bar'
import { useEditorContext } from '@/app/contexts/editor-context'
import { useEditorStore } from '@/app/contexts/editor-store-provider'

const TipTap = () => {
  const { editor } = useEditorContext()
  // const { editor } = useEditorStore((state) => state)

  // console.log(editor)

  // if (!editor) return null

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

    <div className='[&_div:nth-child(2)]:flex [&_div:nth-child(2)]:flex-1 [&_div:nth-child(2)]:flex-col [&_div:nth-child(2)]:overflow-y-auto'>
      {/* <TipTapMenuBar /> */}
      <EditorContent editor={editor} />
    </div>
  )
}

export default TipTap
