import socketio from "socket.io-client";
import React from "react";

export const socket = (socketio as any).connect("http://localhost:8080");
export const SocketContext = React.createContext(null);