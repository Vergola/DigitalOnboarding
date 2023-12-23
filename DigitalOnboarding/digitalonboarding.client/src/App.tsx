import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './pages/Register.tsx';
import Login from './pages/Login.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Project from './Project.tsx';
import Navigationbar from './components/Navigationbar.tsx';
import ProtectedRoute from './util/ProtectedRoute.tsx';
import Logout from './pages/Logout.tsx';

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { AuthProvider } from './services/AuthProvider.tsx';

function App() {
    return (
        <>
            <BrowserRouter>
                <AuthProvider>
                    <Navigationbar />
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
                            path="/logout"
                            element={<Logout />}
                        />
                        <Route
                            path="/"
                            element={<ProtectedRoute />}>
                            <Route
                                path="/"
                                element={<Dashboard />}
                            />
                            <Route
                                path="/project/:id"
                                element={<Project />}
                                />
                        </Route>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </>
    );
}

export default App;