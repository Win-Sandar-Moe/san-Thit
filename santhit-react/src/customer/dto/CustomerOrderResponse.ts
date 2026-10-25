import type {CustomerOrderRequest} from "./CustomerOrderRequest.ts";

export interface CustomerOrderResponse {
    orderId: string;
    createdAt: string;
    deposit: number;
    totalAmount: number;
    balance: number;
    status: "PENDING" | "CONFIRMED";
    products: CustomerOrderRequest[];
}
