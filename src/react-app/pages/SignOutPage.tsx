function SignOutPage({ onReturnToLogin }) {
  return (
    <div className="status-content">
      <span className="status-symbol signed-out-symbol" aria-hidden="true">&#8594;</span>
      <span className="eyebrow">SIGNED OUT</span>
      <h2>See you next time.</h2>
      <p>You have been signed out of this Morrow session.</p>
      <button className="primary-button return-button" onClick={onReturnToLogin} type="button">
        Back to sign in <span aria-hidden="true">&#8594;</span>
      </button>
    </div>
  )
}

export default SignOutPage