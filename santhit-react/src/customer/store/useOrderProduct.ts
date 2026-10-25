import {useEffect, useState} from "react";
import {getOrderProductList} from "../api/orderFormApi.ts";
import type {CustomerOrderRequest} from "../dto/CustomerOrderRequest.ts";


export default function useOrderProducts() {

    const [products,setProducts] =useState<CustomerOrderRequest[]>([]);

    useEffect(() => {
        const getAllOrderProducts = async () => {
            const products = await getOrderProductList();
            setProducts(products);
        };
        getAllOrderProducts();
    }, []);
    return (
        {products}
    );
}
