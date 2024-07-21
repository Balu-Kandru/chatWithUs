import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_SOCKET_BASE_URL ?? `ws://localhost:1337`;

export const socket = io(URL);