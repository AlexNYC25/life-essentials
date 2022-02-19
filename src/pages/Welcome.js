import axios from "axios"
import { useEffect, useState } from "react"
import { Image } from "react-bootstrap"
import { Container } from "react-bootstrap"
import { Row } from "react-bootstrap"
import { Col } from "react-bootstrap"
import ProductCard from "../components/ProductCard"

import welcomeImage from "../images/pexels-cottonbro-6069089.jpg"
import welcomeVideo from '../videos/production_ID_4008532.mp4'

export default function Welcome(){

    const [products, setProducts] = useState([])

    let getRandomProducts = (num) => {
        let allProducts = []
        let randomProducts = []
        axios.get('https://fakestoreapi.com/products')
        .then(res => {
            allProducts = res.data
            for(let i = 0; i < num; i++){
                let notDuplicate = true

                while(notDuplicate){
                    let randomIndex = Math.floor(Math.random() * allProducts.length)
                    if(randomProducts.indexOf(allProducts[randomIndex]) === -1){
                        randomProducts.push(allProducts[randomIndex])
                        notDuplicate = false
                    }
                }
            }
            
            setProducts(randomProducts)
        })
        
    }

    
    function ProductCartArr(props){
        const products = props.products
        const productItems = products.map((product, index) => {
            return <ProductCard product={product} id={product.id} key={product.id}/>
        })

        return productItems
    }

    useEffect(() => getRandomProducts(4), [])


    return (
        <div>
            
            <div className="px-1" style={{position:'relative', color:'white'}}>
                <video autoPlay muted loop src={welcomeVideo} style={{top:0, left:0, width:'100%', height:'auto'}}/>

                <div className="px-3 card-img-overlay" >
                    <h1 id="welcome-video-text" className="py-5">
                        Welcome to Life Essentials.
                    </h1>
                </div>
            </div>

            <div >
                <Container>
                    <h2 className="py-4">
                        Featured Items
                    </h2>
                    <Row>
                        <ProductCartArr products={products}/>
                    </Row>
                </Container>
            </div>

            

            <div id="about-us" className="py-3">
                <Container>
                    <Row>
                        <Col lg={4}>
                            <Image src={welcomeImage} fluid rounded />
                        </Col>
                        <Col lg={8}>
                            <h1>About Us</h1>
                            <p>
                                We are a modern boutique store that caters to the needs of the modern lifestyle. Providing you with the best quality products at the most affordable prices.
                                Everything from Clothes to Electronics can be found in any one of our stores. We are the ubiquitous choice for the needs of a modern lifestyle, our goal is that when you
                                arrive in any metropolitan city our store will be the first and only store to have everything you need.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div id="location" className="py-3">
                <Container>
                    <Row>
                        <Col lg={8}>
                            <h1>Location</h1>
                            <p>
                                Our Flag ship store is located at the heart of the city, at the heart of the New York City. Right on fifth avenue just off of Central Park. 
                                We have also opened more of our stores in various metropolitan cities, such as Los Angeles, Chicago, and Boston. Including other modern day cities such as 
                                London, Paris, and Tokyo. We are always open to serve you.
                            </p>
                        </Col>
                        <Col lg={4}>
                            <iframe title="location-map" width="100%" height="100%" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=100%25&amp;hl=en&amp;q=720%205th%20Ave+(Life%20Essentials)&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                                <a href="https://www.gps.ie/sport-gps/">swimming watch</a>
                            </iframe>
                                
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}