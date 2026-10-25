
import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import axiosClient from "../../auth/api/axiosClient";
import type {
    PaymentRequest,
    PaymentResponse,
    PaymentType,
} from "../dto/paymentResponse";
import {useCreatePayment, useMyPayments} from "../hook/useCreatePayment.tsx";
import {BiArrowFromLeft} from "react-icons/bi";

interface Order {
    orderId: string;
    totalAmount: number;
    deposit: number;
    balance: number;
}

interface ApiError {
    response?: {
        data?: {
            message?: string;
        };
    };
}

const formatMoney = (amount: number) =>
    new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);

const formatDate = (date: string) => {
    if (!date) return "—";

    const parsed = new Date(date);

    return Number.isNaN(parsed.getTime())
        ? date
        : parsed.toLocaleDateString();
};

export default function PaymentPage() {
    const { orderId } = useParams<{ orderId: string }>();

    const [order, setOrder] = useState<Order | null>(null);
    const [orderLoading, setOrderLoading] = useState(true);
    const [orderError, setOrderError] = useState("");
    const [paymentType, setPaymentType] =
        useState<PaymentType>("DEPOSIT");
    const [paymentMethod, setPaymentMethod] =
        useState("KBZ_PAY");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] =
        useState<"success" | "danger">("success");

    const {
        data: allPayments = [],
        isLoading: paymentsLoading,
        isError: paymentsError,
        error: paymentsQueryError,
        refetch: refetchPayments,
    } = useMyPayments();

    const createPayment = useCreatePayment();

    const payments = useMemo(
        () => allPayments.filter(
            payment => payment.orderId === orderId
        ),
        [allPayments, orderId]
    );

