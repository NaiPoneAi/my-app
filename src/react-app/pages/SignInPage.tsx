type SignInPageProps = {
  email: string
  onEmailChange: (email: string) => void
  password: string
  onPasswordChange: (password: string) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  showPassword: boolean
  onTogglePassword: () => void
}

function SignInPage({ email, onEmailChange, password, onPasswordChange, onSubmit, showPassword, onTogglePassword }: SignInPageProps) {
  return (
    <div className="form-content">
      <p className="mobile-wordmark"><span className="wordmark-mark">m</span> morrow</p>
      <div className="form-heading">
        <span className="eyebrow">WELCOME BACK</span>
        <h2>Sign in to Morrow</h2>
        <p>Pick up right where your team left off.</p>
      </div>

      <form className="login-form" onSubmit={onSubmit}>
        <label htmlFor="email">Work email</label>
        <input
          autoComplete="email"
          autoFocus
          id="email"
          name="email"
          onChange={(event) => onEmailChange(event.target.value)}
          placeholder="you@company.com"
          required
          type="email"
          value={email}
        />

        <div className="password-label">
          <label htmlFor="password">Password</label>
          <a href="#forgot-password" onClick={(event) => event.preventDefault()}>Forgot password?</a>
        </div>
        <div className="password-field">
          <input
            autoComplete="current-password"
            id="password"
            name="password"
            onChange={(event) => onPasswordChange(event.target.value)}
            placeholder="Enter your password"
            required
            type={showPassword ? 'text' : 'password'}
            value={password}
          />
          <button
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="show-password"
            onClick={onTogglePassword}
            type="button"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <label className="remember-option">
          <input type="checkbox" name="remember" />
          <span>Keep me signed in</span>
        </label>

        <button className="primary-button" type="submit">Sign in <span aria-hidden="true">&#8594;</span></button>
      </form>

      <p className="form-footnote">New to Morrow? <a href="#contact" onClick={(event) => event.preventDefault()}>Ask your team for an invite</a></p>
      <p className="legal-note">By continuing, you agree to our <a href="#terms" onClick={(event) => event.preventDefault()}>Terms</a> and <a href="#privacy" onClick={(event) => event.preventDefault()}>Privacy Policy</a>.</p>
    </div>
  )
}

export default SignInPage