import type {InventoryCreateRequest, InventoryResponse, InventoryUpdateRequest} from "../dto/InventoryResponse.ts";
import axiosClient from "../../auth/api/axiosClient.ts";

export const getAllInventory =
    async (): Promise<InventoryResponse[]> => {
        const response =
            await axiosClient.get<InventoryResponse[]>(
                "/api/inventory/all"
            );
        console.log("INVENTORY API RESPONSE =", response.data);
        return response.data;
    };
// CREATE
export const createInventory =
    async (
        data: InventoryCreateRequest
    ): Promise<InventoryResponse> => {
        const response =
            await axiosClient.post<InventoryResponse>(
                "/api/inventory",
                data
            );
        return response.data;
    };
export const updateInventory =
    async (
        productId: string,
        data: InventoryUpdateRequest
    ): Promise<InventoryResponse> => {

        const response =
            await axiosClient.patch<InventoryResponse>(
                `/api/inventory/${productId}`,
                data
            );
        return response.data;
    };
// ADD STOCK
export const addStock =
    async (
        productId: string,
        quantity: number
    ): Promise<InventoryResponse> => {
        const response =
            await axiosClient.patch<InventoryResponse>(
                `/api/inventory/${productId}/addStock`,
                null,
                {
                    params: {
                        quantity
                    }
                }
            );
        return response.data;
    };
// DELETE
export const deleteInventory =
    async (
        productId: string
    ): Promise<void> => {
        await axiosClient.delete(
            `/api/inventory/${productId}`
        );
    };