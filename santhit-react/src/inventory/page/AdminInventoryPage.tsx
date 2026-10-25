
import { useState } from "react";
import useInventory from "../hook/useInventory.ts";
import ConfirmModal from "../../messageBox/Message";

export default function AdminInventoryPage() {
    const {
        inventories,
        loading,
        error,
        updateInventory,
        addStock,
        deleteInventory,
    } = useInventory();

    const [selectedProductId, setSelectedProductId] =
        useState<string | null>(null);

    const [quantity, setQuantity] = useState<number>(0);
    const [addQuantity, setAddQuantity] = useState<number>(0);

    const [stockAction, setStockAction] =
        useState<"update" | "add" | null>(null);

    // Custom delete confirmation
    const [showDeleteConfirm, setShowDeleteConfirm] =
        useState(false);

    const [deleteProductId, setDeleteProductId] =
        useState<string | null>(null);

    // UPDATE STOCK
    const handleUpdate = async () => {
        if (!selectedProductId) return;

        if (quantity < 0 || !Number.isInteger(quantity)) {
            alert("Please enter a valid non-negative whole number");
            return;
        }

        try {
            await updateInventory(selectedProductId, { quantity });

            setSelectedProductId(null);
            setQuantity(0);
            setAddQuantity(0);
            setStockAction(null);
        } catch (err) {
            console.error(err);
        }
    };

    // ADD STOCK
    const handleAddStock = async () => {
        if (!selectedProductId) return;

        if (addQuantity <= 0 || !Number.isInteger(addQuantity)) {
            alert("Add quantity must be a positive whole number");
            return;
        }
        try {
            await addStock(selectedProductId, addQuantity);
            setSelectedProductId(null);
            setQuantity(0);
            setAddQuantity(0);
            setStockAction(null);
        } catch (err) {
            console.error(err);
        }
    };
    // OPEN DELETE MODAL
    const handleDelete = (productId: string) => {
        setDeleteProductId(productId);
        setShowDeleteConfirm(true);
    };
    // CANCEL DELETE
    const handleCancelDelete = () => {
        setShowDeleteConfirm(false);
        setDeleteProductId(null);
    };
    // CONFIRM DELETE
    const handleConfirmDelete = async () => {
        if (!deleteProductId) return;
        const productId = deleteProductId;
        try {
            await deleteInventory(productId);
            setShowDeleteConfirm(false);
            setDeleteProductId(null);
            if (selectedProductId === productId) {
                setSelectedProductId(null);
                setQuantity(0);
                setAddQuantity(0);
                setStockAction(null);
            }
        } catch (err) {
            console.error(err);
        }
    };

    // CANCEL STOCK FORM
    const handleCancelStock = () => {
        setStockAction(null);
        setSelectedProductId(null);
        setQuantity(0);
        setAddQuantity(0);
    };

    // LOADING
    if (loading) {
        return (
            <div className="container-fluid px-3 py-4">
                <div className="text-center py-5">
                    <div
                        className="spinner-border text-primary"
                        role="status"
                    />
                    <p className="mt-2">Loading inventory...</p>
                </div>
            </div>
        );
    }
    return (
        <div className="container-fluid px-3 py-4">
            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
                <div>
                    <h3 className="fw-bold mb-1">Inventory</h3>
                    <p className="text-muted mb-0">
                        Manage product stock
                    </p>
                </div>
                <span className="badge bg-primary fs-6">
                    {inventories.length} Products
                </span>
            </div>
            {/* ERROR */}
            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}
            {/* INVENTORY TABLE */}
            <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table
                            className="table table-hover align-middle mb-0"
                            style={{
                                width: "100%",
                                tableLayout: "fixed",
                                fontSize: "18px",
                            }}
                        >
                            <colgroup>
                                <col style={{ width: "27%" }} />
                                <col style={{ width: "10%" }} />
                                <col style={{ width: "15%" }} />
                                <col style={{ width: "20%" }} />
                                <col style={{ width: "28%" }} />
                            </colgroup>

                            <thead className="table-light">
                                <tr>
                                    <th className="px-3">Product</th>
                                    <th>Stock</th>
                                    <th>Status</th>
                                    <th>Updated</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {inventories.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="text-center py-5 text-muted"
                                        >
                                            No inventory found
                                        </td>
                                    </tr>
                                ) : (
                                    inventories.map((item) => (
                                        <tr key={item.id}>
                                            {/* PRODUCT */}
                                            <td className="px-3">
                                                <div className="d-flex align-items-center gap-2">
                                                    <img
                                                        src={`/images/Product/${item.productImage}`}
                                                        alt="Product"
                                                        width="40"
                                                        height="40"
                                                        className="rounded flex-shrink-0"
                                                        style={{
                                                            objectFit: "cover",
                                                        }}
                                                        onError={(e) => {
                                                            e.currentTarget.style.display =
                                                                "none";
                                                        }}
                                                    />

                                                    <small
                                                        className="text text-capitalize"
                                                        style={{
                                                            overflowWrap:
                                                                "anywhere",


                                                        }}
                                                    >
                                                        {item.productName}
                                                    </small>
                                                </div>
                                            </td>

                                            {/* STOCK */}
                                            <td>
                                                <strong>
                                                    {item.quantity}
                                                </strong>
                                            </td>

                                            {/* STATUS */}
                                            <td>
                                                {item.status === "IN_STOCK" ? (
                                                    <span className="badge bg-success text-wrap">
                                                        In Stock
                                                    </span>
                                                ) : (
                                                    <span className="badge bg-danger text-wrap">
                                                        Out of Stock
                                                    </span>
                                                )}
                                            </td>

                                            {/* UPDATED */}
                                            <td>
                                                <small className="text">
                                                    {item.updatedAt
                                                        ? new Date(
                                                              item.updatedAt
                                                          ).toLocaleString()
                                                        : "-"}
                                                </small>
                                            </td>

                                            {/* ACTION */}
                                            <td>
                                                <div className="d-flex flex-wrap gap-1">
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-primary"
                                                        onClick={() => {
                                                            setSelectedProductId(
                                                                item.productId
                                                            );
                                                            setQuantity(
                                                                item.quantity
                                                            );
                                                            setAddQuantity(0);
                                                            setStockAction(
                                                                "update"
                                                            );
                                                        }}
                                                    >
                                                        Update
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-success"
                                                        onClick={() => {
                                                            setSelectedProductId(
                                                                item.productId
                                                            );
                                                            setQuantity(
                                                                item.quantity
                                                            );
                                                            setAddQuantity(0);
                                                            setStockAction(
                                                                "add"
                                                            );
                                                        }}
                                                    >
                                                        Add Stock
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() =>
                                                            handleDelete(
                                                                item.productId
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* UPDATE / ADD STOCK FORM */}
            {selectedProductId && stockAction && (
                <div className="card shadow-sm mt-4 border-0">
                    <div className="card-body">
                        {stockAction === "update" ? (
                            <>
                                <h5 className="fw-bold mb-3">
                                    Update Stock Quantity
                                </h5>

                                <div className="input-group">
                                    <input
                                        type="number"
                                        min="0"
                                        step="1"
                                        className="form-control"
                                        value={quantity}
                                        onChange={(e) =>
                                            setQuantity(
                                                Number(e.target.value)
                                            )
                                        }
                                    />

                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={handleUpdate}
                                    >
                                        Update
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h5 className="fw-bold mb-3">
                                    Add Stock Quantity
                                </h5>

                                <div className="input-group">
                                    <input
                                        type="number"
                                        min="1"
                                        step="1"
                                        className="form-control"
                                        value={addQuantity}
                                        onChange={(e) =>
                                            setAddQuantity(
                                                Number(e.target.value)
                                            )
                                        }
                                    />

                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={handleAddStock}
                                    >
                                        Add Stock
                                    </button>
                                </div>
                            </>
                        )}

                        <button
                            type="button"
                            className="btn btn-light border mt-3"
                            onClick={handleCancelStock}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* CUSTOM DELETE CONFIRM MODAL */}
            <ConfirmModal
                show={showDeleteConfirm}
                title="Delete Inventory"
                message="Are you sure you want to delete this inventory? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                confirmColor="btn-danger"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </div>
    );
}