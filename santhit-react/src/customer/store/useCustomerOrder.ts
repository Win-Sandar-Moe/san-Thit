import { useEffect, useState } from "react";
import { getMyOrders } from "../api/orderFormApi.ts";
import type { CustomerOrderResponse } from "../dto/CustomerOrderResponse.ts";

export default function useCustomerOrder() {

    const [orders, setOrders] = useState<CustomerOrderResponse[]>([]);
    useEffect(() => {
        const loadOrders = async () => {
            try {
                const data = await getMyOrders();
                console.log("MY ORDERS =", data);
                setOrders(data);
            } catch (error) {
                console.error("Failed to load orders:", error);
            }
        };
        loadOrders();
    }, []);
    return {
        orders,
        setOrders
    };
}