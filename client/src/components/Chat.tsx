import React, { useEffect, useState } from "react";
import { ChatProps, getToken, getUserName, MessagesI } from "../assets/utilities";
import { apiClient } from "../config";
import { ApiRoutes } from "../enums/ApiRoutes";
import { socket } from "../socket";
import '../styles/common.css';
import { IoMdSend } from "react-icons/io";

const Chat: React.FC<ChatProps> = ({ chatHistory, sessionId }) => {

	const [chatData, setChatData] = useState<MessagesI[]>(chatHistory);
	const [message, setMessage] = useState("");
	const [showTime, setTime] = useState(false);

	useEffect(() => {
		socket.on('connect', () => {
			console.log('Connected to the server');
		});

		socket.on('connect_error', (error: any) => {
			console.error('Connection error:', error);
		});
		socket.on('message', (newMessage: any) => {
			console.log("Received a new message:", newMessage);
			const serverMessage: MessagesI = {
				time: new Date().toLocaleString(),
				user: "server",
				message: newMessage
			};
			setChatData((prev) => [...prev, serverMessage]);
		});
		return () => {
			socket.off('connect');
			socket.off('connect_error');
			socket.off('message');
		};
	}, []);

	useEffect(() => {
		if (chatData && chatData.length && (chatData.length > chatHistory.length)) {
			let titleStr = chatData.length === 1 ? `&title=${chatData[0].message.toUpperCase()}` : "" 
			let headers = { Authorization: `bearer ${getToken()}` };
			apiClient.put(`${ApiRoutes.UPDATE_CHAT_HISTORY}?sessionId=${sessionId}${titleStr}`, chatData, { headers: headers })
				.then(() => {
					console.log("Chat history updated successfully");
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [chatData]);

	const handleSendMessage = () => {
		if (message === "") return;
		const LoggedInUserName = getUserName();
		const userMessage: MessagesI = {
			time: new Date().toLocaleString(),
			user: LoggedInUserName,
			message: message
		};
		socket.emit('message', message);
		setChatData((prev) => [...prev, userMessage]);
		setMessage('');
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			handleSendMessage();
		}
	};
	useEffect(() => {
		if(chatHistory){
			setChatData(chatHistory);
		}else{
			setChatData([])
		}
	}, [chatHistory]);

	return (
		<>
			<div className="main-chat-div">
				<div className="chat-div" >
					{chatData && chatData.map((item, index) => (
						<div key={index} style={{ marginBottom: '10px' }} className={item.user === "server" ? 'server-message' : 'user-message'} >
							<strong onClick={() => setTime((pre) => !pre)} >{item.user.toUpperCase()}</strong> {showTime ? <span className="message-time">({item.time})</span> : ""}
							<p className="message-content" >{item.message}</p>
						</div>
					))}
				</div>
				<div style={{ display: 'flex', marginTop: '10px' }}>
					<input className="signUpinput"
						type="text" placeholder="Message Here..."
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						style={{ flexGrow: 1, marginRight: '10px' }} onKeyDown={handleKeyDown}
					/>
					<button onClick={handleSendMessage}>
						<IoMdSend />
					</button>
				</div>
			</div >
		</>
	)
}

export default Chat;