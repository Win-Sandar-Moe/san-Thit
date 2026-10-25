import { useEffect, useState } from "react";
import type { VoucherResponse } from "../dto/VoucherResponse";
import { getVoucherByOrderId } from "../api/voucherApi";

export default function useVoucher(
    orderId?: string
) {
    const [voucher, setVoucher] = useState<VoucherResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        if (!orderId) {
            return;
        }
        const fetchVoucher = async () => {
            try {
                setLoading(true);
                setError(null);

                console.log(
                    "Fetching Voucher:",
                    orderId
                );
                const data =
                    await getVoucherByOrderId(orderId);
                console.log(
                    "Voucher API DATA:",
                    data
                );
                setVoucher(data);
            } catch (error: any) {
                console.error(
                    "Voucher Error:",
                    error.response?.data || error
                );
                setError(
                    error.response?.data?.message ||
                    "Failed to load voucher"
                );
                setVoucher(null);
            } finally {
                setLoading(false);
            }
        };
        fetchVoucher();
    }, [orderId]);
    return {
        voucher,
        loading,
        error
    };
}