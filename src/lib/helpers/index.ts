import { v4 as uuid } from 'uuid'
import type { Note } from '$lib/types'

export const createEmptyNote = (): Note => ({
  id: uuid(),
  title: '',
  body: '',
  images: [],
  tagIds: [],
  pinned: false,
  trash: false,
})
