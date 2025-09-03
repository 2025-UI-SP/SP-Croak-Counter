
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const AppNavbar = () => (
	<Navbar bg="primary" variant="dark" expand="lg" fixed="top">
		<Container fluid>
			<Navbar.Brand as={Link} to="/">Croak Counter</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="me-auto">
					<Nav.Link as={Link} to="/">Home</Nav.Link>
					<Nav.Link as={Link} to="/help">Help</Nav.Link>
					<Nav.Link as={Link} to="/survey">Survey</Nav.Link>
				</Nav>

			</Navbar.Collapse>
		</Container>
	</Navbar>
);

export default AppNavbar;
