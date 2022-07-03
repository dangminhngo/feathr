import type { Tag, AuthData, ValidateReturn, ValidateErrors } from './types'

export const validateTagForm = (data: Tag): ValidateReturn<Tag> => {
  let errors: ValidateErrors<Tag> = {}

  if (data.id && data.label) {
    errors.label = 'Label is empty'
  }

  if (Object.keys(errors).length === 0) {
    errors = null
  }

  return { data, errors }
}

const validateEmail = (email: string) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
const validatePassword = (password: string) =>
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password)

export const validateSignUpForm = (data: AuthData): ValidateReturn<AuthData> => {
  let errors: ValidateErrors<AuthData> = {}

  if (!validateEmail(data.email)) {
    errors.email = 'Email is incorrect'
  }

  if (!validatePassword(data.password)) {
    errors.password = 'Password is empty or so weak'
  }

  if (Object.keys(errors).length === 0) {
    errors = null
  }

  return { data, errors }
}

export const validateSignInForm = (data: AuthData): ValidateReturn<AuthData> => {
  let errors: ValidateErrors<AuthData> = {}

  if (!validateEmail(data.email)) {
    errors.email = 'Email is incorrect'
  }

  if (!data.password) {
    errors.password = 'Password is empty'
  }

  if (Object.keys(errors).length === 0) {
    errors = null
  }

  return { data, errors }
}
