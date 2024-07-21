import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import { apiClient } from "../config";
import { ApiRoutes } from "../enums/ApiRoutes";
import { getToken, MessagesI } from "../assets/utilities";
import { AxiosResponse } from "axios";
import Chat from "./Chat";

const DashBoard: React.FC = () => {
	const [titles, setTitles] = useState<SessionAPII[]>([]);
	const [chatHistory, setChatHistory] = useState<MessagesI[]>([]);
	const [isCollapsed, setIsCollapsed] = useState(true);
	const [isSelected, setIsSelected] = useState(false);
	const [sessionIdVar, setSessionIdVar] = useState(0);
	const hasFetched = useRef(false);

	interface SessionAPII {
		id: number;
		title: string;
	}

	interface ChatHistoryAPII {
		history: MessagesI[];
	}

	const getSessions = async () => {
		try {
			let headers = { Authorization: `bearer ${getToken()}` }
			let sessionList = await apiClient.get<ApiRoutes, AxiosResponse<SessionAPII[]>>(ApiRoutes.CHAT_SESSIONS, { headers });
			return sessionList
		} catch (error) {
			throw error;
		}
	}

	useEffect(() => {
		(async () => {
			if (hasFetched.current) return;
			hasFetched.current = true;
			try {
				console.log("use effect")
				let sessionList: AxiosResponse<SessionAPII[]> = await getSessions();
				if (!isSelected && (sessionList.data && sessionList.data.length)) {
					setTitles(sessionList.data);
					setSessionIdVar(sessionList.data[0].id)
					await getChatHistory(sessionList.data[0].id)
					setIsSelected(true)
				} else if (Array.isArray(sessionList.data) && (!sessionList.data.length)) {
					await createNewConnection()
					setIsSelected(true);
				}
			} catch (error) {
				console.error('Error : ', error);
			}
		})();
	}, [])

	const [isLargeScreen, setIsLargeScreen] = useState(window.matchMedia("(min-width: 768px)").matches);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(min-width: 768px)");
		const handleMediaChange = (e: any) => setIsLargeScreen(e.matches);

		mediaQuery.addEventListener('change', handleMediaChange);

		return () => mediaQuery.removeEventListener('change', handleMediaChange);
	}, []);

	const toggleNavbar = () => {
		setIsCollapsed(!isCollapsed);
	};

	const getChatHistory = async (sessionId: number) => {
		try {
			let headers = { Authorization: `bearer ${getToken()}` }
			if (sessionId) {
				let chatHistory: AxiosResponse<ChatHistoryAPII> = await apiClient.get<ApiRoutes, AxiosResponse<ChatHistoryAPII>>(`${ApiRoutes.CHAT_HISTORY}?sessionId=${sessionId}`, { headers });
				setChatHistory(chatHistory.data.history);
			}
		} catch (error) {
			console.error('Error : ', error);
		}
	}


	const handleItemSelected = async (sessionId: number) => {
		try {
			setIsCollapsed((pre) => !pre)
			if (sessionId === sessionIdVar) {
				return;
			}
			setSessionIdVar(sessionId)
			await getChatHistory(sessionId)
		} catch (error) {
			console.error('Error : ', error);
		}
	}

	const createNewConnection = async () => {
		try {
			let body = {
				"title": "New Session",
				"history": []
			}
			let headers = { Authorization: `bearer ${getToken()}` };
			await apiClient.post(ApiRoutes.SAVE_CHAT, body, { headers: headers })
				.then(async (data: AxiosResponse<SessionAPII>) => {
					setSessionIdVar(data.data.id);
					setChatHistory([])
					let sessionList = await getSessions();
					setTitles(sessionList.data);
					console.log("Created successfully");
				})
				.catch((error) => {
					console.log(error);
				});
		} catch (error) {
			console.error('Error : ', error);
		}
	}

	if (isLargeScreen) {
		return (
			<>
				<div style={{ display: 'flex', justifyContent: "space-between" }}>
					<NavBar sessionList={titles} isCollapsed={isCollapsed} toggleNavbar={toggleNavbar} onItemSelected={handleItemSelected} createNewConnection={createNewConnection} />
					<Chat chatHistory={chatHistory} sessionId={sessionIdVar} />
					<Header />
				</div>

			</>
		)
	} else {
		return (
			<>
				<div style={{ display: 'flex', justifyContent: "space-between", }}>
					<NavBar sessionList={titles} isCollapsed={isCollapsed} toggleNavbar={toggleNavbar} onItemSelected={handleItemSelected} createNewConnection={createNewConnection} />
					<Header />
				</div>
				{isCollapsed &&
					<div >
						<Chat chatHistory={chatHistory} sessionId={sessionIdVar} />
					</div>

				}
			</>
		)
	}
}

export default DashBoard;