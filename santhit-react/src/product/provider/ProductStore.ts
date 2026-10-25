import type {ProductDto} from "../dto/ProductDto.ts";
import {create} from "zustand/react";

interface ProductState{
   products:ProductDto[];
   setProducts(products:ProductDto[]):void;
}

export const useProductStore=create<ProductState>()((set)=>({
    products:[],
   setProducts:(products)=>set({products})
}))