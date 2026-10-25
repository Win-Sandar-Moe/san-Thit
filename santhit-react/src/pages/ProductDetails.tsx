import {useState} from "react";
import {useProductById} from "../product/hook/useApiQuery.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useCartStore} from "../cart/store/useCartStore.tsx";
import useInventoryCustomer from "../CustomerInventory/hook/useInventoryCustomer.ts";

export function ProductDetails() {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();

    const addToCart = useCartStore(
        (state) => state.addToCart
    );
    const {
        data: product,
        isLoading: isProductLoading,
        isError,
    } = useProductById(id!);

    const {
        inventory,
        loading: inventoryLoading,
        error: inventoryError,
    } = useInventoryCustomer(product?.id);

    const [quantity, setQuantity] = useState(1);
    const increaseQuantity = () => {
        if (!inventory) return;
        setQuantity((prev) =>
            Math.min(prev + 1, inventory.quantity)
        );
    };
    const decreaseQuantity = () => {
        setQuantity((prev) =>
            Math.max(1, prev - 1)
        );
    };
    const handleAddToCart = () => {
        if (!product) return;
        if (!inventory) {
            alert("Stock information is not available.");
            return;
        }
        if (inventory.quantity <= 0) {
            alert("Out of stock.");
            return;
        }
        if (quantity > inventory.quantity) {
            alert(
                `Only ${inventory.quantity} items are available.`
            );
            setQuantity(inventory.quantity);
            return;
        }
        addToCart(product, quantity);
        console.log("Added to cart:", {
            product,
            quantity,
        });
    };
    if (isProductLoading) {
        return (
            <div className="container py-4 text-center">
                <div
                    className="spinner-border text-primary"
                    role="status"
                >
                    <span className="visually-hidden">
                        Loading...
                    </span>
                </div>
                <p className="mt-2 text-muted">
                    Loading product...
                </p>
            </div>
        );
    }
    if (isError || !product) {
        return (
            <div className="container py-4">
                <div className="alert alert-danger text-center">
                    Product not found.
                </div>
            </div>
        );
    }
    return (
        <div className="container py-4">
            <div className="container py-4">
                {/* Back Link */}
                <div className="mb-3">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="btn btn-link text-decoration-none p-0" style={{fontSize:"16px"}}
                    >
                        ← Back to Products
                    </button>
                </div>
                <div className="row justify-content-center">
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-lg-9 col-xl-8">
                    <div
                        className="card border-0 shadow-sm rounded-4 overflow-hidden"
                    >
                        <div className="row g-0 align-items-stretch">
                            {/* ================= PRODUCT IMAGE ================= */}
                            <div
                                className="col-md-6 d-flex align-items-center justify-content-center"
                                style={{
                                    backgroundColor: "#f8f9fa",
                                    minHeight: "500px"
                                }}
                            >
                                <div
                                    className="d-flex align-items-center justify-content-center w-100 h-100"
                                    style={{
                                        padding: "10px"
                                    }}
                                >
                                    <img
                                        src={`/images/Product/${product.image}`}
                                        alt={product.name}
                                        className="img-fluid"
                                        style={{
                                            width: "100%",
                                            height: "450px",
                                            objectFit: "contain",
                                            objectPosition: "center",
                                            display: "block"
                                        }}
                                    />
                                </div>
                            </div>
                            {/* ================= PRODUCT INFORMATION ================= */}
                            <div className="col-md-6">
                                <div className="card-body p-4 p-lg-5">
                                    {/* Category */}
                                    <span className="badge bg-primary-subtle text-primary  mb-3 text-capitalize" style={{fontSize:"16px"}}>
                                        {product.category}
                                    </span>
                                    {/* Product Name */}
                                    <h3 className="fw-bold mb-2 text-capitalize">
                                        {product.name}
                                    </h3>
                                    {/* Price */}
                                    <h4 className="text-primary fw-bold mb-3">
                                        {product.price.toLocaleString()} MMK
                                    </h4>
                                    {/* Size */}
                                    <p className="mb-3">
                                        <strong>Size:</strong>{" "}
                                        {product.size}
                                    </p>
                                    {/* Inventory */}
                                    <div className="mb-3">
                                        {inventoryLoading && (
                                            <small className="text-muted">
                                                Checking stock...
                                            </small>
                                        )}
                                        {inventoryError && (
                                            <div className="text-danger small">
                                                {inventoryError}
                                            </div>
                                        )}
                                        {inventory && (
                                            inventory.quantity > 0 ? (
                                                <span className="text-success fw-semibold">
                                                    Available Stock:{" "}
                                                    {inventory.quantity}
                                                </span>
                                            ) : (
                                                <span className="text-danger fw-semibold">
                                                    Out of Stock
                                                </span>
                                            )
                                        )}
                                    </div>
                                    {/* Quantity */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            Quantity
                                        </label>
                                        <div
                                            className="input-group"
                                            style={{
                                                width: "140px"
                                            }}
                                        >
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={decreaseQuantity}
                                                disabled={quantity <= 1}
                                            > −
                                            </button>

                                            <input
                                                type="number"
                                                min={1}
                                                max={
                                                    inventory?.quantity || 1
                                                }
                                                value={quantity}
                                                onChange={(e) => {

                                                    const value =
                                                        Number(e.target.value);

                                                    const max =
                                                        inventory?.quantity || 1;

                                                    setQuantity(
                                                        Math.min(
                                                            Math.max(1, value),
                                                            max
                                                        )
                                                    );
                                                }}
                                                className="form-control text-center"
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={increaseQuantity}
                                                disabled={
                                                    !inventory ||
                                                    quantity >=
                                                    inventory.quantity
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    {/* Add To Cart */}
                                    <div className="d-flex gap-2 mt-4">
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary flex-fill"
                                            onClick={handleAddToCart}
                                            disabled={
                                                inventoryLoading ||
                                                !inventory ||
                                                inventory.quantity <= 0
                                            }
                                        >
                                            🛒 Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

