// src/App.tsx

import { useState } from "react";
import { Dashboard } from "./pages/Dashboard";
import { User } from "./pages/User";
import { About } from "./pages/About";
import "./App.css";

type Page = "home" | "dashboard" | "user" | "about";

function App() {
	const [currentPage, setCurrentPage] = useState<Page>("home");
	const [name, setName] = useState("unknown");

	const renderPage = () => {
		switch (currentPage) {
			case "dashboard":
				return <Dashboard />;
			case "user":
				return <User />;
			case "about":
				return <About />;
			default:
				return <HomePage/>;
		}
	};

	return (
		<div className="app-container">
			<nav className="navbar">
				<div className="navbar-brand">MyApp</div>
				<ul className="navbar-menu">
					<li>
						<button
							className={`nav-link ${currentPage === "home" ? "active" : ""}`}
							onClick={() => setCurrentPage("home")}
						>
							Home
						</button>
					</li>
					<li>
						<button
							className={`nav-link ${currentPage === "dashboard" ? "active" : ""}`}
							onClick={() => setCurrentPage("dashboard")}
						>
							Dashboard
						</button>
					</li>
					<li>
						<button
							className={`nav-link ${currentPage === "user" ? "active" : ""}`}
							onClick={() => setCurrentPage("user")}
						>
							Profile
						</button>
					</li>
					<li>
						<button
							className={`nav-link ${currentPage === "about" ? "active" : ""}`}
							onClick={() => setCurrentPage("about")}
						>
							About
						</button>
					</li>
				</ul>
			</nav>

			<main className="main-content">
				{renderPage()}
			</main>
		</div>
	);
}

function HomePage() {
	return (
		<div className="page-container home-page">
			<div className="page-header">
				<h1>Welcome to MyApp</h1>
				<p>A modern React application with Vite and Cloudflare Workers</p>
			</div>
				<p>
					Click the button to increment the counter
				</p>
			</div>
			<div className="card">
				<p>
					Click to fetch your name from the Cloudflare Worker API
				</p>
			</div>
			<p className="read-the-docs">Navigate using the menu to explore different pages</p>
		</div>
	);
}

export default App;
