import { useEffect, useState, type FormEvent } from 'react'
import {
  addStudent,
  deleteStudent,
  fetchStudents,
  type NewStudent,
  type Student,
  updateStudent,
} from '../api/students'

function StudentPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [query, setQuery] = useState('')
  const [loadError, setLoadError] = useState('')
  const [saveError, setSaveError] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    fetchStudents(controller.signal)
      .then(setStudents)
      .catch((error: unknown) => {
        if (!controller.signal.aborted) {
          setLoadError(error instanceof Error ? error.message : 'Unable to fetch students.')
        }
      })

    return () => controller.abort()
  }, [])

  const filteredStudents = students.filter((student) =>
    Object.values(student).join(' ')
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  )

  async function handleAddStudent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const values = new FormData(form)
    const student = Object.fromEntries(
      ['name', 'fname', 'dob', 'gender', 'grade', 'contact', 'address']
        .map((field) => [field, String(values.get(field) ?? '').trim()]),
    ) as NewStudent

    setSaveError('')
    setIsSaving(true)
    try {
      if (editingStudent) {
        await updateStudent(editingStudent.id, student)
        setStudents((currentStudents) => currentStudents.map((currentStudent) =>
          currentStudent.id === editingStudent.id ? { ...student, id: editingStudent.id } : currentStudent,
        ))
      } else {
        await addStudent(student)
      }
      form.reset()
      setEditingStudent(null)
      try {
        setStudents(await fetchStudents())
        setLoadError('')
      } catch (error) {
        setLoadError(error instanceof Error ? error.message : 'The student was saved, but the list could not be refreshed.')
      }
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'Unable to add student.')
    } finally {
      setIsSaving(false)
    }
  }

  function handleEditStudent(student: Student) {
    setEditingStudent(student)
    setSaveError('')
    document.getElementById('add-student-title')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  async function handleDeleteStudent(student: Student) {
    if (!window.confirm(`Delete ${student.name}?`)) return

    setSaveError('')
    setDeletingId(student.id)
    try {
      await deleteStudent(student.id)
      setStudents((currentStudents) => currentStudents.filter((currentStudent) => currentStudent.id !== student.id))
      if (editingStudent?.id === student.id) setEditingStudent(null)
      try {
        setStudents(await fetchStudents())
        setLoadError('')
      } catch (error) {
        setLoadError(error instanceof Error ? error.message : 'Student deleted, but the list could not be refreshed.')
      }
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'Unable to delete student.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="dashboard-content">
      <header className="dashboard-header">
        <div>
          <span className="eyebrow">STUDIO NORTH</span>
          <h2>Students</h2>
          <p>Add and manage student records.</p>
        </div>
      </header>

      <section className="student-form-section" aria-labelledby="add-student-title">
        <div className="section-heading">
          <h3 id="add-student-title">{editingStudent ? 'Edit student' : 'Add a student'}</h3>
        </div>
        <form className="student-form" key={editingStudent?.id ?? 'new-student'} onSubmit={handleAddStudent}>
          <div className="student-form-grid">
            <div className="student-field">
              <label htmlFor="student-name">Name</label>
              <input autoComplete="name" defaultValue={editingStudent?.name ?? ''} id="student-name" name="name" required />
            </div>
            <div className="student-field">
              <label htmlFor="student-fname">Father&apos;s name</label>
              <input autoComplete="off" defaultValue={editingStudent?.fname ?? ''} id="student-fname" name="fname" required />
            </div>
            <div className="student-field">
              <label htmlFor="student-dob">Date of birth</label>
              <input defaultValue={editingStudent?.dob ?? ''} id="student-dob" name="dob" required type="date" />
            </div>
            <div className="student-field">
              <label htmlFor="student-gender">Gender</label>
              <select defaultValue={editingStudent?.gender ?? ''} id="student-gender" name="gender" required>
                <option disabled value="">Select gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
            <div className="student-field">
              <label htmlFor="student-grade">Grade</label>
              <input defaultValue={editingStudent?.grade ?? ''} id="student-grade" name="grade" required />
            </div>
            <div className="student-field">
              <label htmlFor="student-contact">Contact</label>
              <input autoComplete="tel" defaultValue={editingStudent?.contact ?? ''} id="student-contact" name="contact" required type="tel" />
            </div>
            <div className="student-field student-address-field">
              <label htmlFor="student-address">Address</label>
              <textarea autoComplete="street-address" defaultValue={editingStudent?.address ?? ''} id="student-address" name="address" required rows={2} />
            </div>
          </div>
          <button className="primary-button student-submit" disabled={isSaving} type="submit">
            {isSaving ? 'Saving student...' : editingStudent ? 'Save changes' : 'Add student'}
          </button>
          {editingStudent && (
            <button className="student-cancel" onClick={() => setEditingStudent(null)} type="button">
              Cancel edit
            </button>
          )}
        </form>
      </section>

      <div className="student-toolbar">
        <span className="student-count">{filteredStudents.length} of {students.length} students</span>
        <label className="visually-hidden" htmlFor="student-search">Search students</label>
        <input
          className="student-search"
          id="student-search"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search name, email, or cohort"
          type="search"
          value={query}
        />
      </div>
      {loadError && <p role="alert">{loadError}</p>}
      {saveError && <p role="alert">{saveError}</p>}

      <div className="student-table-wrap">
        <table className="student-table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Father&apos;s name</th>
              <th scope="col">Date of birth</th>
              <th scope="col">Gender</th>
              <th scope="col">Grade</th>
              <th scope="col">Contact</th>
              <th scope="col">Address</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.fname}</td>
                <td>{student.dob}</td>
                <td>{student.gender}</td>
                <td>{student.grade}</td>
                <td>{student.contact}</td>
                <td>{student.address}</td>
                <td className="student-actions">
                  <button className="student-row-action" onClick={() => handleEditStudent(student)} type="button">Edit</button>
                  <button
                    className="student-row-action student-delete-action"
                    disabled={deletingId === student.id}
                    onClick={() => handleDeleteStudent(student)}
                    type="button"
                  >
                    {deletingId === student.id ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td className="student-empty" colSpan={9}>
                  {students.length === 0 ? 'No student records yet.' : `No students match "${query}".`}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StudentPage