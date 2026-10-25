import type {VoucherResponse} from "../dto/VoucherResponse";
import axiosClient from "../../auth/api/axiosClient.ts";

export const createVoucher = async (
    orderId: string
): Promise<VoucherResponse> => {
    const response = await axiosClient.post(
        `/api/vouchers/${orderId}`
    );
    return response.data;
};

export const getVoucherByOrderId = async (
    orderId: string
): Promise<VoucherResponse> => {
    const response = await axiosClient.get(
        `/api/vouchers/${orderId}`
    );
    return response.data;
};