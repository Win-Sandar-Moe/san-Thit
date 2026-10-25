
import axiosClient from "../../auth/api/axiosClient.ts";
import type {AdminPaymentSummary, PaymentRequest, PaymentResponse} from "../dto/paymentResponse.ts";

export const createPayment = async (
    data: PaymentRequest
): Promise<PaymentResponse> => {
    const response =
        await axiosClient.post<PaymentResponse>(
            "/api/payments",
            data
        );
    return response.data;
};

// CUSTOMER MY PAYMENTS
export const getMyPayments = async (): Promise<PaymentResponse[]> => {
    const response =
        await axiosClient.get<PaymentResponse[]>(
            "/api/payments/my-payments"
        );
    return response.data;
};

// ADMIN GET ALL PAYMENTS
export const getAllPayments = async (): Promise<PaymentResponse[]> => {
    const response =
        await axiosClient.get<PaymentResponse[]>(
            "/api/payments/admin"
        );
    return response.data;
};

// ADMIN CONFIRM PAYMENT
export const confirmPayment = async (
    paymentId: string
): Promise<PaymentResponse> => {
    const response =
        await axiosClient.patch<PaymentResponse>(
            `/api/payments/admin/${paymentId}/confirm`
);
return response.data;
};

// ADMIN REJECT PAYMENT
export const rejectPayment = async (
    paymentId: string
): Promise<PaymentResponse> => {
    const response =
        await axiosClient.patch<PaymentResponse>(
            `/api/payments/admin/${paymentId}/reject`
        );
    return response.data;
};

// ADMIN PAYMENT SUMMARY
export const getAdminPaymentSummary =
    async (): Promise<AdminPaymentSummary> => {
        const response =
            await axiosClient.get<AdminPaymentSummary>(
                "/api/payments/admin/summary"
            );
        return response.data;
    };

