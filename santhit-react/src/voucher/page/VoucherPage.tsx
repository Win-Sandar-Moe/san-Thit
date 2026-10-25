import {useParams} from "react-router-dom";
import useVoucher from "../hook/useVoucher";

export default function VoucherPage() {
    const {orderId} = useParams<{ orderId: string }>();
    const {
        voucher,
        loading,
        error
    } = useVoucher(orderId);
    console.log("Order ID:", orderId);
    console.log("Voucher:", voucher);
    if (loading) {
        return (
            <div className="container mt-5">
                <div className="text-center">
                    Loading voucher...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger">
                    {error}
                </div>
            </div>
        );
    }

    if (!voucher) {
        return (
            <div className="container mt-5">
                <div className="alert alert-warning">
                    Voucher not found
                </div>
            </div>
        );
    }

    return (
        <div className="bg-light py-4">
            <div
                className="container bg-white border shadow-sm p-4"
                style={{
                    maxWidth: "900px",
                    fontFamily: "Arial, 'Noto Sans Myanmar', sans-serif"
                }}
            >

                <div className="text-center border-bottom pb-3 mb-4">
                    <h1 className="fw-bold mb-3 ">
                        ဆန်းသစ်
                    </h1>
                    <div className="fs-5">
                        ဖိတ်စာနှင့် ယပ်တောင်လုပ်ငန်း
                    </div>
                    <div className="mt-2 fw-bold">
                        ဆက်သွယ်ရန်ဖုန်းနံပါတ် - ၀၉ - ၇၈၃၉၆၈၂၂၇ / ၀က်လက်မြို့နယ် / ဆင်၀ပ်မြောက်ရွာ
                    </div>
                </div>

                 <div className="row mb-4">
                    {/* Voucher Code */}
                    <div className="col-md-7 mb-3">
                        <div className="d-flex align-items-center">
                            <strong
                                className="me-2"
                                style={{whiteSpace: "nowrap"}}
                            >
                                Voucher Code :
                            </strong>
                            <div
                                className="border-bottom border-dark flex-grow-1 px-2 fw-bold"
                                style={{
                                    fontSize: "18px"
                                }}
                            >
                                {voucher.voucherCode.slice(0,10) || "-"}
                            </div>
                        </div>
                    </div>
                    {/* Date */}
                    <div className="col-md-5 mb-3">
                        <div className="d-flex align-items-center">
                            <strong className="me-2">
                                Date :
                            </strong>
                            <div
                                className="border-bottom border-dark flex-grow-1 px-2"
                            >
                                {voucher.createdAt || "-"}
                            </div>
                        </div>
                    </div>
                    {/* Order ID */}
                    <div className="col-md-8 mb-3">
                        <div className="d-flex align-items-center">
                            <strong
                                className="me-2"
                                style={{whiteSpace: "nowrap"}}
                            >
                                Order ID :
                            </strong>
                            <div
                                className="border-bottom border-dark flex-grow-1 px-2 fw-bold"
                                style={{
                                    fontSize: "18px"
                                }}
                            >
                                {voucher.orderId.slice(0,6) || "-"}
                            </div>
                        </div>
                    </div>
                    {/* Username */}
                    <div className="col-md-4 mb-3">
                        <div className="d-flex align-items-center">
                            <strong className="me-2 text-capitalize">
                                CustomerName :
                            </strong>
                            <div
                                className="border-bottom border-dark flex-grow-1 px-2"
                            >
                                {voucher.username || "-"}
                            </div>
                        </div>
                    </div>
                </div>
                    {/*PRODUCT TABLE*/}
                <div className="table-responsive mb-4">
                    <table
                        className="table table-bordered mb-0"
                        style={{
                            borderColor: "#333"
                        }}
                    >
                        <thead>
                        <tr className="text-center">
                            <th
                                style={{
                                    width: "8%"
                                }}
                            >
                                စဉ်
                            </th>
                            <th>
                                အမျိုးအမည်
                            </th>
                            <th
                                style={{
                                    width: "15%"
                                }}
                            >
                                အရေအတွက်
                            </th>

                            <th
                                style={{
                                    width: "18%"
                                }}
                            >
                                နှုန်း
                            </th>

                            <th
                                style={{
                                    width: "20%"
                                }}
                            >
                                စုစုပေါင်း
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {voucher.items &&
                        voucher.items.length > 0 ? (
                            voucher.items.map((item) => (
                                <tr
                                    key={item.no}
                                    style={{
                                        height: "48px"
                                    }}
                                >
                                    <td className="text-center">
                                        {item.no}
                                    </td>
                                    <td className="text-capitalize">
                                        {item.productName}
                                    </td>
                                    <td className="text-center">
                                        {item.quantity}
                                    </td>
                                    <td className="text-end">
                                        {item.price.toLocaleString()} MMK
                                    </td>
                                    <td className="text-end">
                                        {item.amount.toLocaleString()} MMK
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="text-center text-muted"
                                    style={{
                                        height: "100px"
                                    }}
                                >
                                    No products found
                                </td>
                            </tr>
                        )}
                        {/* Empty rows for voucher style */}
                        {voucher.items.length < 8 &&
                            Array.from({
                                length: 8 - voucher.items.length
                            }).map((_, index) => (
                                <tr
                                    key={`empty-${index}`}
                                    style={{
                                        height: "42px"
                                    }}
                                >
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
                    {/*BOTTOM SECTION*/}
                <div className="row align-items-end">
                    {/* Signature */}
                    <div className="col-md-7">
                        <div className="mt-4">
                            <strong>
                                လက်မှတ် :
                            </strong>
                            <span className="ms-2">
                                ______________________________
                            </span>
                        </div>
                    </div>
                    {/* Payment Summary */}
                    <div className="col-md-5">
                        <table
                            className="table table-bordered mb-0"
                            style={{
                                borderColor: "#333"
                            }}
                        >
                            <tbody>
                            <tr>
                                <th>
                                    စုစုပေါင်း
                                </th>
                                <td className="text-end fw-bold">
                                    {voucher.totalAmount.toLocaleString()} MMK
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    စရံငွေ
                                </th>
                                <td className="text-end">
                                    {voucher.deposit.toLocaleString()} MMK
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    ကျန်ငွေ
                                </th>
                                <td className="text-end fw-bold">
                                    {voucher.balance.toLocaleString()} MMK
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="text-center mt-5 pt-3">
                    <h6 className="fw-bold mb-2">
                        ဝယ်ယူအားပေးမှု့ကို အထူးကျေးဇူးတင်ပါသည်။
                    </h6>
                </div>
            </div>
        </div>
    );
}