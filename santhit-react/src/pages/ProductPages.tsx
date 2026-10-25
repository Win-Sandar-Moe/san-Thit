import { Link } from "react-router-dom";
import { useProduct } from "../product/hook/useApiQuery.tsx";
import { useState } from "react";

const BLUE = "#3d8dde";

export default function ProductPages() {
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 20;

    const { data: productsPage, isLoading: isProductLoading, isError } = useProduct(currentPage, pageSize);
    const products = productsPage?.content || [];
    const totalPages = productsPage?.totalPages || 0;

    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    if (isProductLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="spinner-border" style={{ color: BLUE, width: "3rem", height: "3rem" }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
    if (isError) {
        return (
            <div className="text-center py-5 text-danger fw-bold">
                Error loading products. Please try again later.
            </div>
        );
    }
    return (
        <div className="container py-4">
            {/* Header Section */}
            <div className="mb-4 ps-3 style-header" style={{ borderLeft: `4px solid ${BLUE}` }}>
                <h3 className="fw-bold text-dark mb-1">Our Products</h3>
            </div>

            {/* Products Grid - Row/Col စနစ်သုံးပြီး ၁ တန်းလျှင် ၄ ကတ် ကွက်တိ ပေါ်စေရန် */}
            <div className="row g-3 ">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex"
                    >
                        <div className="card border-0 shadow-sm bg-white rounded-4 overflow-hidden w-100 d-flex flex-column">
                            {/* Image Section */}
                            <div
                                className="w-100 overflow-hidden bg-light"
                                style={{ aspectRatio: "3 / 4" }}
                            >
                                <img
                                    src={`/images/Product/${product.image}`}
                                    alt={product.name}
                                    className="w-100 h-100"
                                    style={{ objectFit: "cover", objectPosition: "center" }}
                                />
                            </div>
                            {/* Card Body Section */}
                            <div className="p-3 d-flex flex-column justify-content-between flex-grow-1">
                                <div className="mb-2">
                                    <h6
                                        className="fw-bold text-dark text-truncate mb-1"
                                        title={product.category || product.name}
                                        style={{ fontSize: "16px" }}
                                    >
                                        {product.category || product.name}
                                    </h6>

                                    {/* Size Field */}
                                    <p className="text-muted small mb-0" style={{ fontSize: "16px" }}>
                                        Size: <span className="fw-semibold text-dark"style={{ fontSize: "14px" }}>{product.size}</span>
                                    </p>
                                </div>

                                {/* Price & View Button */}
                                <div className="d-flex align-items-center justify-content-between pt-2 border-top mt-auto">
                                    <div>
                                        <span className="text-muted d-block" style={{ fontSize: "16px" }}>Price</span>
                                        <span className="fw-bold fs-6" style={{ color: BLUE , fontSize:"15px"}}>
                                            {product.price?.toFixed(2)} MMK
                                        </span>
                                    </div>
                                    <Link to={`/product-details/${product.id}`}
                                          className="btn text-white px-3 rounded-pill border-0 py-1"
                                          style={{ backgroundColor: BLUE, fontSize: "15px", fontWeight: 500 }}
                                    >
                                        View
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <nav className="d-flex justify-content-center mt-5" aria-label="Product pagination">
                    <ul className="pagination mb-0">
                        <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
                            <button
                                className="page-link text-dark me-1 rounded"
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                Previous
                            </button>
                        </li>

                        {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index} className="page-item">
                                <button
                                    className={`page-link rounded me-1 ${
                                        currentPage === index ? "text-white fw-bold" : "text-dark"
                                    }`}
                                    style={{
                                        backgroundColor: currentPage === index ? BLUE : "transparent",
                                        borderColor: currentPage === index ? BLUE : "#dee2e6"
                                    }}
                                    onClick={() => handlePageChange(index)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}

                        <li className={`page-item ${currentPage === totalPages - 1 ? "disabled" : ""}`}>
                            <button
                                className="page-link text-dark rounded"
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
}