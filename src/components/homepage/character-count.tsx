import { useEditorContext } from '@/app/contexts/editor-context'

const CharacterCount = () => {
  const { editor } = useEditorContext()

  return (
    <div className="fixed flex flex-row px-4 py-2 text-sm rounded text-white/60 bottom-3 right-8 bg-component-background-dark tabular-nums">{`${
      editor ? editor.storage.characterCount.characters() : 0
    } characters, ${
      editor ? editor.storage.characterCount.words() : 0
    } words`}</div>
  )
}

export default CharacterCount
