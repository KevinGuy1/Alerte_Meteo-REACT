import React from 'react';

const Card = ({ title, description, danger, startAlert, endAlert }) => {
    return (
        <div className='card'>
            <h2>{title}</h2>
            <h4>{description}</h4>
            <h4>{danger}</h4>
            <h4>{startAlert}</h4>
            <h4>{endAlert}</h4>
        </div>
    );
};

export default Card;