import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './pages/Register.tsx'
import Login from './pages/Login.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Project from './Project.tsx'
import Navigationbar from './components/Navigationbar.tsx'

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

function App() {
    return (
        <>
            <Navigationbar />
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/register"
                        element={<Register />}
                    />
                    <Route
                        path="/login"
                        element={<Login />}
                    />
                    <Route
                        path="/"
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