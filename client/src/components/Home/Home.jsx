import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDogs,
  filterCreated,
  orderByName,
  filterTemperament,
  getTemperament,
  orderPeso,
} from '../../redux/actions';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import SearchBar from '../SearchBar/SearchBar';
import './Home.css';

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const temperamentAll = useSelector((state) => state.allTemperament);

  // PAGINADO
  const [order, setOrder] = useState(''); // estado local que inicia vacio
  const [currentPage, setCurrentPage] = useState(1); //pagina actual que arranca en 1
  const [dogsPorPage, setDogsPorPage] = useState(8); // muestro 8 raza de dogs por pagina
  const indexOfLastDogs = currentPage * dogsPorPage; //8 razas de perros
  const indexOfFirstDogs = indexOfLastDogs - dogsPorPage; //
  const currentDogs = allDogs.slice(indexOfFirstDogs, indexOfLastDogs);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs()); //me despacha todos los perros
    dispatch(getTemperament()); // me despacha todos los temperamentos
  }, []);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }

  function handleFIlterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }
  function handleFilterAsc(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1); // lo seteo en la primera pagina
    setOrder(`Ordenado ${e.target.value}`);
    // setCurrentPage(1);
  }
  function handleFilterTemperament(e) {
    dispatch(filterTemperament(e.target.value));
  }

  // ordenamiento por peso
  function handleOrderPeso(e) {
    e.preventDefault();
    dispatch(orderPeso(e.target.value));
    setOrder(`Ordenado ${e.target.value}`);
  }

  return (
    <div className='conten'>
      <SearchBar currentPage={setCurrentPage} />

      <div>
        <div className='navi'>
          <button
            className='cargar'
            onClick={(e) => {
              handleClick(e);
            }}
          >
            Get all dogs
          </button>
          <select className='por' onChange={(e) => handleFilterAsc(e)}>
            <option value='All'>Order by</option>
            <option value='Asc'>A-Z</option>
            <option value='Des'>Z-A</option>
          </select>

          <select onChange={(e) => handleFIlterCreated(e)}>
            <option value='All'>Filter by</option>
            <option value='exis'>Created</option>
            <option value='raza'>Existing</option>
          </select>
          <select onChange={(e) => handleOrderPeso(e)}>
            <option value='All'>Weight</option>
            <option value='small'>Small</option>
            <option value='big'>Big</option>
          </select>
          <select onChange={(e) => handleFilterTemperament(e)}>
            <option value='Todos'>Temperaments</option>
            {temperamentAll.map((e) => (
              <option defaultValue='message' key={e.id} value={e.name}>
                {' '}
                {e.name}
              </option>
              // defaultValue para quitar error en consola del option
            ))}
          </select>
          <div className='boton-crear'>
            <Link to='/dogsCreate'>
              <button>Create Dog</button>
            </Link>
          </div>
        </div>

        <Paginado
          dogsPorPage={dogsPorPage}
          allDogs={allDogs.length}
          paginado={paginado}
        />

        <div className='container-cards'>
          {currentDogs?.map((e) => {
            return (
              <Link key={e.id} to='/home'>
                <div className='contenido'>
                  <Card
                    name={e.name}
                    temperament={e.temperament}
                    weight={e.weight}
                    image={e.image}
                    id={e.id}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
