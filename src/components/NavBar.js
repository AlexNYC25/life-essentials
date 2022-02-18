import { Navbar, NavDropdown, Nav} from "react-bootstrap"
import {Link} from "react-router-dom"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'


export default function NavBar(props) {

    return (
        <Navbar className="px-2 pt-3" expand="lg">
            <Navbar.Brand className="px-2" href="#home">Life Essentials</Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
                <Nav className="justify-content-center">
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                    <NavDropdown title="Categories" id="basic-nav-dropdown">
                        <Link to='/category/men%27s%20clothing' className="dropdown-item">
                            Men's Clothing
                        </Link>
                        <Link to="/category/women%27s%20clothing" className="dropdown-item">
                            Women's Clothing
                        </Link>
                        <Link to="/category/electronics" className="dropdown-item">
                            Electronics
                        </Link>
                        <Link to="/category/jewelery" className="dropdown-item">
                            Jewelry
                        </Link>
                    </NavDropdown>
                    <Link to="/" className="nav-link">
                        About Us
                    </Link>
                    <Link to="/" className="nav-link">
                        Contact Us
                    </Link>
                </Nav>

                <Nav className="justify-content-end">
                    <button type="button" className="btn position-relative" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                        <FontAwesomeIcon icon={faShoppingCart} />
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {props.itemCount()}
                        </span>
                    </button>
                    
                </Nav>
            </Navbar.Collapse>
            
        </Navbar>
    )
}