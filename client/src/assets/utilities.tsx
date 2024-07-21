import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { localStorageVariables } from '../enums/commonVariables';

function getToken(): string {
    let token = "";
    if (window.localStorage) {
        token = window.localStorage.getItem(localStorageVariables.AUTHORIZATION) ?? "";
    }
    return token;
}

function getUserName(): string {
    let userName = "";
    if (window.localStorage) {
        userName = window.localStorage.getItem(localStorageVariables.USERNAME) ?? "";
    }
    return userName;
}

function clearLocalStorage() {
    if (window.localStorage) {
        window.localStorage.setItem(localStorageVariables.AUTHORIZATION, "");
        window.localStorage.setItem(localStorageVariables.USERNAME, "")
    }
}

function setLocalStorage(token: string, username: string){
    if (window.localStorage) {
        window.localStorage.setItem(localStorageVariables.AUTHORIZATION, token);
        window.localStorage.setItem(localStorageVariables.USERNAME, username);
    }
}

function isAuthenticated(): boolean {
    const token = getToken();
    return Boolean(token);
}

interface ProtectedProps {
    children: ReactNode;
}

const Protected: React.FC<ProtectedProps> = ({ children }) => {
    const token = getToken();
    return (
        <>
            {token && token.length ? children : <Navigate to="/" />}
        </>
    );
}

const IsUserLoggedIn: React.FC<ProtectedProps> = ({ children }) => {
    const token = getToken();
    return (
        <>
            {token && token.length && token != "undefined" ? <Navigate to="/chat" /> : children}
        </>
    );
}


interface MessagesI {
    time: string;
    user: string;
    message: string;
}

interface ChatProps {
    chatHistory: MessagesI[];
    sessionId: number
  }

export { isAuthenticated, getToken, Protected, IsUserLoggedIn, getUserName, clearLocalStorage, setLocalStorage };
export type { MessagesI , ChatProps};

