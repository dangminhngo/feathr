import { doc, getFirestore } from 'firebase/firestore'
import app from './app'

const db = getFirestore(app)

export const userDoc = (id: string) => doc(db, 'users', id)

export default db
