import {type SubmitHandler, useForm} from "react-hook-form";
import type {LoginRequest} from "../dto/LoginRequest.ts";
import {useAuthStore} from "../store/useAuthStore.tsx";
import {loginApiCall} from "../api/authApi.ts";
import {useNavigate} from "react-router-dom";

export function LoginPage() {
    const setAuth = useAuthStore((state) => state.setAuth);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitting}
    } = useForm<LoginRequest>();

    const onSubmitHandler: SubmitHandler<LoginRequest> = async (data) => {
        try {
            const response = await loginApiCall(data);
            setAuth(
                response.accessToken,
                response.refreshToken
            );
            reset();
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div
            className="min-vh-100 d-flex align-items-center justify-content-center"
        >
            {/* Login Card */}
            <div
                className="card border-0 shadow-lg"
                style={{
                    width: "100%",
                    maxWidth: "420px",
                    borderRadius: "16px"
                }}
            >
                <div className="card-body p-3 p-md-4">
                    {/* Logo */}
                    <div className="text-center">
                        <img
                            src="/images/logosan.png"
                            alt="SN Logo"
                            className="img-fluid"
                            style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "contain"
                            }}
                        />
                    </div>
                    {/* Title */}
                    <div className="text-center">
                        <h4
                            className="fw-bold mb-1"
                            style={{
                                color: "#17375e",
                                letterSpacing: "1px"
                            }}
                        >
                            LOGIN
                        </h4>
                        <p className="text-secondary small mb-3">
                            Welcome back! Please login to your account.
                        </p>
                    </div>
                    {/* Login Form */}
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        {/* Username */}
                        <div className="mb-3">
                            <label
                                htmlFor="username"
                                className="form-label fw-semibold text-secondary"
                            >
                                Username
                            </label>
                            <div className="input-group">
                                <span
                                    className="input-group-text bg-primary-subtle border-primary-subtle"
                                    style={{width: "45px"}}
                                >
                                    👤
                                </span>
                                <input
                                    id="username"
                                    type="text"
                                    className={`form-control ${
                                        errors.username ? "is-invalid" : ""
                                    }`}
                                    placeholder="Username"
                                    {...register("username", {
                                        required: "Username is required"
                                    })}
                                />
                                {errors.username && (
                                    <div className="invalid-feedback">
                                        {errors.username.message}
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Password */}
                        <div className="mb-3">
                            <label
                                htmlFor="password"
                                className="form-label fw-semibold text-secondary"
                            >
                                Password
                            </label>
                            <div className="input-group">
                                <span
                                    className="input-group-text bg-primary-subtle border-primary-subtle"
                                    style={{width: "45px"}}
                                >
                                    🔒
                                </span>
                                <input
                                    id="password"
                                    type="password"
                                    className={`form-control ${
                                        errors.password ? "is-invalid" : ""
                                    }`}
                                    placeholder="Password"
                                    {...register("password", {
                                        required: "Password is required"
                                    })}
                                />
                                {errors.password && (
                                    <div className="invalid-feedback">
                                        {errors.password.message}
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Login Button */}
                        <button
                            type="submit"
                            className="btn btn-primary w-100 fw-semibold shadow-sm"
                            style={{
                                backgroundColor: "#2f86eb",
                                borderColor: "#2f86eb",
                                borderRadius: "8px",
                                padding: "10px"
                            }}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                    />
                                    Logging in...
                                </>
                            ) : (
                                <>
                                    ⇥ Login
                                </>
                            )}
                        </button>
                    </form>
                    {/* Secure Access */}
                    <div className="d-flex align-items-center gap-2 mt-3">
                        <hr className="flex-grow-1 text-primary"/>
                        <span className="text-secondary small text-nowrap">
                            Secure Access
                        </span>
                        <hr className="flex-grow-1 text-primary"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

