import { JSONContent } from '@tiptap/react'
import Dexie, { Table } from 'dexie'
import relationships from 'dexie-relationships'

// table inteface
export interface Note {
  id?: number
  title: string
  content: JSONContent
  createdAt: Date
  updatedAt: Date
  lastOpenedAt: Date
  // folderId?: number
}

export interface Folder {
  id?: number
  title: string
  createdAt: Date
  updatedAt: Date
}

export interface FolderToNote {
  folderId: number
  noteId: number
}

export interface Image {
  id?: number
  name: string
  blob: Blob
}

// const test = new Dexie('', { addons: [relationships] })

export class DB extends Dexie {
  // table name is userNotes
  folders!: Table<Folder>
  userNotes!: Table<Note>
  images!: Table<Image>
  constructor() {
    super('myDatabase')
    this.version(1).stores({
      folders: '++id, title, createdAt, updatedAt',
      userNotes: '++id, title, content, createdAt, updatedAt, lastOpenedAt',
      folderToNote: 'folderId, noteId',
      images: '++id, name, blob',
    })
  }
}

export const db = new DB() // export the db
