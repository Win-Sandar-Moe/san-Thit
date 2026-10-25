import type {AuthResponse} from "../dto/AuthResponse.ts";
import type {LoginRequest} from "../dto/LoginRequest.ts";
import type {RegisterDto} from "../dto/RegisterDto.ts";
import axiosClient from "./axiosClient.ts";

export const loginApiCall =
    async (loginRequest: LoginRequest): Promise<AuthResponse> => {
    const response =
        await axiosClient.post<AuthResponse>("/api/auth/login", loginRequest);
    console.log(response);
    if (response.status !== 200) {
        throw new Error(response.statusText);
    }
    return response.data;
}
export const registerApiCall =
    async (registerDto: RegisterDto): Promise<RegisterDto> => {
    const response =
        await axiosClient.post<RegisterDto>("/api/auth/register", registerDto);
    if (response.status !== 200) {
        throw new Error(response.statusText);
    }
    return response.data;
}