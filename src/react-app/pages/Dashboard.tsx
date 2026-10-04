import { NavLink } from 'react-router-dom'

function Dashboard({ email, onSignOut }: { email?: string; onSignOut: () => void }) {
  const firstName = email ? email.split('@')[0] : ''

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar" aria-label="Dashboard sidebar">
        <a className="dashboard-brand" href="#overview">
          <span className="wordmark-mark" aria-hidden="true">m</span>
          <span>morrow</span>
        </a>

        <div className="workspace-switcher">
          <span className="workspace-label">WORKSPACE</span>
          <strong>Studio North</strong>
        </div>

        <nav className="dashboard-nav" aria-label="Workspace navigation">
          <a className="dashboard-nav-link is-active" href="#overview" aria-current="page">
            <span className="nav-mark nav-mark-overview" aria-hidden="true" />Overview
          </a>
          <a className="dashboard-nav-link" href="#recent-projects-title">
            <span className="nav-mark nav-mark-projects" aria-hidden="true" />Projects
          </a>
          <a className="dashboard-nav-link" href="#today-title">
            <span className="nav-mark nav-mark-tasks" aria-hidden="true" />Tasks
          </a>
          <a className="dashboard-nav-link" href="#team-members">
            <span className="nav-mark nav-mark-team" aria-hidden="true" />Team
          </a>
          <NavLink
            className={({ isActive }) => `dashboard-nav-link${isActive ? ' is-active' : ''}`}
            to="/register"
          >
            <span className="nav-mark nav-mark-register" aria-hidden="true" />Register
          </NavLink>
        </nav>

        <div className="dashboard-sidebar-footer">
          <span className="member-avatar" aria-hidden="true">{firstName ? firstName[0].toUpperCase() : 'M'}</span>
          <span className="member-details">
            <strong>{firstName || 'Workspace member'}</strong>
            <small>{email || 'Morrow account'}</small>
          </span>
          <button className="dashboard-signout" onClick={onSignOut} type="button">Sign out</button>
        </div>
      </aside>

      <div className="dashboard-content" id="overview">
        <header className="dashboard-header">
          <div>
            <span className="eyebrow">MONDAY, SEPTEMBER 28</span>
            <h2>Good morning{firstName ? `, ${firstName}` : ''}.</h2>
            <p>Here’s what’s happening with your team today.</p>
          </div>
        </header>

      <section className="dashboard-stats" aria-label="Workspace overview">
        <article className="stat-item" id="team-members">
          <span>Open projects</span>
          <strong>08</strong>
          <small>2 due this week</small>
        </article>
        <article className="stat-item">
          <span>Tasks in progress</span>
          <strong>14</strong>
          <small>Across 4 projects</small>
        </article>
        <article className="stat-item">
          <span>Team members</span>
          <strong>06</strong>
          <small>All caught up</small>
        </article>
      </section>

      <section className="dashboard-section" aria-labelledby="recent-projects-title">
        <div className="section-heading">
          <h3 id="recent-projects-title">Recent projects</h3>
          <a href="#projects" onClick={(event) => event.preventDefault()}>View all <span aria-hidden="true">&#8594;</span></a>
        </div>
        <a className="project-row" href="#field-notes" onClick={(event) => event.preventDefault()}>
          <span className="project-mark project-mark-green">F</span>
          <span className="project-info"><strong>Field notes</strong><small>Brand refresh · 4 members</small></span>
          <span className="project-progress"><span style={{ width: '72%' }} /></span>
          <span className="project-percent">72%</span>
        </a>
        <a className="project-row" href="#spring-launch" onClick={(event) => event.preventDefault()}>
          <span className="project-mark project-mark-yellow">S</span>
          <span className="project-info"><strong>Spring launch</strong><small>Campaign · 3 members</small></span>
          <span className="project-progress"><span style={{ width: '48%' }} /></span>
          <span className="project-percent">48%</span>
        </a>
        <a className="project-row" href="#studio-site" onClick={(event) => event.preventDefault()}>
          <span className="project-mark project-mark-blue">S</span>
          <span className="project-info"><strong>Studio site</strong><small>Website · 2 members</small></span>
          <span className="project-progress"><span style={{ width: '91%' }} /></span>
          <span className="project-percent">91%</span>
        </a>
      </section>

      <section className="dashboard-section tasks-section" aria-labelledby="today-title">
        <div className="section-heading">
          <h3 id="today-title">Up next</h3>
          <span className="task-date">TODAY</span>
        </div>
        <div className="task-row"><span className="task-dot task-dot-green" /><span>Share moodboard with the team</span><small>Field notes</small></div>
        <div className="task-row"><span className="task-dot task-dot-yellow" /><span>Review launch copy</span><small>Spring launch</small></div>
      </section>
      </div>
    </div>
  )
}

export default Dashboard