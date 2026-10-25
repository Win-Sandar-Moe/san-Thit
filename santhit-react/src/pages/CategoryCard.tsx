import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useProductsByCategoryName} from "../product/hook/useApiQuery.tsx";
import {useProductStore} from "../product/provider/ProductStore.ts";

export function CategoryCard({category}:{category:any}) {

    const navigate= useNavigate();
    const{setProducts}=useProductStore();
    const [selectedCategory,setSelectedCategory]=useState<string|null>(null);
    const {data:products}=useProductsByCategoryName(selectedCategory || "");
    const handleCategoryClick=()=>{
        setSelectedCategory(category.name);
    };
    useEffect(()=>{
        if(products && selectedCategory === category.name){
            setProducts(products);
            navigate("/products");
        }
    },[products, selectedCategory, category.name, setProducts, navigate])
    return (
        <>
            <div className="text-center" onClick={handleCategoryClick} style={{ cursor: 'pointer' }}>
                {/* Category Image */}
                <div
                    className="shadow rounded-3 overflow-hidden"
                    style={{
                        height: "280px",
                        width: "230px"
                    }}
                >
                    <img
                        src={`/images/Category/${category.image}`}
                        alt={category.name}
                        className="w-100 h-100"
                        style={{
                            objectFit: "cover"
                        }}
                        loading="lazy"
                    />
                </div>
            </div>
        </>
    );
}
