import { Row } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons'

export default function Footer() {

    return (
        <footer className="pt-5 bottom-0" >
            <Row>
                <div className="col-2">
                    <h5>Categories</h5>
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2">
                            <a href="/" className="nav-link p-0 text-muted">Electronics</a>
                        </li>
                        <li className="nav-item mb-2">
                            <a href="/" className="nav-link p-0 text-muted">Jewlery</a>
                        </li>
                        <li className="nav-item mb-2">
                            <a href="/" className="nav-link p-0 text-muted">Men's Clothing</a>
                        </li>
                        <li className="nav-item mb-2">
                            <a href="/" className="nav-link p-0 text-muted">Woman's Clothing</a>
                        </li>
                    </ul>
                </div>
                <div className="col-2">
                    <h5>Customer Service</h5>
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2">
                            <a href="/" className="nav-link p-0 text-muted">Order Status</a>
                        </li>
                        <li className="nav-item mb-2">
                            <a href="/" className="nav-link p-0 text-muted">Shipping</a>
                        </li>
                        <li className="nav-item mb-2">
                            <a href="/" className="nav-link p-0 text-muted">Return Policy</a>
                        </li>
                        <li className="nav-item mb-2">
                            <a href="/" className="nav-link p-0 text-muted">FAQ</a>
                        </li>
                        <li className="nav-item mb-2">
                            <a href="/" className="nav-link p-0 text-muted">Contact Us</a>
                        </li>
                    </ul>
                </div>
                <div className="col-2">
                    <h5>About Life Essenitals</h5>
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2">
                            <a href="/" className="nav-link p-0 text-muted">Humble Origins</a>
                        </li>
                        <li className="nav-item mb-2">
                            <a href="/" className="nav-link p-0 text-muted">Meteroric Rise</a>
                        </li>
                        <li className="nav-item mb-2">
                            <a href="/" className="nav-link p-0 text-muted">Partnerships with Designers</a>
                        </li>
                        <li className="nav-item mb-2">
                            <a href="/" className="nav-link p-0 text-muted">World Wide Expansion</a>
                        </li>
                        <li className="nav-item mb-2">
                            <a href="/" className="nav-link p-0 text-muted">Who We Are Know</a>
                        </li>
                    </ul>
                </div>
                <div className="col-4 offset-1">
                    <form>
                        <h5>Subscribe to our newsletter</h5>
                        <p>Find out when new products arrive and when sales start.</p>
                        <div className="d-flex w-100 gap-2">
                            <input id="newsletter1" type="text" class="form-control" placeholder="Email" />
                            <button className="btn btn-primary-outline">Subscribe</button>
                        </div>
                    </form>
                </div>
            </Row>

            <div className="d-flex px-1 justify-content-between border-top">
                <p>2021 Life Essentials, Inc. All Rights Reserved.</p>
                <ul className="list-unstyled d-flex">
                    <li className="ms-3">
                        <a className="link-dark" href="/">
                            <FontAwesomeIcon icon={faTwitter} size='2x'/>
                        </a>
                    </li>

                    <li className="ms-3">
                        <a className="link-dark" href="/">
                            <FontAwesomeIcon icon={faInstagram} size='2x'/>
                        </a>
                    </li>

                    <li className="ms-3">
                        <a className="link-dark" href="/">
                            <FontAwesomeIcon icon={faFacebook} size='2x'/>
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}