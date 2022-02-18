import axios from "axios";
import { Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

export default function Category(){
    const {category} = useParams()

    const [categoryProducts, setCategoryProducts] = useState([])

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/category/${category}`)
        .then(res => {
            setCategoryProducts(res.data)
        })
    }, [category])


    return (
        <div>
            <hr />
            <h1 className="pb-3 pt-2">{toTitleCase(category)}</h1>

            <Row className="px-3">
                {categoryProducts.map(product => (
                    <ProductCard product={product} id={product.id} key={product.id} />
                ))}
            </Row>

        </div>
    )
}