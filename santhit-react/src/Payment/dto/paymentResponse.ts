
export type PaymentStatus =
    | "PENDING"
    | "PAID"
    | "REJECTED";

export type PaymentType =
    | "DEPOSIT"
    | "BALANCE";

export interface PaymentResponse {
    id: string;
    orderId: string;
    amount: number;
    paymentMethod: string;
    paymentType: PaymentType;
    status: PaymentStatus;
    paymentDate: string;
}

export interface PaymentRequest {
    orderId: string;
    amount: number;
    paymentType: PaymentType;
    paymentMethod: string;
}

export interface AdminPaymentSummary {
    totalReceived: number;
    totalPayments: number;
}
