export enum ModalType {
  Note = 'note',
  List = 'list',
  Tag = 'tag',
  Themes = 'themes',
  Shortcuts = 'shortcuts',
  About = 'about',
  Account = 'account',
}

export enum ContextMenuType {
  Tags = 'tags',
  Background = 'background',
  Settings = 'settings',
  Account = 'account',
}

export enum FirebaseErrorCode {
  USER_NOT_FOUND = 'auth/user-not-found',
  EMAIL_ALREADY_IN_USE = 'auth/email-already-in-use',
  WRONG_PASSWORD = 'auth/wrong-password',
}
