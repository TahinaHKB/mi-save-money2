import React, { useState } from "react";
import './SignIn.css';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from './logo.png';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Firebase";
import { ref, set } from "firebase/database";

function SignIn() {
	const data =
	{
		username: "",
		email: "",
		password: "",
	}

	const navigate = useNavigate();

	const [dataUser, setDataUser] = useState(data);

	const { username, email, password } = dataUser;

	const handleChange = e => {
		e.preventDefault();
		setDataUser({ ...dataUser, [e.target.id]: e.target.value });
	}

	const handleSubmit = async e => {
		e.preventDefault();
		const { email, password, username } = dataUser;
		await createUserWithEmailAndPassword(auth, email, password)
			.then(userCredential => {
				setDataUser({ ...data });
				navigate("/login");

				writeUserData(userCredential.user.uid, username, password, email);
			})
			.catch(error => {
				console.log(error);
				setDataUser({ ...data })
			})
	}

	const writeUserData = (uid, username, password, email) => {
        set(ref(db, 'users/' + uid), {
		  username : username,
		  password: password,
          email: email,
        });
    }


	const button = email === "" || username === "" || password === "" ?
		<button disabled name="button" className="btn login_btn">Create</button> :
		<button name="button" className="btn login_btn">Create</button>

	return (
		<div className="container h-100">
			<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
			<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" integrity="sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP" crossOrigin="anonymos"></link>
			<div className="d-flex justify-content-center h-100 c">
				<div className="user_card">
					<div className="d-flex justify-content-center">
						<div className="brand_logo_container">
							<img src={logo} className="brand_logo" alt="Logo" />
						</div>
					</div>
					<div className="d-flex justify-content-center form_container">
						<form onSubmit={handleSubmit}>
							<div className="input-group mb-3">
								<div className="input-group-append">
									<span className="input-group-text"><i className="fas fa-user"></i></span>
								</div>
								<input required onChange={handleChange} id="username" type="text" className="form-control input_user" value={username} placeholder="username" />
							</div>
							<div className="input-group mb-3">
								<div className="input-group-append">
									<span className="input-group-text"><i className="fas fa-user"></i></span>
								</div>
								<input required onChange={handleChange} id="email" type="email" className="form-control input_user" value={email} placeholder="email" />
							</div>
							<div className="input-group mb-2">
								<div className="input-group-append">
									<span className="input-group-text"><i className="fas fa-key"></i></span>
								</div>
								<input required onChange={handleChange} id="password" type="password" className="form-control input_pass" value={password} placeholder="password" />
							</div>
							<div className="d-flex justify-conloginctent-center mt-3 login_container">
								{button}
							</div>
						</form>
					</div>

					<div className="mt-4">
						<div className="d-flex justify-content-center links">
							Already have an account ? <NavLink to="/login" className="ml-2">Sign In</NavLink>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SignIn;