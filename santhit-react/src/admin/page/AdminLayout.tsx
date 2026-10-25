import {NavLink, Outlet} from "react-router-dom";

export function AdminLayout() {

    const navClass = ({isActive}: { isActive: boolean }) =>
        `nav-link rounded-3 ${
            isActive
                ? "active"
                : "text-dark"
        }`;
    return (
        <div className="min-vh-100 bg-light">
            <div className="container-fluid">
                <div className="row">
                    {/* ================= SIDEBAR ================= */}
                    <aside className="col-md-3 col-lg-2 bg-white border-end min-vh-100 p-3">
                        {/* Management */}
                        <div className="mb-4">
                            <h6 className="text-uppercase fw-bold text-secondary px-2">
                                Management
                            </h6>
                            <div className="nav nav-pills flex-column gap-1">

                                {/* Orders */}
                                <NavLink
                                    to="/admin/dashboard/order"
                                    className={navClass}
                                >
                                    📦 Orders
                                </NavLink>
                                {/* Inventory */}
                                <NavLink
                                    to="/admin/dashboard/inventory"
                                    className={navClass}
                                >
                                    📋 Inventory
                                </NavLink>
                                {/* Customers */}
                                <NavLink
                                    to="/admin/dashboard/payment"
                                    className={navClass}
                                > 💳
                                    Payment
                                </NavLink>
                            </div>
                        </div>
                        {/* ================= SYSTEM ================= */}
                        <div>
                            <div className="text-uppercase text-secondary small fw-bold px-2 mb-2">
                                System
                            </div>
                            <div className="nav nav-pills flex-column gap-1">
                                {/* Settings */}
                                <NavLink
                                    to="/admin/settings"
                                    className={navClass}
                                >
                                    ⚙️ Settings
                                </NavLink>
                            </div>
                        </div>
                        {/* ================= SIDEBAR BOTTOM ================= */}
                        <div className="mt-5 p-3 bg-light rounded-3">
                            <div className="fw-semibold">
                                Admin Panel
                            </div>
                            <small className="text-secondary">
                                Manage your store orders and inventory.
                            </small>
                        </div>
                    </aside>
                    {/* ================= MAIN CONTENT ================= */}
                    <main className="col-md-9 col-lg-10 p-4 p-lg-5">
                        <Outlet/>
                    </main>
                </div>
            </div>
        </div>
    );
}

