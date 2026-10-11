export type LoginCredentials = {
  email: string
  password: string
}

export type RegisterCredentials = {
  name: string
  email: string
  password: string
}

export async function loginUser(credentials: LoginCredentials): Promise<void> {
  const response = await fetch('http://localhost:8080/users/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    throw new Error(`Unable to sign in (${response.status}).`)
  }
}

export async function registerUser(credentials: RegisterCredentials): Promise<void> {
  const response = await fetch('http://localhost:8080/users/register', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    throw new Error(`Unable to register (${response.status}).`)
  }
}