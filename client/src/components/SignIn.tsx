import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { AxiosResponse } from 'axios';
// import padlock from '../assets/padlock.svg'
import "../styles/SignIn.css"
import { apiClient } from "../config";
import { ApiRoutes } from "../enums/ApiRoutes";
import { setLocalStorage } from "../assets/utilities";

const SignIn: React.FC = () => {
	const [signupState, setSignupstate] = useState({});
	const [passwordShown, setPasswordShown] = useState(false);
	const navigate = useNavigate();
	const [isLargeScreen, setIsLargeScreen] = useState(window.matchMedia("(min-width: 768px)").matches);

	const navigateToRegister = () => {
		navigate("/register");
	}

	interface UserI {
		id: number;
		username: string;
	}

	interface LoginI {
		jwt: string;
		user: UserI;
	}


	useEffect(() => {
		const mediaQuery = window.matchMedia("(min-width: 768px)");
		const handleMediaChange = (e: any) => setIsLargeScreen(e.matches);
		mediaQuery.addEventListener('change', handleMediaChange);
		return () => mediaQuery.removeEventListener('change', handleMediaChange);
	}, []);

	const handleLogin = () => {
		apiClient.post<ApiRoutes, AxiosResponse<LoginI>>(ApiRoutes.LOGIN, signupState)
			.then((loginData: AxiosResponse<LoginI>) => {
				setLocalStorage(loginData.data.jwt, loginData.data.user.username);
				navigate("/chat")
			}).catch((err: any) => {
				alert(`Unauthorized user ${err}`);

			})
	}

	// const togglePassword = () => {
	// 	setPasswordShown(!passwordShown);
	// }

	if (isLargeScreen) {
		return (
			<>
				<div className="d-flex">
					<div className="signInDiv">
						<div className="HeadingDiv">Chat With Us</div>
						<div className="signInButtonDiv">
							<p >Don't have An Account?</p>
							<button className="register-signin button" onClick={navigateToRegister}>Register</button>
						</div>
					</div>
					<div className="loginDiv">
						<div className="login-form">
							<div className="width80 fs32 form-heading">
								SIGN IN
							</div>
							<div className="width80 mt5">
								<input id="email1" type="email" placeholder="Email" className="signUpinput" onChange={(e) => { setSignupstate({ ...signupState, identifier: e.target.value }) }} />
							</div>
							<div className="width80 mt5">
								<input id="password1" type={passwordShown ? "text" : "password"} className="signUpinput" placeholder="Password" onChange={(e) => { setSignupstate({ ...signupState, password: e.target.value }) }} />
							{/* <img src={padlock} onClick={togglePassword} alt="err"></img> */}

							</div>
							<div className="m5">
								<button type="submit" className="fs24 button" onClick={handleLogin}>Log in</button>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	} else {
		return (
			<>
				<div className="loginDiv">
					<div className="HeadingDiv">Chat With Us</div>
					<div className="login-form">
						<div className="width80 fs32 form-heading">
							SIGN IN
						</div>
						<div className="width80 mt5">
							<input id="email1" type="email" placeholder="Email" className="signUpinput" onChange={(e) => { setSignupstate({ ...signupState, identifier: e.target.value }) }} />
						</div>
						<div className="width80 mt5">
							<input id="password1" type="password" className="signUpinput" placeholder="Password" onChange={(e) => { setSignupstate({ ...signupState, password: e.target.value }) }} />
							{/* <img src={padlock} onClick={togglePassword} alt="err"></img> */}
						
						</div>
						<div className="m5">
							<button type="submit" className="fs24 button" onClick={handleLogin}>Log in</button>
						</div>
					</div>
					<div className="signInButtonDiv">
						<p >Don't have An Account?</p>
						<button className="register-signin button" onClick={navigateToRegister}>Register</button>
					</div>
				</div>
			</>
		)
	}
}

export default SignIn;