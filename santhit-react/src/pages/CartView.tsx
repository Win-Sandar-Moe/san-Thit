import { Link } from "react-router-dom";
import { useCartStore } from "../cart/store/useCartStore.tsx";
import { useAuthStore } from "../auth/store/useAuthStore.tsx";

export function CartView() {
    const { isAuthenticated } = useAuthStore();
    const {
        cartItems,
        removeFromCart,
        clearCart,
        totalAmount,
    } = useCartStore();

    console.log(cartItems);
    // Backend BigDecimal value
    const total = Number(totalAmount());
    return (
        <div className="container py-5">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold mb-1">
                        Shopping Cart
                    </h2>
                    <p className="text-muted mb-0">
                        {cartItems.length} item
                        {cartItems.length !== 1 && "s"} in your cart
                    </p>
                </div>
                {cartItems.length > 0 && (
                    <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={clearCart}
                    >
                        Clear Cart
                    </button>
                )}
            </div>

            {/* Empty Cart */}
            {cartItems.length === 0 ? (
                <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-body text-center py-5">
                        <div className="fs-1 mb-3">
                            🛒
                        </div>
                        <h4 className="fw-bold">
                            Your cart is empty
                        </h4>
                        <p className="text-muted mb-4">
                            You haven't added any products yet.
                        </p>
                        <Link
                            to="/"
                            className="btn btn-primary px-4"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="row g-4">
                    {/* Cart Items */}
                    <div className="col-lg-8">
                        <div className="card border-0 shadow-sm rounded-4">
                            <div className="card-body p-0">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.productId}
                                        className="p-3 border-bottom"
                                    >
                                        <div className="row align-items-center g-3">
                                            {/* Image */}
                                            <div className="col-3 col-md-2">
                                                <img
                                                    src={`/images/Product/${item.image}`}
                                                    alt={item.name}
                                                    className="img-fluid rounded-3"
                                                    style={{
                                                        width: "90px",
                                                        height: "90px",
                                                        objectFit: "contain",
                                                    }}
                                                />
                                            </div>

                                            {/* Product Info */}
                                            <div className="col-9 col-md-4">
                                                <h6 className="fw-bold mb-1 text-capitalize">
                                                    {item.name}
                                                </h6>
                                                <small className="text-muted d-block">
                                                    Category: {item.category}
                                                </small>
                                                <small className="text-muted d-block">
                                                    Size: {item.size}
                                                </small>
                                                <small className="text-muted d-block">
                                                    Template: {item.invitationTemplate}
                                                </small>
                                            </div>

                                            {/* Price */}
                                            <div className="col-6 col-md-2">
                                                <h6 className="text-muted d-block">
                                                    Price
                                                </h6>
                                                <span className="fw-semibold">
                                                    {Number(item.price).toLocaleString()} MMK
                                                </span>
                                            </div>
                                            {/* Quantity */}
                                            <div className="col-6 col-md-2">
                                                <h6 className="text-muted d-block">
                                                    Quantity
                                                </h6>
                                                <span className="badge text-bg-light border px-3 py-2" style={{fontSize:"14px"}}>
                                                    {item.quantity}
                                                </span>
                                            </div>
                                            {/* Remove */}
                                            <div className="col-12 col-md-2 text-md-end">
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() =>
                                                        removeFromCart(item.productId)
                                                    }
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="col-lg-4">
                        <div
                            className="card border-0 shadow-sm rounded-4 sticky-lg-top"
                            style={{ top: "20px" }}
                        >
                            <div className="card-body p-4">
                                <h5 className="fw-bold mb-4">
                                    Order Summary
                                </h5>
                                {/* Items */}
                                <div className="d-flex justify-content-between mb-3">
                                    <span className="text-muted">
                                        Items
                                    </span>
                                    <span>
                                        {cartItems.length}
                                    </span>
                                </div>
                                {/* Subtotal */}
                                <div className="d-flex justify-content-between mb-3">
                                    <span className="text-muted">
                                        Subtotal
                                    </span>
                                    <span>
                                        {total.toLocaleString()} MMK
                                    </span>
                                </div>
                                <hr />
                                {/* Total */}
                                <div className="d-flex justify-content-between mb-4">
                                    <span className="fw-bold">
                                        Total
                                    </span>
                                    <span className="fw-bold text-primary fs-5">
                                        {total.toLocaleString()} MMK
                                    </span>
                                </div>
                                {/* Checkout */}
                                {isAuthenticated && (
                                    <Link
                                        to="/customer/dashboard/orderForm"
                                        className="btn btn-primary w-100 py-2 fw-semibold"
                                    >
                                        Proceed to Checkout
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}