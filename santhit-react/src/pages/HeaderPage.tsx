
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../cart/store/useCartStore.tsx";
import { useAuthStore } from "../auth/store/useAuthStore.tsx";

const BLUE = "#3d8dde";

export default function HeaderPage() {
    const { cartItems } = useCartStore();
    const { user, isAuthenticated, clearAuth } = useAuthStore();
    const navigate = useNavigate();

    const [showUserMenu, setShowUserMenu] = useState(false);
    // ကိုယ့် Auth Store ထဲက role field နဲ့ ကိုက်ညီအောင် စစ်ပါ
    const isAdmin = user?.roles?.some(
        (role) => role === "ADMIN" || role === "ROLE_ADMIN"
    ) ?? false;
    const handleLogout = () => {
        setShowUserMenu(false);
        clearAuth();
        navigate("/login");
    };
    return (
        <header
            className="border-bottom shadow"
            style={{ backgroundColor: BLUE }}
        >
            <div className="container-fluid px-4 py-3">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                    {/* BRAND LOGO */}
                    <Link
                        to="/"
                        className="d-flex align-items-center text-decoration-none"
                    >
                        <img
                            src="/images/logo.png"
                            width="120"
                            height="60"
                            alt="SanThit Logo"
                            style={{ objectFit: "contain" }}
                        />
                    </Link>

                    {/* NAVBAR ACTIONS */}
                    <div className="d-flex align-items-center justify-content-end flex-wrap gap-2">
                        {/* CART */}
                        <Link
                            to="/cart"
                            className="btn btn-outline-light text-dark position-relative"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                fill="currentColor"
                                className="bi bi-cart3 align-middle me-1"
                                viewBox="0 0 16 16"
                            >
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                            </svg>
                            Cart
                            {cartItems.length > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>

                        {/* AUTHENTICATED USER */}
                        {isAuthenticated ? (
                            <>
                                {/* USER DROPDOWN */}
                                <div className="dropdown position-relative">
                                    <button
                                        type="button"
                                        className="btn btn-outline-light text-dark fw-semibold"
                                        onClick={() =>
                                            setShowUserMenu((prev) => !prev)
                                        }
                                    >
                                        Hi, {user?.username ?? "User"}{" "}
                                        <span className="ms-1">
                                            {showUserMenu ? "▲" : "▼"}
                                        </span>
                                    </button>
                                    {showUserMenu && (
                                        <div
                                            className="dropdown-menu show position-absolute end-0 mt-2 shadow border-0"
                                            style={{
                                                minWidth: "200px",
                                                zIndex: 1050,
                                            }}
                                        >
                                            {/* CUSTOMER ORDER */}
                                            <Link
                                                to="/customer/dashboard/orderView"
                                                className="dropdown-item py-2"
                                                onClick={() =>
                                                    setShowUserMenu(false)
                                                }
                                            >
                                                My Orders
                                            </Link>

                                            {/* ADMIN DASHBOARD */}
                                            {isAdmin && (
                                                <Link
                                                    to="/admin/dashboard/order"
                                                    className="dropdown-item py-2"
                                                    onClick={() =>
                                                        setShowUserMenu(false)
                                                    }
                                                >
                                                    Admin Dashboard
                                                </Link>
                                            )}
                                            <div className="dropdown-divider" />
                                            <button
                                                type="button"
                                                className="dropdown-item py-2 text-danger"
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="btn btn-light fw-semibold"
                            >
                                Login
                            </Link>
                        )}

                        {/* REGISTER: only when logged out */}
                        {!isAuthenticated && (
                            <Link
                                to="/register"
                                className="btn btn-outline-light text-dark"
                            >
                                Register
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
