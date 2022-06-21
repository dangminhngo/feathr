import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

import { FIREBASE } from '$lib/secrets'

const config = FIREBASE

const app = initializeApp(config)
export const analytics = getAnalytics(app)

export default app
