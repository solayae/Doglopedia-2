import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getNameDogs, getDogs } from '../../redux/actions';
import './SearcBar.css';

//
export default function SearchBar() {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  function handleInputChange(e) {
    dispatch(getNameDogs(e));
  }

  return (
    <div className='navbar'>
      <input
        className='searchDiv'
        type='text'
        placeholder='Search'
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          handleInputChange(e.target.value);
        }}
      />
      
    </div>
  );
}
