import { get } from 'svelte/store'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { authState } from '$lib/state'

const storage = getStorage()
const getUserIdFromAuthState = () => {
  const _authState = get(authState)

  if (!_authState.authUser) throw new Error('No authenticate')

  return _authState.authUser.id
}

const validFileTypes = ['image/png', 'image/jpeg', 'image/jpg']

const uploadImage = async (files: FileList | null) => {
  if (!files) throw new Error('No files chosen')

  const userId = getUserIdFromAuthState()
  const urls = []

  for (let i = 0; i < files.length; i++) {
    const file = files[i]

    if (!validFileTypes.includes(file.type)) {
      throw new Error('Only image files can be uploaded')
    }

    const [filename, ext] = file.name.split('.')
    const storageRef = ref(storage, `${userId}/${filename}_${Date.now()}.${ext}`)
    const snapshot = await uploadBytes(storageRef, file)
    const url = await getDownloadURL(snapshot.ref)
    urls.push(url)
  }

  return urls
}

export default {
  uploadImage,
}
