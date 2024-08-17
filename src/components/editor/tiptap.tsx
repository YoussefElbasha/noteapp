'use client'

import { BubbleMenu, EditorContent } from '@tiptap/react'
import React, { use, useEffect, useRef } from 'react'
import TipTapMenuBar from './tiptap-menu-bar'
import { useEditorContext } from '@/app/contexts/editor-context'
import { useEditorStore } from '@/app/contexts/editor-store-provider'
import { db } from '@/database/db.model'

const TipTap = () => {
  const { editor, setCurrentNote } = useEditorContext()

  // const { editor } = useEditorStore((state) => state)

  // console.log(editor)

  // if (!editor) return null

  // const editorRef = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   editorRef.current?.addEventListener('blur', () => {
  //     console.log('blurred')
  //   })

  //   // cleanup this component
  //   return () => {
  //     editorRef.current?.removeEventListener('blur', () => {
  //       console.log('blurred')
  //     })
  //   }
  // }, [])

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

    <div className='[&>div:nth-child(1)]:flex [&>div:nth-child(1)]:flex-1 [&>div:nth-child(1)]:flex-col [&>div:nth-child(1)]:overflow-y-auto [&>div:nth-child(1)]:pb-20'>
      {/* <TipTapMenuBar /> */}
      {editor && (
        <BubbleMenu
          editor={editor}
          shouldShow={({ editor, view, state, from, to }) => {
            if (!view.hasFocus()) return false

            if (editor.isActive('image')) return false

            return true
          }}
        >
          <TipTapMenuBar />
        </BubbleMenu>
      )}
      {/* <TipTapMenuBar /> */}
      <EditorContent
        editor={editor}
        // ref={(div) => {
        //   console.log('EditorContent ref:', div)
        // }}
      />
    </div>
  )
}

export default TipTap
