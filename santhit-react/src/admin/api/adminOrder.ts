import type { AdminOrderResponse,  } from "../dto/AdminOrderResponse.ts";
import axiosClient from "../../auth/api/axiosClient.ts";
import type {ProductOrderStatus} from "../dto/ProductOrderStatus.ts";

export const getAdminOrders = async (): Promise<AdminOrderResponse[]> => {
    const response = await axiosClient.get<AdminOrderResponse[]>(
        "/api/admin/orders"
    );
    if (response.status !== 200) {
        throw new Error(response.statusText);
    }
    return response.data;
};
export const patchAdminOrder =
    async (orderId: string, status: ProductOrderStatus): Promise<AdminOrderResponse> => {
    const response = await axiosClient.patch<AdminOrderResponse>(
        `/api/admin/orders/${orderId}/status`,
        {
            status: status
        }
    );
    return response.data;
};
