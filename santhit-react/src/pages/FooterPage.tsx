import {
    BsClockFill,
    BsEnvelope,
    BsFacebook,
    BsGeoAltFill,
    BsInstagram,
    BsTelephoneFill,
    BsTwitter,
    BsYoutube
} from "react-icons/bs";
const BLUE="#3d8dde";
export default function FooterPage() {
    return (
        <footer className="bg-dark text-light mt-5">
            {/* Main Footer */}
            <div className="container py-5">
                <div className="row g-4">
                    {/* Brand */}
                    <div className="col-lg-4 col-md-6">
                        <h4 className="fw-bold text-primary mb-3">
                            <img src="/images/logo.png" width="80px" height="40px" alt="logo" />
                        </h4>
                        <p className="text-secondary">
                            Your trusted online shopping destination.
                            Discover quality products at great prices.
                        </p>
                        {/* Social Icons */}
                        <div className="d-flex gap-3 mt-4">
                            <a
                                href="#"
                                className="text-light fs-5"
                                aria-label="Facebook"
                            >
                              <BsFacebook size={25} />
                            </a>

                            <a
                                href="#"
                                className="text-light fs-5"
                                aria-label="Instagram"
                            >
                               <BsInstagram size={25}/>
                            </a>
                            <a
                                href="#"
                                className="text-light fs-5"
                                aria-label="Twitter"
                            >
                             <BsTwitter size ={25} />
                            </a>
                            <a
                                href="#"
                                className="text-light fs-5"
                                aria-label="YouTube"
                            >
                               <BsYoutube size={25}/>
                            </a>
                        </div>
                    </div>
                    {/* Quick Links */}
                    <div className="col-lg-2 col-md-6">
                        <h5 className="fw-bold mb-3">
                            Quick Links
                        </h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <a
                                    href="/"
                                    className="text-secondary text-decoration-none"
                                >
                                    Home
                                </a>
                            </li>
                            <li className="mb-2">
                                <a
                                    href="/products"
                                    className="text-secondary text-decoration-none"
                                >
                                    Products
                                </a>
                            </li>
                            <li className="mb-2">
                                <a
                                    href="/about"
                                    className="text-secondary text-decoration-none"
                                >
                                    About Us
                                </a>
                            </li>
                            <li className="mb-2">
                                <a
                                    href="/contact"
                                    className="text-secondary text-decoration-none"
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* Customer Service */}
                    <div className="col-lg-2 col-md-6">
                        <h5 className="fw-bold mb-3">
                            Customer Service
                        </h5>
                        <ul className="list-unstyled">

                            <li className="mb-2">
                                <a
                                    href="/faq"
                                    className="text-secondary text-decoration-none"
                                >
                                    FAQ
                                </a>
                            </li>
                            <li className="mb-2">
                                <a
                                    href="/shipping"
                                    className="text-secondary text-decoration-none"
                                >
                                    Shipping
                                </a>
                            </li>
                            <li className="mb-2">
                                <a
                                    href="/returns"
                                    className="text-secondary text-decoration-none"
                                >
                                    Returns
                                </a>
                            </li>
                            <li className="mb-2">
                                <a
                                    href="/privacy"
                                    className="text-secondary text-decoration-none"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* Contact */}
                    <div className="col-lg-4 col-md-6">
                        <h5 className="fw-bold mb-3">
                            Contact Us
                        </h5>

                        <div className="text-secondary">
                            <p className="mb-3">
                                <a
                                    href="#"
                                    className="text-light fs-5"
                                >
                                    <BsGeoAltFill size={25} style={{paddingRight:7}} />
                                </a>
                                WETLET / SinKyut(North)
                            </p>

                            <p className="mb-3">
                                <a
                                    href="#"
                                    className="text-light fs-5"
                                >
                                    <BsTelephoneFill size={25} style={{paddingRight:7}}/></a>
                                +95 9 783 968 227
                            </p>
                            <p className="mb-3">
                                <a
                                    href="#"
                                    className="text-light fs-5"
                                >
                            <BsEnvelope size={25} style={{paddingRight:7}}/></a>
                                support@myshop.com
                            </p>
                            <p className="mb-0">
                                <a
                                    href="#"
                                    className="text-light fs-5"
                                >
                               <BsClockFill   size={25} style={{paddingRight:7}} /></a>
                                 Mon - Sat: 9:00 AM - 6:00 PM
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Newsletter */}
            <div style={{backgroundColor:BLUE}}>
                <div className="container py-4">
                    <div className="row align-items-center g-3">
                        <div className="col-lg-6">
                            <h5 className="fw-bold mb-1">
                                Subscribe to our newsletter
                            </h5>
                            <p className="mb-0">
                                Get the latest products and special offers.
                            </p>
                        </div>
                        <div className="col-lg-6">
                            <div className="input-group">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                />

                                <button className="btn btn-dark px-4">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-top border-secondary">
                <div className="container py-3">
                    <div className="row align-items-center">
                        <div className="col-md-6 text-center text-md-start">
                            <small className="text-secondary">
                                © {new Date().getFullYear()} MyShop.
                                All rights reserved.
                            </small>
                        </div>
                        <div className="col-md-6 text-center text-md-end mt-2 mt-md-0">
                            <span className="text-secondary me-3">
                                Secure Payments
                            </span>
                            <i className="bi bi-credit-card-2-front fs-5 me-2"></i>
                            <i className="bi bi-paypal fs-5 me-2"></i>
                            <i className="bi bi-wallet2 fs-5"></i>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
