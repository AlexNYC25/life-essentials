import Col from "react-bootstrap/Col"
import { Link } from "react-router-dom"

export default function ProductCard(props){

    let getStars = (rating) => {
        let elements = []
        let wholeStars = Math.floor(rating)
        let halfStars = rating - wholeStars > .5 ? 1 : 0;
        let emptyStars = 5 - wholeStars - halfStars

        let wholeStarSvg = <img src="https://img.icons8.com/fluency/48/000000/filled-star.png" alt="whole-star-rating" style={{width:'10%'}}/>
        let halfStarSvg = <img src="https://img.icons8.com/color/48/000000/star-half-empty.png" alt="half-star-rating" style={{width:'10%'}}/>
        let emptyStarSvg = <img src="https://img.icons8.com/color/48/000000/star--v1.png" alt="empty-star-rating" style={{width:'10%'}}/>

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

    return (
        <Col xs={12} sm={6} md={4} lg={3} xl={3} >
            <div className="card mb-3" >
                <Link to={'/product/'+ props?.id} >
                    <img src={props.product?.image} alt={props.product.title} className="card-img-top thumbnail" style={{width:'100%', height:'45vh', objectFit:'contain'}} />
                    <div className="absolute-position" >
                        {getStars(props.product.rating.rate)}
                    </div>
                </Link>
                <div className="card-body product-details" style={{height:'20vh'}}>
                    <h5 className="card-title">{props.product.title}</h5>
                </div>
            </div>
        </Col>
    )
}