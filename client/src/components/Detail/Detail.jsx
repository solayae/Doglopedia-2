/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDetail, Clear, deleteDog } from '../../redux/actions';
import './Detail.css';

export default function Detail() {
  const { id } = useParams();
  const dogDetail = useSelector((e) => e.detail);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getDetail(id));
    dispatch(Clear());
  }, [dispatch, id]);

  function handleDeleteDog() {
    dispatch(deleteDog(id));
    alert('Dog deleted succesfully');
    history.push('/home');
  }

  return (
    <div className='detail-container'>
      <div>
        {dogDetail.createInDb && (
          <button onClick={handleDeleteDog}>Delete</button>
        )}
      </div>
      {dogDetail.length > 0 ? (
        <main>
          <div className='informacion'>
            <h1>{dogDetail[0].name}</h1>
            <Link to='/home'>
              <button>Back</button>
            </Link>
            <div className='detail-elements-container'>
              <div className='detail-text-container'>
                <h3>Size</h3>
                <p>
                  The {dogDetail[0].name} is a dog that in adulthood measures
                  between {dogDetail[0].height} cm.
                </p>
                <h3>Breed Temperament</h3>
                <p>
                  This breed is characterized by being{' '}
                  {dogDetail[0].temperament}.
                </p>
                <h3>Weight</h3>
                <p>
                  A dog in good condition should be {dogDetail[0].weight} kg
                </p>
                <h3>Average Lifespan</h3>
                <p>
                  With proper care and nutrition can live between{' '}
                  {dogDetail[0].life_span}
                </p>
              </div>
              <div className='detail-img-container'>
                <img
                  src={dogDetail[0].image}
                  alt={dogDetail[0].image}
                  width='500px'
                  height='400px'
                />
              </div>
            </div>
          </div>
        </main>
      ) : (
        // <p>Loading...</p>
        <div className='loading-container'>
          <div class='loader'></div>
        </div>
      )}
    </div>
  );
}



















