import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {AuthProvider} from "react-oidc-context";
import userManager from "@/libs/userManager.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider userManager={userManager}>
            <App/>
        </AuthProvider>
    </React.StrictMode>,
)
