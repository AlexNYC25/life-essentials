// import useParams from 'react-router-dom/useParams';
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import { Row, Col } from "react-bootstrap"

import axios from "axios"

export default function Product(props){
    // get route params
    const { id } = useParams()
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true)
    const [productQuantity, setProductQuantity] = useState(1)

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
        .then(res => {
            setProduct(res.data)
            setLoading(false)
        })
    }, [id])

    // func to transform double number into dollar format
	const dollarFormatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2
	});

    let getStars = (rating) => {
        let elements = []
        let wholeStars = Math.floor(rating)
        let halfStars = rating - wholeStars > .5 ? 1 : 0;
        let emptyStars = 5 - wholeStars - halfStars

        let wholeStarSvg = <img src="https://img.icons8.com/fluency/48/000000/filled-star.png" alt="whole-star-rating" style={{width:'5%'}}/>
        let halfStarSvg = <img src="https://img.icons8.com/color/48/000000/star-half-empty.png" alt="half-star-rating" style={{width:'5%'}}/>
        let emptyStarSvg = <img src="https://img.icons8.com/color/48/000000/star--v1.png" alt="empty-star-rating" style={{width:'5%'}}/>

        for(let i = 0; i < wholeStars; i++){
            elements.push(wholeStarSvg)
        }
        for(let i = 0; i < halfStars; i++){
            elements.push(halfStarSvg)
        }
        for(let i = 0; i < emptyStars; i++){
            elements.push(emptyStarSvg)
        }
        return elements
    }

    let handleProductQuantityChange = (e) => {
        setProductQuantity(e.target.value)
    }

    let handleAddToCart = () => {
        props.addItem(id, productQuantity)
    }

    let productDetails = <Row className="pb-5 pt-3">
        <hr/>
        <Col md={4}>
            <img src={product.image} alt={product.title} className="rounded py-3 " style={{width:'80%'}}/>
        </Col>
        <Col md={8} > 
            <h2>{product.title}</h2>
            <hr/>
            <Row>
                <Col md={4}>
                    <h4 className="text-center">{dollarFormatter.format(product.price)}</h4>
                </Col>
                <Col  md={8}>
                    <h4 className="text-end">{getStars(product.rating?.rate)} Stars ({product.rating?.count} Reviews)</h4>
                </Col>
            </Row>
            <hr/>
            <div id="add-to-cart-container" className="d-flex flex-row justify-content-end">
                <div className="flex-shrink-1 pt-1">
                    <div className="input-group mb-3 ">
                        <button class="btn btn-outline-secondary" type="button">-</button>
                        <input type="number" class="form-control" value={productQuantity} onChange={handleProductQuantityChange}/>
                        <button class="btn btn-outline-secondary" type="button">+</button>
                        <button id="cart-button" class="btn" type="button" onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
            <div className="product-details">
                <p className="lead text-capitalize py-5">{product.description}</p>
            </div>
        </Col>
    </Row>

    return (
        <div className="container">
            {loading ? 'Loading...' : productDetails}
        </div>
    )
}