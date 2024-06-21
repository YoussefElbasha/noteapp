import { useEditorContext } from '@/app/contexts/editor-context'
import { db } from '@/database/db.model'

export const useDeleteNote = (id: number) => {
  const { currentNote, setCurrentNote } = useEditorContext()

  db.userNotes.delete(id)

  db.userNotes.toArray().then((notes) => {
    if (notes?.length !== 0) {
      setCurrentNote(notes?.[0])
    } else {
      setCurrentNote(undefined)
    }
  })
}
