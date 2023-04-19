/* eslint-disable array-callback-return */
import React from 'react';
import './Paginado.css';

export default function Paginado({ dogsPorPage, allDogs, paginado }) {
  const pageNumbers = [];

  for (let i = 0; i <= Math.ceil(allDogs / dogsPorPage) - 1; i++) {
    pageNumbers.push(i + 1);
  }
  return (
    <nav className='paginated-container'>
      <ul>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li className='paginated-number' key={number}>
              <button className='paginated-number-button'onClick={() => paginado(number)}>{number}</button>
            </li>
          ))}
      </ul>
    </nav>
  );
}
