
export interface ProductDto {
    id: string;
    name: string;
    image: string;
    price: number;
    size: string;
    category: string;
    invitationTemplate: string;
}

export interface PageResponse<T>{
    content:T[];
    totalElements:number;
    totalPages:number;
    size:number;
    number:number;
    last:boolean;
    first:boolean;
    empty:boolean;
}