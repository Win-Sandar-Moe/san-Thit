import {Link, Outlet, useLocation} from "react-router-dom";

const BLUE = "#0d6efd";

export function CustomerLayout() {

    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;
    const menuClass = (path: string) =>
        `d-flex align-items-center gap-2 text-decoration-none rounded-3 px-3 py-3 mb-2 ${
            isActive(path)
                ? "text-white shadow-sm"
                : "text-dark"
        }`;
    const menuStyle = (path: string) => ({
        backgroundColor: isActive(path)
            ? BLUE
            : "transparent",
    });
    return (
        <div className="d-flex min-vh-100 bg-white">
            <aside
                className="d-flex flex-column border-end bg-white"
                style={{
                    width: "224px",
                    minWidth: "224px",
                }}
            >
                <div
                    style={{
                        height: "4px",
                        backgroundColor: "#3d8dde",
                    }}
                />
                <div className="p-3 flex-grow-1">
                    <h5 className="text-uppercase fw-bold text-secondary px-2">
                        MANAGEMENT
                    </h5>
                    <Link
                        to="/customer/dashboard/orderForm"
                        className={menuClass("/customer/dashboard/orderForm")}
                        style={menuStyle("/customer/dashboard/orderForm")}
                    >
                        <span>📋</span>
                        <span>Order Form</span>
                    </Link>

                    <Link
                        to="/customer/dashboard/orderView"
                        className={menuClass("/customer/dashboard/orderView")}
                        style={menuStyle("/customer/dashboard/orderView")}
                    >
                        <span>📦</span>
                        <span>Orders</span>
                    </Link>
                </div>

                <div className="p-3 mt-auto">
                    <div className="bg-light rounded-3 p-3">
                        <div className="fw-semibold text-dark">
                            👤 Customer Panel
                        </div>
                        <small className="text-secondary">
                            Manage your orders
                        </small>
                    </div>
                </div>
            </aside>

            <main className="flex-grow-1 bg-light min-vh-100">
                <div className="container-fluid p-4">
                    <Outlet/>
                </div>
            </main>
        </div>
    );
}
