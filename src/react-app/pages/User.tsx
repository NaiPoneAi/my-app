import { useState } from "react";
import "./User.css";

export function User() {
	const [formData, setFormData] = useState({
		name: "John Doe",
		email: "john@example.com",
		bio: "Software developer and tech enthusiast",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Profile updated:", formData);
		alert("Profile updated successfully!");
	};

	return (
		<div className="page-container">
			<div className="page-header">
				<h1>User Profile</h1>
				<p>Manage your account information</p>
			</div>

			<div className="user-content">
				<div className="profile-card">
					<div className="profile-avatar">
						<span>{formData.name.charAt(0)}</span>
					</div>
					<h2>{formData.name}</h2>
					<p className="user-email">{formData.email}</p>
				</div>

				<form onSubmit={handleSubmit} className="profile-form">
					<div className="form-group">
						<label htmlFor="name">Name</label>
						<input
							type="text"
							id="name"
							name="name"
							value={formData.name}
							onChange={handleChange}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="bio">Bio</label>
						<textarea
							id="bio"
							name="bio"
							value={formData.bio}
							onChange={handleChange}
							rows={4}
						/>
					</div>

					<button type="submit" className="btn-submit">
						Save Changes
					</button>
				</form>
			</div>
		</div>
	);
}
