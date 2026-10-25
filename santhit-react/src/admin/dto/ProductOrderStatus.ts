export interface OrderStatus {
    orderId: string;
    status: ProductOrderStatus;
}
export type ProductOrderStatus =
    | "PENDING"
    | "CONFIRMED"