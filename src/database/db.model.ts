import { JSONContent } from '@tiptap/react';
import Dexie, { Table } from 'dexie';

// table inteface
export interface Note {
  id?: number;
  content: JSONContent;
}

export class DB extends Dexie {
  // table name is userNotes
  userNotes!: Table<Note>;
  constructor() {
    super('myDatabase');
    this.version(1).stores({
      userNotes: '++id, content'
    });
  }
}

export const db = new DB(); // export the db