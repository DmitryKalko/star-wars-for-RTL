import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

import FiguresList from './FiguresList';

const Product = () => {

    const baseUrl = 'https://react-test-starwars.vercel.app/api/products/';
    const baseUrlImage = 'https://react-test-starwars.vercel.app';

    const [productData, setProductData] = useState();
    const [email, setEmail] = useState('');
    const [sendStatus, setSendStatus] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`${baseUrl}${id}`)
            .then((response) => setProductData(response.data.data))
    }, [id]);

    useEffect(() => {
        if (sendStatus && email) {
            axios({
                method: 'post',
                url: 'https://react-test-starwars.vercel.app/api/pre-order',
                data: {
                    "productId": id,
                    "email": email
                },
                headers: {
                    // the request is being prevented by the CORS policy
                    // no data about required headers
                },
            })
                .then(response => alert(response))
                .catch(error => alert(error))
        }
    }, [sendStatus]);

    const getEmail = (e) => {
        setEmail(e.target.value);
    };

    const sendOrder = (e) => {
        e.preventDefault();
        setSendStatus(true);
    };

    return (
        <div className='productCard'>

            {productData && (
                <>
                    <div className="buy-block">
                        <div className="picture">
                            <img src={`${baseUrlImage}${productData.product.image}`} />
                        </div>

                        <div className="description-block">
                            <h1>Exclusive Vinyl Mudtrooper</h1>
                            <p>{productData.product.description}</p>
                            <form onSubmit={sendOrder}>
                                <input type="email" placeholder="Email" id="email" onChange={getEmail} />
                                <button>Pre-order Now</button>
                            </form>

                        </div>
                    </div>
                    <h2>Related Figures</h2>
                    <FiguresList figuresData={productData.relatedProducts} />
                </>
            )}

        </div>
    )
}

export default Product;