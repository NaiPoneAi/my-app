export type Student = {
  id: string
  name: string
  fname: string
  dob: string
  gender: string
  grade: string
  contact: string
  address: string
}

export type NewStudent = Omit<Student, 'id'>

export async function fetchStudents(signal?: AbortSignal): Promise<Student[]> {
  const response = await fetch('http://localhost:8080/student/all', {
    headers: { Accept: 'application/json' },
    signal,
  })

  if (!response.ok) {
    throw new Error(`Unable to fetch students (${response.status}).`)
  }

  return response.json() as Promise<Student[]>
}

export async function addStudent(student: NewStudent): Promise<void> {
  const response = await fetch('http://localhost:8080/student/add', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  })

  if (!response.ok) {
    throw new Error(`Unable to add student (${response.status}).`)
  }
}

export async function updateStudent(id: string, student: NewStudent): Promise<void> {
  const response = await fetch(`http://localhost:8080/student/update/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  })

  if (!response.ok) {
    throw new Error(`Unable to update student (${response.status}).`)
  }
}

export async function deleteStudent(id: string): Promise<void> {
  const response = await fetch(`http://localhost:8080/student/delete/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`Unable to delete student (${response.status}).`)
  }
}