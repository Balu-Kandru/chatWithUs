import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import "../styles/SignUp.css";
import '../styles/common.css';
import { apiClient } from "../config";
import { ApiRoutes } from "../enums/ApiRoutes";
import { setLocalStorage } from "../assets/utilities";
import isEmail from 'validator/lib/isEmail';


const SignUp: React.FC = () => {
	const [registerState, setRegisterState] = useState<SignUpI>({
		username: "",
		email: "",
		password: ""
	});
	const navigate = useNavigate();
	const navigateToSignIn = () => {
		navigate("/");
	}


	interface SignUpI {
		username: string,
		email: string,
		password: string
	}

	interface User {
		id: number;
		username: string;
		email: string;
		provider: string;
		confirmed: boolean;
		blocked: boolean;
		createdAt: string;
		updatedAt: string;
	}

	interface AuthResponse {
		jwt: string;
		user: User;
	}

	const [isLargeScreen, setIsLargeScreen] = useState(window.matchMedia("(min-width: 768px)").matches);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(min-width: 768px)");
		const handleMediaChange = (e: any) => setIsLargeScreen(e.matches);

		mediaQuery.addEventListener('change', handleMediaChange);

		return () => mediaQuery.removeEventListener('change', handleMediaChange);
	}, []);

	const handleSignUp = () => {
		if(!isEmail(registerState.email)){
			alert("email must be a valid email")
			return;
		}else if (registerState.password.length <= 5) {
			alert("password should be atleast 6 characters")
			return;
		}else if(!registerState.username.length){
			alert("username is a required field");
			return;
		}
		apiClient.post<ApiRoutes, AxiosResponse<AuthResponse>>(ApiRoutes.SIGNUP, registerState)
			.then((loginData: AxiosResponse<AuthResponse>) => {
				setLocalStorage(loginData.data.jwt, loginData.data.user.username);
				navigate("/chat")
			}).catch((err: any) => {
				alert(`Unauthorized user ${err}`);
			})
	}

	if (isLargeScreen) {
		return (
			<>
				<div className="d-flex">
					<div className="signInDiv">
						<div className="HeadingDiv">Chat With Us</div>
						<div className="signInButtonDiv">
							<p >Have An Account?</p>
							<button className="register-signin button" onClick={navigateToSignIn}>Sign In</button>
						</div>
					</div>
					<div className="loginDiv">
						<div className="login-form">
							<div className="width80 fs32 form-heading">
								Sign up
							</div>
							<div className="width80 mt5">
								<input id="name1" type="text" placeholder="Name" className="signUpinput" onChange={(e) => { setRegisterState({ ...registerState, username: e.target.value }) }} />
							</div>
							<div className="width80 mt5">
								<input id="email1" type="email" placeholder="Email" className="signUpinput" onChange={(e) => { setRegisterState({ ...registerState, email: e.target.value }) }} />
							</div>
							<div className="width80 mt5">
								<input id="password1" type="password" className="signUpinput" placeholder="Password" onChange={(e) => { setRegisterState({ ...registerState, password: e.target.value }) }} />
							</div>
							<div className="m5">
								<button type="submit" className="fs24 button" onClick={handleSignUp}>Register</button>
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
							Sign up
						</div>
						<div className="width80 mt5">
							<input id="name1" type="text" placeholder="Name" className="signUpinput" onChange={(e) => { setRegisterState({ ...registerState, username: e.target.value }) }} />
						</div>
						<div className="width80 mt5">
							<input id="email1" type="email" placeholder="Email" className="signUpinput" onChange={(e) => { setRegisterState({ ...registerState, email: e.target.value }) }} />
						</div>
						<div className="width80 mt5">
							<input id="password1" type="password" className="signUpinput" placeholder="Password" onChange={(e) => { setRegisterState({ ...registerState, password: e.target.value }) }} />
						</div>
						<div className="m5">
							<button type="submit" className="fs24 button" onClick={handleSignUp}>Register</button>
						</div>
					</div>
					<div className="signInButtonDiv">
						<p >Have An Account?</p>
						<button className="register-signin button" onClick={navigateToSignIn}>Sign In</button>
					</div>
				</div>
			</>
		)
	}
}

export default SignUp;