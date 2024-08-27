'use client'

import { BubbleMenu, EditorContent } from '@tiptap/react'
import TipTapMenuBar from '../tiptap-menu-bar/tiptap-menu-bar'
import { useEditorContext } from '@/app/contexts/editor-context'

const TipTap = () => {
  const { editor } = useEditorContext()

  return (
    <div className='[&>div:nth-child(1)]:flex [&>div:nth-child(1)]:flex-1 [&>div:nth-child(1)]:flex-col [&>div:nth-child(1)]:overflow-y-auto [&>div:nth-child(1)]:pb-20'>
      {editor && (
        <BubbleMenu
          editor={editor}
          shouldShow={({ editor, view, state, from, to }) => {
            if (!view.hasFocus()) return false

            if (editor.isActive('image')) return false

            const text = state.doc.textBetween(from, to, '\n')

            if (text.length > 0) return true

            return false
          }}
        >
          <TipTapMenuBar />
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
    </div>
  )
}

export default TipTap
