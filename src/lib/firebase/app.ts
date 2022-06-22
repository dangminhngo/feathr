import { initializeApp } from 'firebase/app'

import { FIREBASE } from '$lib/secrets'

const config = { ...FIREBASE }

const app = initializeApp(config)

export default app
