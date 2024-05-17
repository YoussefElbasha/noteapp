'use client'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import {
  BubbleMenu,
  EditorContent,
  EditorProvider,
  FloatingMenu,
  JSONContent,
  useEditor,
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import MenuBar from './menubar'

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
]

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`
const editorProps = {
  attributes: {
    class:
      'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl p-2 rounded-md mt-2 focus:outline-none bg-white overflow-y-auto flex-1 px-6 py-4',
  },
}

type TipTapProps = {
  content: JSONContent
}

const TipTap = ({ content }: TipTapProps) => {
  const editor = useEditor({
    extensions: extensions,
    content: content,
    editorProps: editorProps,
  })

  return (
    <EditorProvider
      slotBefore={<MenuBar />}
      extensions={extensions}
      content={content}
      editorProps={editorProps}
      // onFocus={(editor) => console.log('editor focused', editor)}
    >
      {/* <FloatingMenu>This is the floating menu</FloatingMenu> */}
      {/* <BubbleMenu>
        <MenuBar />
      </BubbleMenu> */}
    </EditorProvider>

    // <>
    //   <MenuBar editor={editor} />
    //   <EditorContent editor={editor} />
    // </>
  )
}

export default TipTap
