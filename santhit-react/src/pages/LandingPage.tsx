import {useCategory, useInvitationTemplate} from "../product/hook/useApiQuery.tsx";
import {useMemo} from "react";
import {CategoryCard} from "./CategoryCard.tsx";
import {InvitationCard} from "./InvitationCard.tsx";
import {Link} from "react-router-dom";

export const BLUE = "#3d8dde";

export default function LandingPage() {

    const {data: categories, isLoading: isCatLoading, isError: isCatError} = useCategory();
    const {data: invitations, isLoading: isInvLoading, isError: isInvError} = useInvitationTemplate();

    const randomInvitations = useMemo(() => {
        if (!invitations) return [];

        return [...invitations]
            .sort(() => Math.random() - 0.5)
            .slice(0, 4);
    }, [invitations]);

    return (
        <div className=" min-vh-100  " >
            {/* 1. Hero Section */}
            <section
                id="home"
                className="container-fluid  rounded-bottom-3 overflow-hidden py-4"
            >
                <div className="container">
                    <div className="row align-items-center g-4">
                        {/* Left Side - Hero Content */}
                        <div className="col-lg-6 order-lg-1 text-center text-lg-start">
                            <h1 className="fw-bold text-dark display-5 ">
                                ဆန်းသစ် <span style={{fontSize: "24px"}}>
                                💻 ကွန်ပျူတာ
                                </span>
                                <hr/>
                            </h1>
                            <h4> ဖိတ်စာ/ယပ်တောင်လုပ်ငန်း </h4>
                            <p className="text-secondary mt-3">
                                မင်္ဂလာပွဲ၊ အလှူပွဲနှင့် မွေးနေ့ပွဲ
                                အထူးအခမ်းအနားများအတွက်
                                လှပသေသပ်သော ဖိတ်စာဒီဇိုင်းများနှင့်
                                အရည်အသွေးကောင်း ယပ်တောင်များကို
                                စိတ်တိုင်းကျ ရွေးချယ်နိုင်ပါသည်။
                            </p>
                            {/* Buttons */}
                            <div className="d-flex flex-wrap justify-content-center
                                justify-content-lg-start gap-2 mt-4">
                                <Link to="/product-page"
                                      className="btn btn-success align-items-center rounded-pill px-4"
                                >
                                    Our Products
                                    <span className="ms-2">→</span>
                                </Link>
                            </div>
                        </div>

                        {/* Right Side - Image Grid */}
                        <div className="col-lg-6 order-lg-2 mt-5">
                            <div className="row g-2 justify-content-end ">
                                {/* Image 1 */}
                                <div className="col-6">
                                    <img
                                        src="/images/aa.png"
                                        alt="image"
                                        className="img-fluid w-100 rounded-5"
                                        style={{
                                            height: "225px",
                                            objectFit: "cover"
                                        }}
                                    />
                                </div>
                                {/* Image 2 */}
                                <div className="col-6">
                                    <img
                                        src="/images/wedd.png"
                                        alt="image"
                                        className="img-fluid w-100 rounded-5"
                                        style={{
                                            height: "225px",
                                            objectFit: "cover"
                                        }}
                                    />
                                </div>
                                {/* Image 3 */}
                                <div className="col-6">
                                    <img
                                        src="/images/yat.png"
                                        alt="image"
                                        className="img-fluid w-100 rounded-5"
                                        style={{
                                            height: "225px",
                                            objectFit: "cover"
                                        }}
                                    />
                                </div>
                                {/* Image 4 */}
                                <div className="col-6">
                                    <img
                                        src="/images/bir.png"
                                        alt="image"
                                        className="img-fluid w-100 rounded-5"
                                        style={{
                                            height: "225px",
                                            objectFit: "cover"
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <main className="container pb-5">
                {/* 2. Categories Section */}
                <section id="categories" className="mb-5">
                    {/* Section Header */}
                    <div className="text-center mb-4">
                        <h3 className="fw-bold mb-1">Shop by Categories</h3>
                        <p className="text-muted small mb-0">
                            မိမိစိတ်ကြိုက် အမျိုးအစားအလိုက် ရွေးချယ်ပါ
                        </p>
                    </div>
                    {/* Loading */}
                    {isCatLoading && (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">
                                    Loading categories...
                                </span>
                            </div>
                        </div>
                    )}
                    {/* Error */}
                    {isCatError && (
                        <div className="alert alert-danger rounded-3" role="alert">
                            Category များ ရယူရာတွင် အမှားတစ်ခု ဖြစ်ပေါ်နေပါသည်။
                        </div>
                    )}

                    {/* Categories */}
                    {!isCatLoading && !isCatError && (
                        <div className="row g-3 justify-content-center">
                            {categories?.map((category) => (
                                <div
                                    key={category.id}
                                    className="col-6 col-md-4 col-lg-3 d-flex justify-content-center"
                                >
                                    <CategoryCard category={category}/>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* 3. Invitation Templates Section - **MODIFIED HERE** */}
                <section id="templates" className="pt-3">
                    <div className="border-start border-4 border-primary ps-3 mb-4">
                        <h3 className="fw-bold mb-1">
                            Featured Invitation Templates
                        </h3>
                        <p className="text-muted small mb-0">
                            လူကြိုက်များသော ဒီဇိုင်းများ
                        </p>
                    </div>

                    {isInvLoading && (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">
                                    Loading templates...
                                </span>
                            </div>
                        </div>
                    )}

                    {isInvError && (
                        <div className="alert alert-danger rounded-3 shadow-sm">
                            Invitation Template များ ရယူရာတွင်
                            အမှားတစ်ခု ဖြစ်ပေါ်နေပါသည်။
                        </div>
                    )}

                    {/* Random Invitation Templates - Grid layout with uniform card sizes */}
                    {!isInvLoading && !isInvError && (
                        <div className="row g-3">
                            {randomInvitations.map((invitation) => (
                                <div
                                    key={invitation.id}
                                    className="col-6 col-md-4 col-lg-3" // Show 2 cards on mobile, 3 on tablet, 4 on large screens
                                >
                                    {/* Make sure InvitationCard handles invitation and text consistent. */}
                                    <InvitationCard invitation={invitation}/>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}