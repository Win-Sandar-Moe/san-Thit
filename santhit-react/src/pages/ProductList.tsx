import {Link} from "react-router-dom";
import {useProductStore} from "../product/provider/ProductStore.ts";

const BLUE = "#3d8dde";

export function ProductList() {
    const { products } =useProductStore();

    return (
        <section className="container py-4">
            {/* Header Section - ဘယ်ဘက် အပြာရောင်လိုင်းနှင့် ခေါင်းစဉ် */}
            <div className="mb-4 ps-2 style-header" style={{ borderLeft: `4px solid ${BLUE}` }}>
                <h3 className="fw-bold text-dark mb-0">
                    Our Product
                </h3>
            </div>
            {/* Product Grid - Row/Col စနစ်သုံးပြီး ၁ တန်းလျှင် ၄ ကတ် ကွက်တိ ပေါ်စေရန် */}
            <div className="row g-3">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex"
                    >
                        <div className="card border-0 shadow-sm bg-white rounded-3 overflow-hidden w-100 d-flex flex-column justify-content-between">
                            {/* Product Image Section - Fixed Aspect Ratio */}
                            <div
                                className="w-100 overflow-hidden bg-light"
                                style={{ aspectRatio: "3 / 4" }}
                            >
                                <img
                                    src={`/images/Product/${product.image}`}
                                    alt={product.name}
                                    className="w-100 h-100"
                                    style={{ objectFit: "cover", objectPosition: "center" }}
                                    loading="lazy"
                                />
                            </div>

                            {/* Product Details Section */}
                            <div className="p-3 d-flex flex-column justify-content-between flex-grow-1">
                                <div className="mb-2">
                                    <h6
                                        className="fw-bold text-dark text-truncate mb-1 text-capitalize"
                                        title={product.name}
                                        style={{ fontSize: "16px" }}
                                    >
                                        {product.name}
                                    </h6>

                                    <p className="text-secondary mb-0" style={{ fontSize: "16px" }}>
                                        Size: <span className="fw-bold text-dark" style={{ fontSize: "14px" }}>{product.size}</span>
                                    </p>
                                </div>

                                {/* Price & View Button */}
                                <div className="d-flex align-items-end justify-content-between pt-2 border-top mt-auto">
                                    <div>
                                        <span className="text-muted d-block" style={{ fontSize: "16px" }}>Price</span>
                                        <span className="fw-bold" style={{ color: BLUE , fontSize:"15px"}}>
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

            {/* Empty Product State */}
            {products.length === 0 && (
                <div className="text-center py-5">
                    <h5 className="text-muted">No products found</h5>
                    <p className="text-secondary">Product များ မရှိသေးပါ။</p>
                </div>
            )}
        </section>
    );
}