import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Project from './Project.tsx'
import Navbar from './components/Navbar.tsx'

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

function App() {
    return (
        <>
            <Navbar />
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<Login />}
                    />
                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />
                    <Route
                        path="/project/:id"
                        element={<Project />}
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;