export interface AdminOrderResponse {
    orderId: string;
    createdAt: string;
    deposit:number;
    totalAmount: number;
    balance: number;
    status: string;
    customer: string;
    products: CustomerProductOrderCreate[];
}
export interface CustomerProductOrderCreate {
    id: string;
    category: string;
    image: string;
    invitationTemplate: string;
    name: string;
    price: number;
    quantity: number;
    size: string;
}