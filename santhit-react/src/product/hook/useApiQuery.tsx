import {useQuery} from "@tanstack/react-query";
import {productApi} from "../api/productApi.ts";

export const useCategory=()=>{
    return useQuery({
        queryKey:["category"],
        queryFn:productApi.getCategory
    });
}
export const useInvitationTemplate=()=>{
    return useQuery({
        queryKey:["invitation"],
        queryFn:productApi.getInvitation
    });
}
export const useProduct=(page:number,size:number)=>{
    return useQuery({
        queryKey:["product",page,size],
        queryFn:()=> productApi.getProducts(page,size)
    });

}
export const useProductsByCategoryName = (categoryName: string) => {
    return useQuery({
        queryKey: ["productsByCategoryName", categoryName],
        queryFn: () => productApi.getProductsByCategoryName(categoryName),
        enabled: !!categoryName,
    });
};

export const useProductsByInivitationName = (invitationName: string) => {
    return useQuery({
        queryKey: ["productsByInivitationName", invitationName],
        queryFn: () => productApi.getProductsByInvitationName(invitationName),
        enabled: !!invitationName,
    });
};
export const useProductById = (id: string) => {
    return useQuery({
        queryKey: ["product", id],
        queryFn: () => productApi.getProductById(id),
        enabled: !!id,
    });
};
