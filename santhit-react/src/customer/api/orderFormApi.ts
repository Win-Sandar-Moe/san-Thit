import type {OrderFormDto} from "../dto/OrderFormDto.ts";
import axiosClient from "../../auth/api/axiosClient.ts";
import type {CartItem} from "../../cart/dto/CartItem.ts";
import type {CustomerOrderRequest} from "../dto/CustomerOrderRequest.ts";
import type {CustomerOrderResponse} from "../dto/CustomerOrderResponse.ts";

export const createOrderForm = async (data: OrderFormDto) => {
    try {
        const response = await axiosClient.post("/api/orderForm", data);
        return response.data;
    } catch (error: any) { throw error; }
};

export const createOrderApiCall = async (items: CartItem[], deposit: number
) => {
    const response = await axiosClient.post("/api/orders", {
        items,deposit
    });
    if (response.status !== 200) {
        throw new Error("Failed to create order");
    }
    return response.data;
};

export const getOrderById = async (
    orderId: string
): Promise<CustomerOrderResponse> => {
    const response = await axiosClient.get<CustomerOrderResponse>(
        `/api/orders/${orderId}`
    );
    return response.data;
};

export const getOrderProductList=async():Promise<CustomerOrderRequest[]>=>{
    const response= await axiosClient.get("/api/orders");
    if(response.status !== 200){
        throw new Error(response.statusText);
    }
    return response.data;
}

export const getMyOrders = async (): Promise<CustomerOrderResponse[]> => {
    const response =
        await axiosClient.get<CustomerOrderResponse[]>(
            "/api/orders/my-orders"
        );
    return response.data;
};

