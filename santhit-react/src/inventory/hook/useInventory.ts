import { useEffect, useState } from "react";

import type {
    InventoryCreateRequest,
    InventoryResponse,
    InventoryUpdateRequest
} from "../dto/InventoryResponse.ts";

import {
    getAllInventory,
    createInventory,
    updateInventory,
    addStock,
    deleteInventory
} from "../api/inventoryApi.ts";
export default function useInventory() {
    const [inventories, setInventories] = useState<InventoryResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // GET ALL
    const loadInventory = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getAllInventory();
            setInventories(data);
        } catch (error: any) {
            console.error(
                "Load Inventory Error:",
                error
            );
            setError(
                error.response?.data?.message ||
                "Failed to load inventory"
            );
        } finally {
            setLoading(false);
        }
    };
    // CREATE
    const handleCreateInventory = async (
        data: InventoryCreateRequest
    ) => {
        try {
            setError(null);
            const newInventory =
                await createInventory(data);
            setInventories(prev => [
                ...prev,
                newInventory
            ]);
            return newInventory;
        } catch (error: any) {
            console.error(
                "Create Inventory Error:",
                error
            );
            setError(
                error.response?.data?.message ||
                "Failed to create inventory"
            );
            throw error;
        }
    };
    // UPDATE
    const handleUpdateInventory = async (
        productId: string,
        data: InventoryUpdateRequest
    ) => {
        try {
            setError(null);
            const updatedInventory =
                await updateInventory(
                    productId,
                    data
                );

            setInventories(prev =>
                prev.map(inventory =>
                    inventory.productId === productId
                        ? updatedInventory
                        : inventory
                )
            );
            return updatedInventory;

        } catch (error: any) {
            console.error(
                "Update Inventory Error:",
                error
            );
            setError(
                error.response?.data?.message ||
                "Failed to update inventory"
            );
            throw error;
        }
    };
    const handleAddStock = async (
        productId: string,
        quantity: number
    ) => {
        try {
            setError(null);
            const updatedInventory =
                await addStock(
                    productId,
                    quantity
                );
            setInventories(prev =>
                prev.map(inventory =>
                    inventory.productId === productId
                        ? updatedInventory
                        : inventory
                )
            );
            return updatedInventory;
        } catch (error: any) {
            console.error(
                "Add Stock Error:",
                error
            );
            setError(
                error.response?.data?.message ||
                "Failed to add stock"
            );
            throw error;
        }
    };
    const handleDeleteInventory = async (
        productId: string
    ) => {
        try {
            setError(null);
            await deleteInventory(productId);
            setInventories(prev =>
                prev.filter(
                    inventory =>
                        inventory.productId !== productId
                )
            );

        } catch (error: any) {
            console.error(
                "Delete Inventory Error:",
                error
            );
            setError(
                error.response?.data?.message ||
                "Failed to delete inventory"
            );
            throw error;
        }
    };
    useEffect(() => {
        loadInventory();
    }, []);
    return {
        inventories,
        loading,
        error,
        loadInventory,
        createInventory: handleCreateInventory,
        updateInventory: handleUpdateInventory,
        addStock: handleAddStock,
        deleteInventory: handleDeleteInventory
    };
}