import type {CartItem} from "../../cart/dto/CartItem.ts";

export interface OrderRequest {
    purchaseItems:CartItem[];
}