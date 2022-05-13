import React from 'react';
import { Link } from 'react-router-dom';

const Figure = (props) => {
    
    const { id, image, name, shortDescription, price } = props;
    const baseUrlImage = 'https://react-test-starwars.vercel.app';
    const splitPrice = price.toString().split('');
    splitPrice.splice(2, 0, '.');
    const prettyPrice = splitPrice.join('');

    return (
        <div className='figureCard' data-testid='figure'>
            <img src={`${baseUrlImage}${image}`} />
            <h2>{name}</h2>
            <p>{shortDescription}</p>
            <Link 
                to={{
                 pathname: `/product/${id}`,
                }}
                className='buyFigure'
            >
                {`Buy $${prettyPrice}`}
            </Link>
        </div>
    )
}

export default Figure;