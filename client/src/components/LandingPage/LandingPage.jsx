import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className='container-landing'>
      <div className='container-text'>
        <h1>List of All Kinds of Dog Breeds</h1>
        <p>
          From tiny French Bulldogs to giant Great Danes, our dog breed gallery
          has everything you need to know about your favourite dog breed!
        </p>
        <Link to='/home'>
          <button className='button-landing'>Enter</button>
        </Link>
      </div>
      <div className='container-image'>
        <img
          src="https://www.southernanimalhealth.com.au/wp-content/uploads/2022/08/kisspng-border-collie-puppy-cat-pet-veterinarian-dogs-5aba1a760bf6d1.553726521522145910049-e1659479349630.png"
          alt='dogs-breeds'
          width='450px'
        />
      </div>
    </div>
  );
}
