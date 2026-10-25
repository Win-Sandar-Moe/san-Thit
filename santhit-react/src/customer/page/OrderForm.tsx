import {useState} from "react";
import {type SubmitHandler, useForm} from "react-hook-form";
import type {OrderFormDto} from "../dto/OrderFormDto.ts";
import {createOrderApiCall, createOrderForm,} from "../api/orderFormApi.ts";
import {useCartStore} from "../../cart/store/useCartStore.tsx";
import ConfirmModal from "../../messageBox/Message.tsx";

export default function OrderForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitting},
    } = useForm<OrderFormDto>({
        defaultValues: {
            phoneNumber: "",
            deposit: 0,
            description: "",
        },
    });

    const [showSubmit, setShowSubmit] = useState(false);
    const {cartItems} = useCartStore();

    const onSubmitHandler: SubmitHandler<OrderFormDto> = async (data) => {
        try {
            if (!cartItems || cartItems.length === 0) {
                alert("Your cart is empty.");
                return;
            }
            const deposit = Number(data.deposit);
            if (!Number.isFinite(deposit) || deposit < 0) {
                alert("Please enter a valid deposit amount.");
                return;
            }
            const orderFormData: OrderFormDto = {
                phoneNumber: data.phoneNumber,
                deposit,
                description: data.description,
            };
            // Create Order Form
            await createOrderForm(orderFormData);
            // Create Product Order
            await createOrderApiCall(cartItems, deposit);
            // alert("Order submitted successfully!");
            reset();
            setShowSubmit(false);
        } catch (error) {
            console.error("Order Form Error:", error);
            alert(
                "Order submission failed. Please check your deposit and try again."
            );
        }
    };
    return (
        <div className="container-fluid">
            {/* Page Header */}
            <div className="mb-4">
                <h3 className="fw-bold mb-1">Order Form</h3>
                <p className="text-secondary mb-0">
                    Please provide your order information
                </p>
            </div>
            {/* Form Card */}
            <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4 p-md-5">
                    <form onSubmit={handleSubmit(() => setShowSubmit(true))}>
                        {/* Order Information */}
                        <div className="mb-4">
                            <h5 className="fw-bold mb-1">
                                Order Information
                            </h5>
                            <p className="text-secondary small mb-0">
                                Enter your contact and order details.
                            </p>
                        </div>

                        <div className="row g-4">
                            {/* Phone Number */}
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    className={`form-control form-control-lg ${
                                        errors.phoneNumber ? "is-invalid" : ""
                                    }`}
                                    placeholder="09xxxxxxxxx"
                                    {...register("phoneNumber", {
                                        required: "Phone number is required",
                                        minLength: {
                                            value: 7,
                                            message:
                                                "Phone number must be at least 7 digits",
                                        },
                                    })}
                                />
                                {errors.phoneNumber && (
                                    <div className="invalid-feedback">
                                        {errors.phoneNumber.message}
                                    </div>
                                )}
                            </div>
                            {/* Deposit */}
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">
                                    Deposit
                                </label>

                                <div className="input-group input-group-lg">
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        className={`form-control ${
                                            errors.deposit ? "is-invalid" : ""
                                        }`}
                                        placeholder="Enter deposit amount"
                                        {...register("deposit", {
                                            required: "Deposit is required",
                                            valueAsNumber: true,
                                            min: {
                                                value: 0,
                                                message:
                                                    "Deposit cannot be negative",
                                            },
                                        })}
                                    />

                                    <span className="input-group-text">
                                        MMK
                                    </span>
                                </div>
                                {errors.deposit && (
                                    <div className="text-danger small mt-1">
                                        {errors.deposit.message}
                                    </div>
                                )}
                            </div>
                            {/* Description */}
                            <div className="col-12">
                                <label className="form-label fw-semibold">
                                    Order Description
                                </label>
                                <textarea
                                    rows={6}
                                    className={`form-control ${
                                        errors.description ? "is-invalid" : ""
                                    }`}
                                    placeholder="Describe your order..."
                                    {...register("description", {
                                        required:
                                            "Description is required",
                                    })}
                                />
                                {errors.description && (
                                    <div className="invalid-feedback">
                                        {errors.description.message}
                                    </div>
                                )}
                            </div>
                        </div>
                        <hr className="my-4"/>
                        {/* Buttons */}
                        <div className="d-flex justify-content-end gap-2">
                            <button
                                type="button"
                                className="btn btn-light px-4"
                                onClick={() => reset()}
                                disabled={isSubmitting}
                            >
                                Clear
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary px-4"
                                disabled={isSubmitting}
                            >
                                Submit Order
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {/* Confirm Modal */}
            <ConfirmModal
                show={showSubmit}
                title="Confirm Order"
                message="Are you sure you want to submit this order?"
                onConfirm={() => {
                    if (!isSubmitting) {
                        void handleSubmit(onSubmitHandler)();
                    }
                }}
                onCancel={() => setShowSubmit(false)}
            />
        </div>
    );
}
