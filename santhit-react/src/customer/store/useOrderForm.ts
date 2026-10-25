import type {OrderFormDto} from "../dto/OrderFormDto.ts";
import {create} from "zustand/react";

interface OrderFormState {
    orderForms:OrderFormDto[];
    setOrderForms(orderForms: OrderFormDto[]): void;
}
export const useOrderForm= create<OrderFormState>()((set)=>({
    orderForms:[],
    setOrderForms:(orderForms)=>set({orderForms:orderForms})
}));


