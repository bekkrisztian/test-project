import React from 'react';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import Chat from '../components/Chat/Chat';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from '../components/Router/ProtectedRoute';
import { socket, SocketContext } from '../components/Chat/hooks/socketService';

import './App.scss';

function App() {
    return (
        <SocketContext.Provider value={socket}>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="*" element={<h1>404 page not found</h1>} />
                    </Routes>
                </div>
            </Router>
        </SocketContext.Provider>
    );
}

export default App;
