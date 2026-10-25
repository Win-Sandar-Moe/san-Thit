export interface InventoryResponse {
    id:string;
    productId:string;
    image:string;
    quantity:number;
    status:"IN_STOCK" | "OUT_OF_STOCK",
    updatedAt:string;

}
