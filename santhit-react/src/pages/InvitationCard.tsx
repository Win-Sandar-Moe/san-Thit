import { useEffect, useState } from "react";
import { useProductsByInivitationName } from "../product/hook/useApiQuery.tsx";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../product/provider/ProductStore.ts";

const BLUE = "#3d8dde";

export function InvitationCard({invitation}: { invitation: any}) {
    const { setProducts } = useProductStore();
    const navigate = useNavigate();
    const [selectedInvitation, setSelectedInvitation] =
        useState<string | null>(null);
    const { data: products } =
        useProductsByInivitationName(selectedInvitation || "");
    const handleInvitationClick = () => {
        setSelectedInvitation(invitation.name);
    };
    useEffect(() => {
        if (
            products &&
            selectedInvitation === invitation.name
        ) {
            setProducts(products);
            navigate("/products");
        }
    }, [
        products,
        selectedInvitation,
        invitation.name,
        setProducts,
        navigate
    ]);
    return (
        <div
            className="card border-0 shadow-sm custom-card-hover rounded-4 overflow-hidden h-100 d-flex flex-column"
            style={{
                transition: "all 0.3s ease"
            }}
        >
            {/* ================= IMAGE ================= */}
            <div
                onClick={handleInvitationClick}
                className="d-flex align-items-center justify-content-center"
                style={{
                    cursor: "pointer",
                    width: "100%",
                    aspectRatio: "3 / 4",
                    overflow: "hidden",
                    backgroundColor: "#ffffff"
                }}
            >
                <img
                    src={`/images/Invitation/${invitation.image}`}
                    alt={invitation.name}
                    loading="lazy"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        objectPosition: "center",
                        display: "block",
                        padding: "8px"
                    }}
                />
            </div>

            {/* ================= CONTENT ================= */}
            <div className="card-body p-3 d-flex flex-column flex-grow-1">
                <h6
                    className="card-title fw-bold text-dark text-truncate mb-3"
                    title={invitation.name}
                >
                    {invitation.name}
                </h6>

                {/* View Button */}
                <button
                    onClick={handleInvitationClick}
                    className="btn btn-md w-100 text-white rounded-pill fw-semibold mt-auto"
                    style={{
                        backgroundColor: BLUE
                    }}
                >
                    View
                </button>
            </div>
        </div>
    );
}