// API error message စစ်ရန်
    useEffect(() => {
        if (paymentsQueryError) {
            console.error(
                "Payment API Error:",
                axios.isAxiosError(paymentsQueryError)
                    ? paymentsQueryError.response?.data
                    : paymentsQueryError
            );
        }
    }, [paymentsQueryError]);

    console.log("All payments:", allPayments);
    console.log("Payments for this order:", payments);
    console.log("Current orderId:", orderId);

    useEffect(() => {
        if (!orderId) {
            setOrderError("Order ID not found.");
            setOrderLoading(false);
            return;
        }

        let active = true;

        const loadOrder = async () => {
            setOrderLoading(true);
            setOrderError("");

            try {
                const response = await axiosClient.get<Order>(
                    `/api/orders/${orderId}`
                );

                if (active) {
                    setOrder(response.data);
                }
            } catch (error) {
                if (!active) return;

                const apiError = error as ApiError;

                setOrderError(
                    apiError.response?.data?.message ??
                    "Unable to load order information."
                );
            } finally {
                if (active) setOrderLoading(false);
            }
        };

        void loadOrder();

        return () => {
            active = false;
        };
    }, [orderId]);

    const paid = (type: PaymentType) =>
        payments.some(
            (payment) =>
                payment.paymentType === type &&
                payment.status === "PAID"
        );

    const pending = (type: PaymentType) =>
        payments.some(
            (payment) =>
                payment.paymentType === type &&
                payment.status === "PENDING"
        );

    const rejected = (type: PaymentType) =>
        payments.some(
            (payment) =>
                payment.paymentType === type &&
                payment.status === "REJECTED"
        );

    const requiredAmount =
        paymentType === "DEPOSIT"
            ? order?.deposit ?? 0
            : order?.balance ?? 0;

    const alreadyPaid = paid(paymentType);
    const isPending = pending(paymentType);
    const depositPaid = paid("DEPOSIT");
    console.log("All payments:", allPayments);
    console.log("Payments for this order:", payments);
    console.log("Current orderId:", orderId);
    console.log("Deposit paid:", depositPaid);


    const statusFor = (type: PaymentType) => {
        if (paid(type)) return "PAID";
        if (pending(type)) return "PENDING";
        if (rejected(type)) return "REJECTED";
        return "UNPAID";
    };

    const statusClass = (status: string) => {
        switch (status) {
            case "PAID":
                return "bg-success-subtle text-success";
            case "PENDING":
                return "bg-warning-subtle text-dark";
            case "REJECTED":
                return "bg-danger-subtle text-danger";
            default:
                return "bg-secondary-subtle text-secondary";
        }
    };

    const handlePayment = async () => {
        setMessage("");

        if (!orderId || !order) {
            setMessageType("danger");
            setMessage("Order information not found.");
            return;
        }

        if (alreadyPaid) {
            setMessageType("danger");
            setMessage("This payment has already been paid.");
            return;
        }

        if (isPending) {
            setMessageType("danger");
            setMessage(
                "This payment is waiting for admin confirmation."
            );
            return;
        }

        if (paymentType === "BALANCE" && !depositPaid) {
            setMessageType("danger");
            setMessage("Please complete your deposit first.");
            return;
        }

        if (requiredAmount <= 0) {
            setMessageType("danger");
            setMessage("There is no outstanding amount to pay.");
            return;
        }

        const request: PaymentRequest = {
            orderId,
            amount: requiredAmount,
            paymentType,
            paymentMethod,
        };

        try {
            await createPayment.mutateAsync(request);

            setMessageType("success");
            setMessage(
                "Payment submitted successfully. Waiting for admin confirmation."
            );

            await refetchPayments();
        } catch (error) {
            setMessageType("danger");
            setMessage(
                error instanceof Error
                    ? error.message
                    : "Payment failed. Please try again."
            );
        }
    };

    if (orderLoading || paymentsLoading) {
        return (
            <div className="container py-5">
                <div className="d-flex justify-content-center align-items-center gap-3">
                    <div
                        className="spinner-border text-primary"
                        role="status"
                    />
                    <span className="text-secondary">
                        Loading payment information...
                    </span>
                </div>
            </div>
        );
    }console.log({
        orderId,
        orderLoading,
        paymentsLoading,
        paymentsError,
        paymentType,
        requiredAmount,
        alreadyPaid,
        isPending,
        depositPaid,
        isPendingMutation: createPayment.isPending,
    });

    if (!order) {
        return (
            <div className="container py-4">
                <div className="alert alert-danger">
                    {orderError || "Order not found."}
                </div>
                <Link
                    to="/customer/dashboard/orderView"
                    className="btn btn-outline-secondary"
                >
                    Back to Orders
                </Link>
            </div>
        );
    }
    return (
        <div className="container py-4 py-lg-5">
            {/* Page heading */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                <div>

                    <h3 className="fw-bold mb-1">Order Payment</h3>
                    <p className="text-secondary mb-0">
                        Manage your deposit and outstanding balance.
                    </p>
                </div>

                <Link
                    to="/customer/dashboard/orderView"

                >
                   <BiArrowFromLeft size={25} />
                    Back to Orders
                </Link>
            </div>

            {/* Alerts */}
            {message && (
                <div
                    className={`alert alert-${messageType} alert-dismissible fade show`}
                    role="alert"
                >
                    <strong>
                        {messageType === "success"
                            ? "Success: "
                            : "Notice: "}
                    </strong>
                    {message}
                    <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={() => setMessage("")}
                    />
                </div>
            )}

            {paymentsError && (
                <div className="alert alert-warning">
                    Payment history could not be loaded. Refresh and
                    try again before submitting a payment.
                </div>
            )}

            {/* Order summary */}
            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                    <div className="row g-3 align-items-center">
                        <div className="col-12 col-md-7">
                            <div className="text small mb-2">
                                ORDER REFERENCE
                            </div>
                            <div className="fw-semibold text-break">
                                {order.orderId.slice (0,6)}
                            </div>
                        </div>

                        <div className="col-12 col-md-5 text-md-end">
                            <div className="text small mb-2">
                                TOTAL ORDER AMOUNT
                            </div>
                            <h4 className="fw-bold mb-0">
                                {formatMoney(order.totalAmount)}
                            </h4>
                            <small className="text-secondary">
                                MMK
                            </small>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment breakdown */}
            <div className="row g-3 mb-4">
                <div className="col-12 col-md-4">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <span className="text">
                                    Total Amount
                                </span>

                            </div>
                            <h4 className="fw-bold mb-3">
                                {formatMoney(order.totalAmount)}
                            </h4>
                            <span className="badge bg-primary-subtle text-primary">
                                Order Total
                            </span>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-4">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <span className="text">
                                    Deposit
                                </span>
                                <i className="bi bi-wallet2 fs-4 text-primary" />
                            </div>
                            <h4 className="fw-bold mb-3 text-primary">
                                {formatMoney(order.deposit)}
                            </h4>
                            <span
                                className={`badge ${statusClass(statusFor("DEPOSIT"))}`}
                            >
                                {statusFor("DEPOSIT")}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-4">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <span className="text">
                                    Balance
                                </span>
                                <i className="bi bi-credit-card fs-4 text-danger" />
                            </div>
                            <h4 className="fw-bold mb-3 text-danger">
                                {formatMoney(order.balance)}
                            </h4>
                            <span
                                className={`badge ${statusClass(statusFor("BALANCE"))}`}
                            >
                                {statusFor("BALANCE")}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-4">
                {/* Payment form */}
                <div className="col-12 col-lg-5">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-header bg-white border-0 px-4 pt-4">
                            <h5 className="fw-bold mb-1">
                                <i className="bi bi-shield-check text-primary me-2" />
                                Make a Payment
                            </h5>
                            <p className="text-secondary small mb-0">
                                Select the payment type and method.
                            </p>
                        </div>

                        <div className="card-body p-4">
                            <div className="mb-4">
                                <label className="form-label fw-semibold">
                                    Payment Type
                                </label>

                                <div className="d-grid gap-2">
                                    <button
                                        type="button"
                                        className={`btn text-start p-3 ${
                                            paymentType === "DEPOSIT"
                                                ? "btn-primary"
                                                : "btn-outline-secondary"
                                        }`}
                                        onClick={() => {
                                            setPaymentType("DEPOSIT");
                                            setMessage("");
                                        }}
                                    >
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span>
                                                Deposit
                                            </span>
                                            <span className="fw-semibold">
                                                {formatMoney(order.deposit)}
                                            </span>
                                        </div>
                                    </button>

                                    <button
                                        type="button"
                                        className={`btn text-start p-3 ${
                                            paymentType === "BALANCE"
                                                ? "btn-primary"
                                                : "btn-outline-secondary"
                                        }`}
                                        disabled={!depositPaid}
                                        onClick={() => {
                                            setPaymentType("BALANCE");
                                            setMessage("");
                                        }}
                                    >
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span>
                                                Balance
                                            </span>
                                            <span className="fw-semibold">
                                                {formatMoney(order.balance)}
                                            </span>
                                        </div>
                                    </button>
                                </div>

                                {!depositPaid && (
                                    <div className="form-text">
                                        Balance payment becomes available
                                        after the deposit is confirmed.
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="paymentMethod"
                                    className="form-label fw-semibold"
                                >
                                    Payment Method
                                </label>

                                <select
                                    id="paymentMethod"
                                    className="form-select form-select-lg"
                                    value={paymentMethod}
                                    onChange={(event) =>
                                        setPaymentMethod(event.target.value)
                                    }
                                >
                                    <option value="KBZ_PAY">
                                        KBZ Pay
                                    </option>
                                    <option value="WAVE_PAY">
                                        Wave Pay
                                    </option>
                                    <option value="BANK_TRANSFER">
                                        Bank Transfer
                                    </option>
                                </select>
                            </div>

                            <div className="rounded-3 bg-light p-3 mb-4">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <span className="text-secondary">
                                        Payment Type
                                    </span>
                                    <span className="fw-semibold">
                                        {paymentType}
                                    </span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="text-secondary">
                                        Amount to Pay
                                    </span>
                                    <h4 className="fw-bold text-primary mb-0">
                                        {formatMoney(requiredAmount)}
                                    </h4>
                                </div>
                                <div className="text-end small text-secondary mt-1">
                                    MMK
                                </div>
                            </div>

                            {alreadyPaid && (
                                <div className="alert alert-success small">
                                    This payment has already been completed.
                                </div>
                            )}

                            {isPending && (
                                <div className="alert alert-warning small">
                                    Your payment is waiting for admin
                                    confirmation.
                                </div>
                            )}

                            {rejected(paymentType) && !isPending && !alreadyPaid && (
                                <div className="alert alert-danger small">
                                    Your previous payment was rejected.
                                    You may submit it again.
                                </div>
                            )}

                            <button
                                type="button"
                                className="btn btn-primary btn-lg w-100"
                                disabled={
                                    createPayment.isPending ||
                                    alreadyPaid ||
                                    isPending ||
                                    requiredAmount <= 0 ||
                                    (paymentType === "BALANCE" && !depositPaid)
                                }
                                onClick={handlePayment}
                            >
                                {createPayment.isPending ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" />
                                        Submitting...
                                    </>
                                ) : alreadyPaid ? (
                                    "Already Paid"
                                ) : isPending ? (
                                    "Awaiting Confirmation"
                                ) : (
                                    <>
                                        Submit Payment
                                    </>
                                )}
                            </button>

                            <p className="text-secondary small text-center mt-3 mb-0">
                                <i className="bi bi-info-circle me-1" />
                                Payment will remain pending until the
                                administrator confirms it.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Payment history */}
                <div className="col-12 col-lg-7">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-header bg-white border-0 p-4">
                            <div className="d-flex justify-content-between align-items-center gap-2">
                                <div>
                                    <h5 className="fw-bold mb-1">
                                        Payment History
                                    </h5>
                                    <p className="text-secondary small mb-0">
                                        Transactions for this order
                                    </p>
                                </div>

                                <span className="badge bg-primary-subtle text-primary rounded-pill">
                                    {payments.length} records
                                </span>
                            </div>
                        </div>

                        {payments.length === 0 ? (
                            <div className="text-center py-5 px-3">
                                <h6 className="fw-semibold mt-3">
                                    No Payments Yet
                                </h6>
                                <p className="text-secondary small mb-0">
                                    Your payment transactions will appear
                                    here.
                                </p>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="table-light">
                                    <tr>
                                        <th className="ps-4">Payment</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th className="pe-4">Date</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {payments.map(
                                        (payment: PaymentResponse) => (
                                            <tr key={payment.id}>
                                                <td className="ps-4">
                                                    <div className="fw-semibold">
                                                        {payment.paymentType}
                                                    </div>
                                                    <small className="text-secondary">
                                                        {payment.paymentMethod}
                                                    </small>
                                                </td>
                                                <td className="text-nowrap">
                                                    {formatMoney(
                                                        payment.amount
                                                    )}
                                                </td>
                                                <td>
                                                        <span
                                                            className={`badge ${statusClass(payment.status)}`}
                                                        >
                                                            {payment.status}
                                                        </span>
                                                </td>
                                                <td className="pe-4 text-nowrap small text-secondary">
                                                    {formatDate(
                                                        payment.paymentDate
                                                    )}
                                                </td>
                                            </tr>
                                        )
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        <div className="card-footer bg-white border-0 p-3">
                            <div className="d-flex align-items-center gap-2 text-secondary small">
                                Payment records are linked to this order.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
