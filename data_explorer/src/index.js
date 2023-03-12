import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter } from "react-router-dom"
import { AuthProvider } from './context/AuthProvider'
// import RouteComponent from './routes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <AuthProvider>
            <HashRouter>
                <App />
            </HashRouter>
        </AuthProvider>
    </>
);

