import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login.tsx'
import Home from './Home.tsx'
import Project from './Project.tsx'

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<Login />}
                    />
                    <Route
                        path="/home"
                        element={<Home />}
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