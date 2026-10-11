import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import type { RegisterCredentials } from '../api/auth'

function RegisterPage({ onRegister }: { onRegister: (credentials: RegisterCredentials) => Promise<void> }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await onRegister({ name, email, password })
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Unable to register. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="form-content">
      <p className="mobile-wordmark"><span className="wordmark-mark">m</span> morrow</p>
      <div className="form-heading">
        <span className="eyebrow">JOIN YOUR WORKSPACE</span>
        <h2>Create your account</h2>
        <p>Set up your Morrow profile and get started.</p>
      </div>

      <form className="login-form register-form" onSubmit={handleSubmit}>
        <label htmlFor="register-name">Full name</label>
        <input
          autoComplete="name"
          id="register-name"
          name="name"
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          required
          value={name}
        />

        <label htmlFor="register-email">Work email</label>
        <input
          autoComplete="email"
          id="register-email"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          required
          type="email"
          value={email}
        />

        <label htmlFor="register-password">Password</label>
        <input
          autoComplete="new-password"
          id="register-password"
          minLength={8}
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="At least 8 characters"
          required
          type="password"
          value={password}
        />

        <button className="primary-button" disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Creating account...' : 'Create account'} <span aria-hidden="true">&#8594;</span>
        </button>
        {error && <p className="form-error" role="alert">{error}</p>}
      </form>

      <p className="form-footnote">Already have an account? <Link to="/">Sign in</Link></p>
    </div>
  )
}

export default RegisterPage