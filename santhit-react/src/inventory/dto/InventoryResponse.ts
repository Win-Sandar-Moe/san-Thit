export interface InventoryResponse {
    id:string;
    productId:string;
    productName:string;
    productImage:string;
    quantity:number;
    status:"IN_STOCK" | "OUT_OF_STOCK",
    updatedAt:string;
}
export interface InventoryCreateRequest {
    productId: string;
    quantity: number;
}

export interface InventoryUpdateRequest {
    quantity: number;
}