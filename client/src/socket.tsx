import { io } from 'socket.io-client';

const URL = 'ws://localhost:1337';

export const socket = io(URL);