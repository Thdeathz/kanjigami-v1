export const signInErrorMessages: ErrorMessages = {
  'Unauthorized/InvalidEmail': { name: 'email', errors: ['Invalid email.'] },
  'Unauthorized/InvalidPassword': { name: 'password', errors: ['Invalid password.'] }
}

export const signUpErrorMessages: ErrorMessages = {
  'Conflict/UsernameExisted': { name: 'username', errors: ['Username already used'] },
  'Conflict/EmailExisted': { name: 'email', errors: ['Email already registered'] }
}
