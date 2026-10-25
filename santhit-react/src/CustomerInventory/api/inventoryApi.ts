import axiosClient from "../../auth/api/axiosClient.ts";
import type { InventoryResponse } from "../dto/InventoryResponse.ts";

export const getInventoryByProductId = async (
    productId: string
): Promise<InventoryResponse> => {

    const response =
        await axiosClient.get<InventoryResponse>(
            `/api/inventory/${productId}`
        );
    return response.data;
};