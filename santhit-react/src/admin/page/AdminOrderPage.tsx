
import useAdminOrder from "../hook/useAdminOrder.ts";
import type { ProductOrderStatus } from "../dto/ProductOrderStatus.ts";
import { patchAdminOrder } from "../api/adminOrder.ts";

export function AdminOrderPage() {

    const { orders, setOrders } = useAdminOrder();
    const handleStatusChange = async (
        orderId: string,
        status: ProductOrderStatus
    ) => {
        try {
            console.log("Updating order:", orderId);
            console.log("New status:", status);
            await patchAdminOrder(orderId, status);
            setOrders(prev =>
                prev.map(order =>
                    order.orderId === orderId
                        ? {
                            ...order,
                            status
                        }
                        : order
                )
            );

        } catch (error) {
            console.error("Failed to update order:", error);
        }
    };

    const getStatusClass = (status: string) => {
        switch (status) {
            case "PENDING":
                return "bg-warning text-dark";

            case "CONFIRMED":
                return "bg-primary";

            default:
                return "bg-secondary";
        }
    };
    return (
        <div className="container-fluid ">
            <div className="mb-4">
                <h3 className="fw-bold mb-1">
                    Order Management
                </h3>
                <p className="text-muted mb-0">
                    Review and confirm customer orders
                </p>
            </div>

            {/* Order Count */}
            <div className="row g-3 mb-4">
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h6 className="text">
                                Total Orders
                            </h6>
                            <h4 className="fw-bold mb-0 mt-1">
                                {orders.length}
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h6 className="text">
                                Pending Orders
                            </h6>
                            <h4 className="fw-bold mb-0 mt-1 text-warning">
                                {
                                    orders.filter(
                                        order => order.status === "PENDING"
                                    ).length
                                }
                            </h4>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h6 className="text">
                                Confirmed Orders
                            </h6>
                            <h4 className="fw-bold mb-0 mt-1 text-primary">
                                {
                                    orders.filter(
                                        order => order.status === "CONFIRMED"
                                    ).length
                                }
                            </h4>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-4">
                {orders.map(order => (
                    <div
                        className="col-12"
                        key={order.orderId}
                    >
                        <div className="card border-0 shadow-sm">
                            {/* Header */}
                            <div className="card-header bg-white border-0 py-3">
                                <div className="row align-items-center g-3">
                                    <div className="col-md-3">
                                        <h6 className="text d-block">
                                            Order ID
                                        </h6>

                                        <span className="fw-bold">
                                            #{order.orderId.slice(0,6)}
                                        </span>

                                    </div>

                                    <div className="col-md-3">

                                        <h6 className="text d-block">
                                            Customer
                                        </h6>

                                        <span className="fw-semibold">
                                            {order.customer}
                                        </span>

                                    </div>

                                    <div className="col-md-3">

                                        <h6 className="text d-block">
                                            Created Date
                                        </h6>

                                        <span>
                                            {new Date(
                                                order.createdAt
                                            ).toLocaleDateString()}
                                        </span>

                                    </div>

                                    <div className="col-md-3 text-md-end">

                                        <h6
                                            className={`badge  badge bg-primary fs-6  ${getStatusClass(
                                                order.status
                                            )} px-3 py-2`}
                                        >
                                            {order.status}
                                        </h6>
                                    </div>
                                </div>
                            </div>

                            {/* Products */}
                            <div className="card-body pt-0">
                                <h5 className="fw-bold mb-3">
                                    Order Products
                                </h5>

                                <div className="table-responsive">
                                    <table className="table table-hover align-middle">
                                        <thead className="table-light">
                                        <tr>
                                            <th>Product</th>
                                            <th>Category</th>
                                            <th>Template</th>
                                            <th>Size</th>
                                            <th className="text-center">
                                                Quantity
                                            </th>
                                            <th className="text-end">
                                                Price
                                            </th>
                                            <th className="text-end">
                                                Subtotal
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        {order.products.map(product => (
                                            <tr key={product.id}>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <img
                                                            src={`/images/Product/${product.image}`}
                                                            alt={product.name}
                                                            className="rounded border me-3"
                                                            style={{
                                                                width: "55px",
                                                                height: "55px",
                                                                objectFit: "cover"
                                                            }}
                                                        />
                                                        <div>
                                                            <div className="fw-semibold text-capitalize" style={{fontSize:"14px"}}>
                                                                {product.name}
                                                            </div>

                                                            <small className="text-muted">
                                                                {product.id}
                                                            </small>
                                                        </div>
                                                    </div>
                                                </td>

                                                    <td style={{fontSize:"14px"}}>
                                                        {product.category}
                                                    </td>

                                                <td style={{fontSize:"14px"}}>
                                                    {product.invitationTemplate}
                                                </td>

                                                <td>
                                                    <span className="badge bg-light text-dark border">
                                                        {product.size}
                                                    </span>
                                                </td>

                                                <td className="text-center fw-semibold" style={{fontSize:"14px"}}>
                                                    {product.quantity}
                                                </td>

                                                <td className="text-end" style={{fontSize:"14px"}}>
                                                    {product.price.toLocaleString()} MMK
                                                </td>

                                                <td className="text-end fw-bold" style={{fontSize:"14px"}}>
                                                    {(
                                                        product.price *
                                                        product.quantity
                                                    ).toLocaleString()} MMK
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* Footer */}
                            <div className="card-footer bg-white border-top py-3">
                                <div className="row align-items-center g-3">
                                    <div className="col-md-6">
                                        <h6 className="text d-block">
                                            Total Amount
                                        </h6>

                                        <span className="fw-bold" style={{ fontSize:"16px"}}>
                                            {order.totalAmount.toLocaleString()} MMK
                                        </span>

                                    </div>
                                    <div className="col-md-6 text-md-end">
                                        {order.status === "PENDING" && (
                                            <button
                                                type="button"
                                                className="btn btn-primary px-4"
                                                onClick={() =>
                                                    handleStatusChange(
                                                        order.orderId,
                                                        "CONFIRMED"
                                                    )
                                                }
                                            >
                                                Confirm Order
                                            </button>
                                        )}
                                        {order.status === "CONFIRMED" && (
                                            <span className="badge bg-primary fs-6 px-3 py-2">
                                                ✓ Order Confirmed
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

