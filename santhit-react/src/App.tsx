import {BrowserRouter, Route, Routes} from "react-router-dom";
import HeaderPage from "./pages/HeaderPage.tsx";
import FooterPage from "./pages/FooterPage.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import LandingPage from "./pages/LandingPage.tsx";
import {ProductList} from "./pages/ProductList.tsx";
import ProductPages from "./pages/ProductPages.tsx";
import {ProductDetails} from "./pages/ProductDetails.tsx";
import {LoginPage} from "./auth/pages/LoginPage.tsx";
import {CustomerLayout} from "./customer/page/CustomerLayout.tsx";
import {ProtectedRoute} from "./auth/pages/ProtectedRouteProps.tsx";
import OrderForm from "./customer/page/OrderForm.tsx";
import OrderView from "./customer/page/OrderView.tsx";
import {AdminOrderPage} from "./admin/page/AdminOrderPage.tsx";
import {AdminLayout} from "./admin/page/AdminLayout.tsx";
import AdminInventoryPage from "./inventory/page/AdminInventoryPage.tsx";
import VoucherPage from "./voucher/page/VoucherPage.tsx";
import {CartView} from "./pages/CartView.tsx";
import PaymentPage from "./Payment/page/PaymentPage.tsx";
import AdminPaymentPage from "./Payment/page/AdminPaymentPage.tsx";
import {RegisterPage} from "./auth/pages/RegisterPage.tsx";


export default function App() {
    const queryClient=new QueryClient();
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                <HeaderPage/>
                <Routes>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/products" element={<ProductList/>}/>
                    <Route path="/product-page" element={<ProductPages/>}/>
                    <Route path="/product-details/:id" element={<ProductDetails/>}/>
                    <Route path="/cart" element={<CartView/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]}/>}>
                        <Route path="/admin/dashboard" element={<AdminLayout/>}>
                            <Route path="order" element={<AdminOrderPage/>}/>
                            <Route path="inventory" element={<AdminInventoryPage/>}/>
                            <Route path="payment" element={<AdminPaymentPage/>}/>
                        </Route>
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={["ROLE_CUSTOMER"]}/>}>
                        <Route path="/customer/dashboard" element={<CustomerLayout/>}>
                        <Route path="orderForm" element={<OrderForm/>}/>
                            <Route path="orderView" element={<OrderView/>}/>
                            <Route path="voucher/:orderId" element={<VoucherPage/>}/>
                            <Route path="payment/:orderId" element={<PaymentPage/>}/>
                        </Route>
                    </Route>
                </Routes>
                <FooterPage/>
            </BrowserRouter>
            </QueryClientProvider>
        </>
    );
}
