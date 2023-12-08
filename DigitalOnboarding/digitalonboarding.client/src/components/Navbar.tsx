import Nav from "react-bootstrap/Nav";

const Navbar = () => {
    return (
        <Nav>
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/">Login</Nav.Link>
        </Nav>
    )
};

export default Navbar;