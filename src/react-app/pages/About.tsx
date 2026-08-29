import "./About.css";

export function About() {
	return (
		<div className="page-container">
			<div className="page-header">
				<h1>About</h1>
				<p>Learn more about our application</p>
			</div>

			<div className="about-content">
				<section className="about-section">
					<h2>About This Application</h2>
					<p>
						This is a modern web application built with React, TypeScript, and Vite.
						It leverages Cloudflare Workers and Hono for serverless backend functionality.
					</p>
				</section>

				<section className="about-section">
					<h2>Technology Stack</h2>
					<ul className="tech-list">
						<li>React 19 - UI library</li>
						<li>TypeScript - Type-safe JavaScript</li>
						<li>Vite - Fast build tool and dev server</li>
						<li>Hono - Lightweight web framework</li>
						<li>Cloudflare Workers - Serverless computing platform</li>
					</ul>
				</section>

				<section className="about-section">
					<h2>Features</h2>
					<ul className="features-list">
						<li>Fast and responsive UI</li>
						<li>Serverless backend</li>
						<li>Real-time updates</li>
						<li>Cross-platform compatibility</li>
						<li>Type-safe development</li>
					</ul>
				</section>

				<section className="about-section">
					<h2>Getting Started</h2>
					<p>
						To get started with this application, navigate through the dashboard, manage your
						user profile, and explore the various features available. For more information,
						check the documentation or contact support.
					</p>
				</section>
			</div>
		</div>
	);
}
