
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import type { RegisterDto } from "../dto/RegisterDto.ts";
import { registerApiCall } from "../api/authApi.ts";

export function RegisterPage() {
    const { register, handleSubmit, reset } = useForm<RegisterDto>();
    const navigate = useNavigate();

    const onSubmitHandler: SubmitHandler<RegisterDto> = async (data) => {
        try {
            const response = await registerApiCall(data);
            console.log("Register success:", response);
            reset();
            navigate("/login");
        } catch (e) {
            console.error("Register failed", e);
        }
    };
    const iconStyle = {
        height: "36px",
        padding: "0 12px",
        fontSize: "18px",
        borderColor: "#ced4da",
    };
    const inputStyle = {
        height: "36px",
        fontSize: "14px",
    };
    return (
        <div
            className="min-vh-100 d-flex justify-content-center align-items-center py-2"
        >
            <div className="col-11 col-sm-9 col-md-7 col-lg-5 col-xl-4">
                <div className="card shadow-lg border-0 rounded-4"
                     style={{
                         width: "100%",
                         maxWidth: "420px",
                         borderRadius: "16px"
                     }}
                >
                    <div className="card-body p-3 p-sm-4">


                        {/* TITLE */}
                        <div className="text-center mb-2">
                            <h3
                                className="fw-bold mb-1"
                                style={{
                                    color: "#0c2340",
                                    letterSpacing: "1px",
                                }}
                            >
                                REGISTER
                            </h3>

                            <p className="text-secondary small mb-0">
                                Welcome! Please fill in your details to register.
                            </p>
                        </div>
                        <form onSubmit={handleSubmit(onSubmitHandler)}>
                            {/* USERNAME */}
                            <div className="mb-2">
                                <label className="form-label fw-semibold text-secondary small mb-0">
                                    Username
                                </label>
                                <div className="input-group">
                                    <span
                                        className="input-group-text border-end-0"
                                        style={{
                                            ...iconStyle,
                                            backgroundColor: "#dbeafe",
                                        }}
                                    >
                                        👤
                                    </span>

                                    <input
                                        type="text"
                                        className="form-control bg-white border-start-0 ps-2"
                                        style={inputStyle}
                                        placeholder="Username"
                                        required
                                        {...register("username")}
                                    />
                                </div>
                            </div>

                            {/* EMAIL */}
                            <div className="mb-2">
                                <label className="form-label fw-semibold text-secondary small mb-0">
                                    Email address
                                </label>

                                <div className="input-group">
                                    <span
                                        className="input-group-text border-end-0"
                                        style={{
                                            ...iconStyle,
                                            backgroundColor: "#fce7f3",
                                        }}
                                    >
                                        📧
                                    </span>

                                    <input
                                        type="email"
                                        className="form-control bg-white border-start-0 ps-2"
                                        style={inputStyle}
                                        placeholder="name@gmail.com"
                                        required
                                        {...register("email")}
                                    />
                                </div>
                            </div>
                            {/* PASSWORD */}
                            <div className="mb-2">
                                <label className="form-label fw-semibold text-secondary small mb-0">
                                    Password
                                </label>

                                <div className="input-group">
                                    <span
                                        className="input-group-text border-end-0"
                                        style={{
                                            ...iconStyle,
                                            backgroundColor: "#fef3c7",
                                        }}
                                    >
                                        🔒
                                    </span>

                                    <input
                                        type="password"
                                        className="form-control bg-white border-start-0 ps-2"
                                        style={inputStyle}
                                        placeholder="Password"
                                        required
                                        {...register("password")}
                                    />
                                </div>
                            </div>

                            {/* PHONE NUMBER */}
                            <div className="mb-2">
                                <label className="form-label fw-semibold text-secondary small mb-0">
                                    Phone Number
                                </label>

                                <div className="input-group">
                                    <span
                                        className="input-group-text border-end-0"
                                        style={{
                                            ...iconStyle,
                                            backgroundColor: "#d1fae5",
                                        }}
                                    >
                                        📱
                                    </span>

                                    <input
                                        type="tel"
                                        className="form-control bg-white border-start-0 ps-2"
                                        style={inputStyle}
                                        placeholder="Phone Number"
                                        required
                                        {...register("phoneNumber")}
                                    />
                                </div>
                            </div>
                            {/* ADDRESS */}
                            <div className="mb-2">
                                <label className="form-label fw-semibold text-secondary small mb-0">
                                    Address
                                </label>
                                <div className="input-group">
                                    <span
                                        className="input-group-text border-end-0 align-items-start pt-2"
                                        style={{
                                            ...iconStyle,
                                            height: "54px",
                                            backgroundColor: "#ffedd5",
                                        }}
                                    >
                                        📍
                                    </span>

                                    <textarea
                                        className="form-control bg-white border-start-0 ps-2"
                                        style={{
                                            fontSize: "14px",
                                            height: "54px",
                                            resize: "none",
                                        }}
                                        placeholder="Address"
                                        rows={2}
                                        // required
                                        {...register("address")}
                                    />
                                </div>
                            </div>
                            {/* REGISTER BUTTON */}
                            <button
                                type="submit"
                                className="btn w-100 rounded-3 fw-bold text-white shadow-sm mb-2"
                                style={{
                                    height: "38px",
                                    padding: "4px 12px",
                                    fontSize: "14px",
                                    backgroundColor: "#2b87f5",
                                    borderColor: "#2b87f5",
                                }}
                            >
                               Register
                            </button>

                            {/* DIVIDER */}
                            <div className="position-relative text-center my-2">
                                <hr className="text-secondary opacity-25 my-2" />
                                <span
                                    className="position-absolute top-50 start-50 translate-middle px-3 text-secondary small"
                                    style={{ backgroundColor: "white" }}
                                >
                                    🔐 Secure Access
                                </span>
                            </div>
                            {/* LOGIN LINK */}
                            <div className="text-center">
                                <p className="mb-0 text-secondary small">
                                    Already have an account?
                                    <Link
                                        to="/login"
                                        className="text-primary text-decoration-none fw-bold ms-1"
                                    >
                                        Login
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
