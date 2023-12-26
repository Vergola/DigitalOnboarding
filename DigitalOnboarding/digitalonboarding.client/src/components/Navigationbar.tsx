import Container from 'react-bootstrap/Container';
import Nav from "react-bootstrap/Nav";
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../services/AuthProvider.tsx';

const Navigationbar = () => {
    const { isAuthenticated, isAuthCheckComplete } = useAuth();
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">Digital Onboarding</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                {(isAuthenticated && isAuthCheckComplete) &&
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Dashboard</Nav.Link>
                        </Nav>
                        <Nav className="ms-auto">
                            <Nav.Link href="/logout">Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                }
            </Container>
        </Navbar>
    )
};

export default Navigationbar;