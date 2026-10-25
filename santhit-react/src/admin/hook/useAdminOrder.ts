import {useEffect, useState} from "react";
import type {AdminOrderResponse} from "../dto/AdminOrderResponse";
import {getAdminOrders} from "../api/adminOrder.ts";

export default function useAdminOrder() {
    const [orders, setOrders] = useState<AdminOrderResponse[]>([]);
    // GET Orders
    useEffect(() => {
        const loadOrders = async () => {
            try {
                const data = await getAdminOrders();
                setOrders(data);
            } catch (error) {
                console.error("Failed to load orders:", error);
            }
        };
        loadOrders();
    }, []);
    // PATCH Status
    return (
        {orders, setOrders}
    );
}