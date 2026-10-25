import {useEffect, useState} from "react";
import {getInventoryByProductId} from "../api/inventoryApi.ts";
import type {InventoryResponse} from "../dto/InventoryResponse.ts";

export default function useInventoryCustomer(
    productId?: string
) {
    const [inventory, setInventory] = useState<InventoryResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        if (!productId) return;
        const loadInventory = async () => {
            try {
                setLoading(true);
                setError(null);
                const data =
                    await getInventoryByProductId(productId);
                setInventory(data);
            } catch (error) {
                console.error(
                    "Load Product Inventory Error:",
                    error
                );
                setError("Failed to load stock");
            } finally {
                setLoading(false);
            }
        };
        loadInventory();
    }, [productId]);
    return {
        inventory,
        loading,
        error
    };
}