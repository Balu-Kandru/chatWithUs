import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/SignUp.css";
import '../styles/common.css';


const SignUp: React.FC = () => {
	const [registerState, setRegisterState] = useState({});
	const navigate = useNavigate();
	const navigateToSignIn = () => {
		navigate("/");
	}

	const [isLargeScreen, setIsLargeScreen] = useState(window.matchMedia("(min-width: 768px)").matches);

	useEffect(() => {
	  const mediaQuery = window.matchMedia("(min-width: 768px)");
	  const handleMediaChange = (e: any) => setIsLargeScreen(e.matches);
  
	  mediaQuery.addEventListener('change', handleMediaChange);
  
	  // Cleanup listener on unmount
	  return () => mediaQuery.removeEventListener('change', handleMediaChange);
	}, []);

	//event: React.ChangeEvent<HTMLInputElement>
	const handleLogin = () => {
		// event.preventDefault();
		axios.post("https://laundry-cart-server.herokuapp.com/user/register", registerState)
			.then((res) => {
				alert("successfully registered")
				navigate("/")
			}).catch((err) => {
				if (err.response.status === 404) {
					alert("please enter all the details")
				} else {
					alert(err.response.data)
				}
			})
	}

	if(isLargeScreen){
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
								<input id="name1" type="text" placeholder="Name" className="signUpinput" onChange={(e) => { setRegisterState({ ...registerState, name: e.target.value }) }} />
							</div>
							<div className="width80 mt5">
								<input id="email1" type="email" placeholder="Email" className="signUpinput" onChange={(e) => { setRegisterState({ ...registerState, email: e.target.value }) }} />
							</div>
							<div className="width80 mt5">
								<input id="password1" type="password" className="signUpinput" placeholder="Password" onChange={(e) => { setRegisterState({ ...registerState, password: e.target.value }) }} />
							</div>
							<div className="m5">
								<button type="submit" className="fs24 button" onClick={handleLogin}>Register</button>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}else{
		return(
			<>
				<div className="loginDiv">
					<div className="HeadingDiv">Chat With Us</div>
					<div className="login-form">
						<div className="width80 fs32 form-heading">
							Sign up
						</div>
						<div className="width80 mt5">
							<input id="name1" type="text" placeholder="Name" className="signUpinput" onChange={(e) => { setRegisterState({ ...registerState, name: e.target.value }) }} />
						</div>
						<div className="width80 mt5">
							<input id="email1" type="email" placeholder="Email" className="signUpinput" onChange={(e) => { setRegisterState({ ...registerState, email: e.target.value }) }} />
						</div>
						<div className="width80 mt5">
							<input id="password1" type="password" className="signUpinput" placeholder="Password" onChange={(e) => { setRegisterState({ ...registerState, password: e.target.value }) }} />
						</div>
						<div className="m5">
							<button type="submit" className="fs24 button" onClick={handleLogin}>Register</button>
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