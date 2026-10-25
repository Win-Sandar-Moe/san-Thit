import useCustomerOrder from "../store/useCustomerOrder.ts";
import { Link } from "react-router-dom";

export default function OrderView() {
    const { orders } = useCustomerOrder();
    return (
        <div className="container py-4">
            {/* Page Title */}
            <div className="border-start border-3 border-primary ps-3 mb-4">
                <h3 className="fw-bold mb-0">My Orders</h3>
            </div>
            {/* No Orders */}
            {orders.length === 0 ? (
                <div className="card border-0 shadow-sm">
                    <div className="card-body text-center py-5">
                        <h5 className="fw-semibold">No orders found</h5>
                        <p className="text-secondary mb-0">
                            You have not placed any orders yet.
                        </p>
                    </div>
                </div>
            ) : (
                orders.map((order) => (
                    <div
                        className="card mb-4 border-0 shadow-sm"
                        key={order.orderId}
                    >
                        <div className="card-body p-4">
                            {/* ================= ORDER HEADER ================= */}
                            <div className="d-flex justify-content-between align-items-start">
                                <Link
                                    to={`/customer/dashboard/payment/${order.orderId}`}
                                    className="badge bg-white border border-primary text-primary px-3 py-2" style={{fontSize:"16px"}}
                                >
                                    Payment
                                </Link>
                                <div>
                                    <h5 className="fw-bold mb-1">
                                        Order #{order.orderId.slice(0,6)}
                                    </h5>
                                    <h6 className="text-muted">
                                        {order.createdAt}
                                    </h6>

                                </div>
                                <span
                                    className={
                                        order.status === "CONFIRMED"
                                            ? "badge bg-success px-3 py-2"
                                            : "badge bg-warning text-dark px-3 py-2"

                                    } style={{fontSize:"16px"}}
                                >
                                    {order.status}
                                </span>
                            </div>
                            <hr />

                            {/* ================= PRODUCTS ================= */}
                            <div className="row g-3">
                                {order.products.map((product) => (
                                    <div
                                        className="col-12 col-md-6"
                                        key={product.productId}
                                    >
                                        <div className="card h-100 border shadow-sm">
                                            <div className="row g-0 h-100">
                                                {/* Product Image */}
                                                <div
                                                    className="col-4 d-flex align-items-center justify-content-center"
                                                    style={{ minHeight: "150px" }}
                                                >
                                                    <img
                                                        src={`/images/Product/${product.name}.png`}
                                                        alt={product.name}
                                                        className="img-fluid rounded-start"
                                                        style={{
                                                            width: "100%",
                                                            height: "140px",
                                                            objectFit: "contain",
                                                            padding: "8px",
                                                        }}
                                                    />
                                                </div>
                                                {/* Product Information */}
                                                <div className="col-8">
                                                    <div className="card-body py-3">
                                                        <h6 className="fw-bold mb-2 text-capitalize">
                                                            {product.name}
                                                        </h6>

                                                        <div className="small text-secondary mb-1">
                                                            Size:{" "}
                                                            <strong className="text-dark">
                                                                {product.size}
                                                            </strong>
                                                        </div>

                                                        <div className="small text-secondary mb-1">
                                                            Quantity:{" "}
                                                            <strong className="text-dark">
                                                                {product.quantity}
                                                            </strong>
                                                        </div>

                                                        <div className="text-primary fw-bold mt-2">
                                                            {product.price.toLocaleString()} MMK
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <hr />

                            {/* ================= PAYMENT SUMMARY ================= */}
                            <div className="mt-4">
                                <div className="d-flex justify-content-end mb-2">
                                    <span className="text-secondary me-3">
                                        Total Amount:
                                    </span>
                                    <span className="fw-bold">
                                        {order.totalAmount.toLocaleString()} MMK
                                    </span>
                                </div>
                                <div className="d-flex justify-content-end mb-2">
                                    <span className="text-secondary me-3">
                                        Deposit:
                                    </span>
                                    <span className="fw-bold text-success">
                                        - {order.deposit.toLocaleString()} MMK
                                    </span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-end align-items-center">
                                    <span className="fw-bold me-3">
                                        Balance:
                                    </span>
                                    <span className="fw-bold fs-5 text-primary">
                                        {order.balance.toLocaleString()} MMK
                                    </span>
                                </div>
                            </div>

                            {/* ================= STATUS MESSAGE ================= */}
                            <div className="d-flex align-items-center justify-content-between mt-3">
                                {/* ဘယ်ဘက်ခြမ်း - Order Status Alert */}
                                <div>
                                    {order.status === "CONFIRMED" && (
                                        <div className="alert alert-success mb-0 py-2">
                                            <strong>✓ Confirmed</strong>
                                            <br />
                                            Your order has been confirmed by admin.
                                        </div>
                                    )}

                                    {order.status === "PENDING" && (
                                        <div className="alert alert-warning mb-0 py-2">
                                            <strong>⏳ Pending</strong>
                                            <br />
                                            Your order is waiting for confirmation.
                                        </div>
                                    )}
                                </div>


                                {/* ညာဘက်ခြမ်း - Voucher Button */}
                                <Link
                                    to={`/customer/dashboard/voucher/${order.orderId}`}
                                    className="badge bg-white border border-primary text-primary px-3 py-2 " style={{fontSize:"16px"}}
                                >
                                    View Voucher
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}