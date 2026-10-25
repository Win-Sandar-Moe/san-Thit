export interface VoucherItemResponse {
    no: number;
    productName: string;
    quantity: number;
    price: number;
    amount: number;
}

export interface VoucherResponse {
    voucherCode: string;
    orderId: string;
    username: string;
    createdAt: string;
    totalAmount: number;
    deposit: number;
    balance: number;
    items: VoucherItemResponse[];
}