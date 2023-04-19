/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

export default function Card({ name, temperament, weight, image, id }) {
  return (
    <div className='card-dog'>
    <Link to={`/dogs/${id}`}>
      <img
        src={image}
        alt='Imagen correspondiente a la raza del perro'
        width='300px'
        height='250px'
      />
      <h2>{name}</h2>
      <p>Temperaments: {temperament}</p>
      <p>Weight: {weight} kg</p>
    </Link>
  </div>
  );
}
