import {useState} from "react";
import ConfirmModal from "../../messageBox/Message";
import {
    useAdminPaymentSummary,
    useAllPayments,
    useConfirmPayment,
    useRejectPayment,
} from "../hook/useCreatePayment.tsx";

export function AdminPaymentPage() {
    const {
        data: payments,
        isLoading,
        isError,
        refetch,
    } = useAllPayments();

    const {
        data: summary,
        isLoading: summaryLoading,
    } = useAdminPaymentSummary();

    const confirmMutation = useConfirmPayment();
    const rejectMutation = useRejectPayment();

    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedPaymentId, setSelectedPaymentId] =
        useState<string | null>(null);
    const [modalAction, setModalAction] =
        useState<"confirm" | "reject">("confirm");

    function handleConfirm(paymentId: string) {
        setSelectedPaymentId(paymentId);
        setModalAction("confirm");
        setShowConfirm(true);
    }

    function handleReject(paymentId: string) {
        setSelectedPaymentId(paymentId);
        setModalAction("reject");
        setShowConfirm(true);
    }

    function handleModalCancel() {
        setShowConfirm(false);
        setSelectedPaymentId(null);
    }

    function handleModalConfirm() {
        if (!selectedPaymentId) return;

        const paymentId = selectedPaymentId;

        setShowConfirm(false);
        setSelectedPaymentId(null);

        if (modalAction === "confirm") {
            confirmMutation.mutate(paymentId);
        } else {
            rejectMutation.mutate(paymentId);
        }
    }

    const isProcessing =
        confirmMutation.isPending || rejectMutation.isPending;

    if (isLoading) {
        return (
            <div className="container-fluid py-5">
                <div className="text-center">
                    <div
                        className="spinner-border text-primary"
                        role="status"
                    />
                    <p className="mt-3 text-secondary">
                        Loading payments...
                    </p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="container-fluid p-3">
                <div className="alert alert-danger d-flex justify-content-between align-items-center">
                    <span>Failed to load payments.</span>
                    <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => refetch()}
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid px-2 px-md-3 py-3">
            {/* Page Header */}
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                <div>
                    <h3 className="fw-bold mb-1">
                        Payment Management
                    </h3>
                    <p className="text-secondary mb-0">
                        Manage and review customer payments.
                    </p>
                </div>

                <span className="badge bg-primary fs-6 px-3 py-2">
                    Total: {payments?.length ?? 0}
                </span>
            </div>

            {/* Mutation Messages */}
            {confirmMutation.isSuccess && (
                <div className="alert alert-success alert-dismissible">
                    Payment confirmed successfully. The customer can
                    now pay the remaining balance if this was a deposit.
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => confirmMutation.reset()}
                        aria-label="Close"
                    />
                </div>
            )}

            {rejectMutation.isSuccess && (
                <div className="alert alert-warning alert-dismissible">
                    Payment rejected successfully.
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => rejectMutation.reset()}
                        aria-label="Close"
                    />
                </div>
            )}
            {confirmMutation.isError && (
                <div className="alert alert-danger">
                    {confirmMutation.error.message}
                </div>
            )}
            {rejectMutation.isError && (
                <div className="alert alert-danger alert-dismissible">
                    Failed to reject payment. Please try again.
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => rejectMutation.reset()}
                        aria-label="Close"
                    />
                </div>
            )}

            {/* Summary Cards */}
            <div className="row g-3 mb-4">
                <div className="col-12 col-md-6">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body p-4">
                            <p className="text fw-semibold mb-2">
                                Total Payments
                            </p>
                            <h4 className="fw-bold mb-0">
                                {summaryLoading
                                    ? "..."
                                    : (
                                        summary?.totalPayments ?? 0
                                    ).toLocaleString()
                                }
                            </h4>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body p-4">
                            <p className="text fw-semibold mb-2">
                                Total Received
                            </p>
                            <h4 className="fw-bold text-success mb-0">
                                {summaryLoading
                                    ? "..."
                                    : (
                                        summary?.totalReceived ?? 0
                                    ).toLocaleString()
                                }{" "}
                                MMK
                            </h4>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Records */}
            <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-bottom py-3">
                    <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                        <h5 className="fw-bold mb-0">
                            Payment Records
                        </h5>
                        <small className="text-secondary">
                            {payments?.length ?? 0} records
                        </small>
                    </div>
                </div>

                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover align-middle mb-0">
                            <thead className="table-light">
                            <tr>
                                <th className="px-3 py-3">No</th>
                                <th className="py-3">Order ID</th>
                                <th className="py-3 text-end">Amount</th>
                                <th className="py-3">Type</th>
                                <th className="py-3">Method</th>
                                <th className="py-3">Date</th>
                                <th className="py-3 text-center">Status</th>
                                <th className="py-3 text-center">Action</th>
                            </tr>
                            </thead>

                            <tbody>
                            {(payments ?? []).length === 0 && (
                                <tr>
                                    <td
                                        colSpan={8}
                                        className="text-center text-secondary py-5"
                                    >
                                        <div className="fs-2 mb-2">
                                            📭
                                        </div>
                                        No payments found.
                                    </td>
                                </tr>
                            )}

                            {(payments ?? []).map((payment, index) => (
                                <tr key={payment.id}>
                                    <td className="px-3">
                                        {index + 1}
                                    </td>

                                    <td className="text-primary fw-semibold text-nowrap">
                                        {payment.orderId?.slice(0, 6) ?? "-"}
                                    </td>

                                    <td className="text-end fw-semibold text-nowrap">
                                        {payment.amount.toLocaleString()} MMK
                                    </td>

                                    <td>
                                            <span
                                                className={`badge ${
                                                    payment.paymentType === "DEPOSIT"
                                                        ? "bg-info text-dark"
                                                        : "bg-primary"
                                                }`}
                                            >
                                                {payment.paymentType}
                                            </span>
                                    </td>

                                    <td className="text-nowrap">
                                        {payment.paymentMethod}
                                    </td>

                                    <td className="text-nowrap">
                                        {payment.paymentDate || "-"}
                                    </td>

                                    <td className="text-center">
                                            <span
                                                className={`badge ${
                                                    payment.status === "PAID"
                                                        ? "bg-success"
                                                        : payment.status === "REJECTED"
                                                            ? "bg-danger"
                                                            : "bg-warning text-dark"
                                                }`}
                                            >
                                                {payment.status}
                                            </span>
                                    </td>

                                    <td className="text-center text-nowrap">
                                        {payment.status === "PENDING" ? (
                                            <div className="d-flex justify-content-center gap-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-success btn-sm"
                                                    disabled={isProcessing}
                                                    onClick={() =>
                                                        handleConfirm(payment.id)
                                                    }
                                                >
                                                    {confirmMutation.isPending
                                                        ? "Processing..."
                                                        : "✓ Confirm"
                                                    }
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger btn-sm"
                                                    disabled={isProcessing}
                                                    onClick={() =>
                                                        handleReject(payment.id)
                                                    }
                                                >
                                                    {rejectMutation.isPending
                                                        ? "Processing..."
                                                        : "✕ Reject"
                                                    }
                                                </button>
                                            </div>
                                        ) : payment.status === "PAID" ? (
                                            <span className="text-success fw-semibold">
                                                    ✓ Confirmed
                                                </span>
                                        ) : (
                                            <span className="text-danger fw-semibold">
                                                    ✕ Rejected
                                                </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card-footer bg-white text-secondary small py-3">
                    Scroll horizontally to view all columns on smaller screens.
                </div>
            </div>

            {/* Confirmation Modal */}
            <ConfirmModal
                show={showConfirm}
                title={
                    modalAction === "confirm"
                        ? "Confirm Payment"
                        : "Reject Payment"
                }
                message={
                    modalAction === "confirm"
                        ? "Are you sure you want to confirm this payment?"
                        : "Are you sure you want to reject this payment?"
                }
                confirmText={
                    modalAction === "confirm" ? "Confirm" : "Reject"
                }
                cancelText="Cancel"
                confirmColor={
                    modalAction === "confirm"
                        ? "btn-success"
                        : "btn-danger"
                }
                onConfirm={handleModalConfirm}
                onCancel={handleModalCancel}
            />
        </div>
    );
}

export default AdminPaymentPage;
