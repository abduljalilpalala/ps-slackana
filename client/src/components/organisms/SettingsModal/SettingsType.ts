export type Profile = {
  fullName: string | undefined,
  email: string | undefined
}

export type Password = {
  currentPassword: string,
  newPassword: string,
  newConfirmedPassword: string
}

export type Event = {
  target?: {
    value: string,
    name: string
  }
}
