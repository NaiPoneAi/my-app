import { useState } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route as RouterRoute,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import SignInPage from './pages/SignInPage.jsx'
import SignOutPage from './pages/SignOutPage.jsx'

function AccountPage({ email, onOpenDashboard }) {
  return (
    <div className="status-content">
      <span className="status-symbol" aria-hidden="true">&#10003;</span>
      <span className="eyebrow">YOU'RE SIGNED IN</span>
      <h2>Welcome to your space.</h2>
      <p>Your Morrow workspace is ready{email ? ` for ${email}` : ''}.</p>
      <button className="primary-button return-button" onClick={onOpenDashboard} type="button">
        Open dashboard <span aria-hidden="true">&#8594;</span>
      </button>
    </div>
  )
}

function RouteContent() {
  const [email, setEmail] = useState('test@email.com')
  const [password, setPassword] = useState('123')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  function handleSubmit(event) {
    event.preventDefault()
    navigate('/account')
  }

  function handleSignout() {
    navigate('/signout')
  }

  function handleRegister(registeredEmail) {
    setEmail(registeredEmail)
    navigate('/dashboard')
  }

  function handleReturnToLogin() {
    setPassword('')
    navigate('/')
  }

  return (
    <main className={`auth-layout${location.pathname === '/dashboard' ? ' dashboard-layout' : ''}`}>
      <aside className="welcome-panel" aria-label="Morrow workspace">
        <div className="welcome-image" role="img" aria-label="Sunlight over a quiet coastline" />
        <div className="welcome-shade" />
        <a className="wordmark" href="#home" onClick={(event) => event.preventDefault()}>
          <span className="wordmark-mark" aria-hidden="true">m</span>
          morrow
        </a>
        <div className="welcome-copy">
          <span className="eyebrow">YOUR SPACE, IN FOCUS</span>
          <h1>A little more room to do your best work.</h1>
          <p>Bring your team, your ideas, and your next big thing together.</p>
        </div>
        <div className="welcome-footer">
          <div className="avatar-stack" aria-hidden="true">
            <span>J</span><span>M</span><span>A</span><span>+</span>
          </div>
          <span>Good work happens together.</span>
        </div>
      </aside>

      <section className="form-panel" aria-live="polite">
        <Routes>
          <RouterRoute
            path="/"
            element={(
              <SignInPage
                email={email}
                onEmailChange={setEmail}
                password={password}
                onPasswordChange={setPassword}
                onSubmit={handleSubmit}
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
              />
            )}
          />
          <RouterRoute
            path="/account"
            element={<AccountPage email={email} onOpenDashboard={() => navigate('/dashboard')} />}
          />
          <RouterRoute
            path="/dashboard"
            element={<Dashboard email={email} onSignOut={handleSignout} />}
          />
          <RouterRoute path="/register" element={<RegisterPage onRegister={handleRegister} />} />
          <RouterRoute path="/signout" element={<SignOutPage onReturnToLogin={handleReturnToLogin} />} />
          <RouterRoute path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <footer className="panel-footer">
          <span>© 2026 Morrow</span>
          <a href="#help" onClick={(event) => event.preventDefault()}>Need help?</a>
        </footer>
      </section>
    </main>
  )
}

function Route() {
  return (
    <BrowserRouter>
      <RouteContent />
    </BrowserRouter>
  )
}

export default Route