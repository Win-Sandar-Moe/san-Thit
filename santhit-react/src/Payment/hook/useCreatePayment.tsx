
import {
    useMutation,
    useQuery,
    useQueryClient
} from "@tanstack/react-query";

import axios from "axios";

import {
    createPayment,
    getMyPayments,
    getAllPayments,
    confirmPayment,
    rejectPayment,
    getAdminPaymentSummary
} from "../api/paymentApi.ts";

import type {
    PaymentResponse,
    PaymentRequest,
    AdminPaymentSummary
} from "../dto/paymentResponse.ts";



export function useCreatePayment() {

    const queryClient = useQueryClient();

    return useMutation<
        PaymentResponse,
        Error,
        PaymentRequest
    >({
        mutationFn: async (request: PaymentRequest) => {
            try {
                return await createPayment(request);
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    const status = error.response?.status;
                    const message = error.response?.data?.message;

                    if (status === 400) {
                        throw new Error(message ?? "Invalid payment request.");
                    }

                    if (status === 401) {
                        throw new Error(message ?? "Please login first.");
                    }

                    if (status === 403) {
                        throw new Error(message ?? "You are not allowed to make this payment.");
                    }

                    if (status === 404) {
                        throw new Error(message ?? "Order not found.");
                    }

                    if (status === 409) {
                        throw new Error(message ?? "Payment is already paid or pending.");
                    }

                    if (status !== undefined && status >= 500) {
                        throw new Error(message ?? "Server error. Please try again later.");
                    }

                    throw new Error(message ?? "Payment failed. Please try again.");
                }

                throw new Error(
                    error instanceof Error
                        ? error.message
                        : "Payment failed. Please try again."
                );
            }
        },
        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["my-payments"]
            });

            queryClient.invalidateQueries({
                queryKey: ["my-orders"]
            });
        }
    });
}

export function useMyPayments() {

    return useQuery<PaymentResponse[], Error>({
        queryKey: ["my-payments"],
        queryFn: getMyPayments
    });
}

export function useAllPayments() {

    return useQuery<PaymentResponse[], Error>({
        queryKey: ["admin-payments"],
        queryFn: getAllPayments
    });
}

export function useConfirmPayment() {

    const queryClient = useQueryClient();

    return useMutation<
        PaymentResponse,
        Error,
        string
    >({

        mutationFn: confirmPayment,

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["admin-payments"]
            });

            queryClient.invalidateQueries({
                queryKey: ["my-payments"]
            });

            queryClient.invalidateQueries({
                queryKey: ["admin-payment-summary"]
            });

            queryClient.invalidateQueries({
                queryKey: ["my-orders"]
            });
        }
    });
}

export function useRejectPayment() {

    const queryClient = useQueryClient();

    return useMutation<
        PaymentResponse,
        Error,
        string
    >({
        mutationFn: rejectPayment,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["admin-payments"]
            });

            queryClient.invalidateQueries({
                queryKey: ["my-payments"]
            });

            queryClient.invalidateQueries({
                queryKey: ["admin-payment-summary"]
            });
        }
    });
}
export function useAdminPaymentSummary() {

    return useQuery<AdminPaymentSummary, Error>({
        queryKey: ["admin-payment-summary"],
        queryFn: getAdminPaymentSummary
    });
}
