
import type { CategoryDto } from "../dto/CategoryDto.ts";
import type { InvitationTemplateDto } from "../dto/InvitationTemplateDto.ts";
import type { PageResponse, ProductDto } from "../dto/ProductDto.ts";
import axiosClient from "../../auth/api/axiosClient.ts";

export const productApi = {
    // Get Categories
    getCategory: async (): Promise<CategoryDto[]> => {
        const response = await axiosClient.get<CategoryDto[]>(
            "/api/products/categorys"
        );
        if (response.status !== 200) {
            throw new Error("Category not found");
        }
        return response.data;
    },
    // Get Invitation Templates
    getInvitation: async (): Promise<InvitationTemplateDto[]> => {
        const response = await axiosClient.get<InvitationTemplateDto[]>(
            "/api/products/invitationTemplate"
        );
        if (response.status !== 200) {
            throw new Error("InvitationTemplate not found");
        }
        return response.data;
    },

    // Get All Products
    getProducts: async (page: number = 0, size: number = 20): Promise<PageResponse<ProductDto>> => {
        const response = await axiosClient.get<PageResponse<ProductDto>>(
            `/api/products/all?page=${page}&size=${size}`
        );
        if (response.status !== 200) {
            throw new Error("Product not found");
        }
        return response.data;
    },

    // Get Products By Category Name
    getProductsByCategoryName: async (name: string): Promise<ProductDto[]> => {
        const response = await axiosClient.get<ProductDto[]>(
            `/api/products/category/${name}`
        );
        if (response.status !== 200) {
            throw new Error("Category Products not found");
        }
        return response.data;
    },

    // Get Products By Invitation Name
    getProductsByInvitationName: async (name: string): Promise<ProductDto[]> => {
        const response = await axiosClient.get<ProductDto[]>(
            `/api/products/invitationName/${name}`
        );
        if (response.status !== 200) {
            throw new Error("Invitation Products not found");
        }
        return response.data;
    },

    // Get Product By ID
    getProductById: async (id: string): Promise<ProductDto> => {
        const response = await axiosClient.get<ProductDto>(
            `/api/products/${id}`
        );
        if (response.status !== 200) {
            throw new Error("Product not found");
        }
        return response.data;
    }
};
