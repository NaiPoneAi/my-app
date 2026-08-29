import "./Dashboard.css";

export function Dashboard() {
	return (
		<div className="page-container">
			<div className="page-header">
				<h1>Dashboard</h1>
				<p>Welcome to your dashboard</p>
			</div>

			<div className="dashboard-grid">
				<div className="card">
					<h2>Overview</h2>
					<p>Get a comprehensive view of your application's performance and statistics.</p>
				</div>

				<div className="card">
					<h2>Analytics</h2>
					<p>Track user activity, engagement metrics, and system performance in real-time.</p>
				</div>

				<div className="card">
					<h2>Quick Actions</h2>
					<p>Access frequently used features and shortcuts for quick navigation.</p>
				</div>

				<div className="card">
					<h2>Recent Activity</h2>
					<p>View your recent actions and updates across the application.</p>
				</div>
			</div>
		</div>
	);
}
