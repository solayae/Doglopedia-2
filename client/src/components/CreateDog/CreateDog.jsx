import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { Link, useHistory } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { postDogs, getTemperament } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import './CreateDog.css';

function validate(input) {
  let errors = {};

  if (!input.name) errors.name = 'Obligatory field';
  else if (/[^A-Za-z0-9 ]+/g.test(input.name))
    errors.name = 'Name cannot have special characters or tildes';

  if (!input.minHeight) errors.minHeight = 'Height is required';
  else if (/[^0-9 ]+/g.test(input.minHeight))
    errors.minHeight = 'Valid height is in numbers';
  else if (/[^0-9 ]+/g.test(input.minHeight) > input.maxHeight)
    errors.minHeight =
      'The minimum height cannot be greater than the maximum height.';

  if (!input.maxHeight) errors.maxHeight = 'La Altura es requerida';
  else if (/[^0-9 ]+/g.test(input.minWeight))
    errors.minWeight = 'Valid weight is in numbers';
  else if (parseInt(input.maxHeight) < parseInt(input.minHeight))
    errors.maxHeight =
      'The maximum height cannot be less than the minimum height.';

  if (!input.minWeight) errors.minWeight = 'Weight is required';
  else if (/[^0-9 ]+/g.test(input.minWeight))
    errors.minWeight = 'Valid weight is in numbers';
  else if (parseInt(input.minWeight) > input.maxWeight)
    errors.minWeight = 'The minimum weight cannot be greater than the maximum weight';

  if (!input.maxWeight) errors.maxWeight = 'El Peso es obligatorio';
  else if (/[^0-9 ]+/g.test(input.maxWeight))
    errors.maxWeight = 'Valid weight is in numbers';
  else if (parseInt(input.maxHeight) < input.minWeight)
    errors.maxWeight = 'The Maximum weight cannot be less than the minimum weight';

  if (!input.minlife_span)
    errors.minlife_span = 'Life expectancy is a mandatory data';
  else if (/[^0-9 ]+/g.test(input.minlife_span))
    errors.minlife_span = 'Life expectancy should go in numbers';
  else if (parseInt(input.minlife_span) > input.maxlife_span)
    errors.minlife_span =
      'The minimum life expectancy cannot be greater than the maximum life expectancy.';

  if (!input.image) errors.image = 'The url cannot be empty';

  if (!input.maxlife_span)
    errors.maxlife_span = 'Life expectancy is a mandatory data';
  else if (/[^0-9 ]+/g.test(input.maxlife_span))
    errors.maxlife_span = 'Life expectancy should go in numbers';
  else if (parseInt(input.maxlife_span) < parseInt(input.minlife_span))
    errors.maxlife_span =
      'The maximum life expectancy cannot be less than the minimum life expectancy.';
  return errors;
}

export default function DogCreate() {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const history = useHistory();
  const temperamentAll = useSelector((state) => state.allTemperament);

  const [errors, setErrors] = useState({});

  // eslint-disable-next-line no-unused-vars
  const [input, setInput] = useState({
    name: ' ',
    minHeight: ' ',
    maxHeight: ' ',
    maxWeight: ' ',
    minWeight: ' ',
    image: ' ',
    minlife_span: ' ',
    maxlife_span: ' ',
    temperament: [],
  });

  // eslint-disable-next-line no-unused-vars
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );

    // console.log(input)
  }
  function handleSelect(e) {
    setInput({
      ...input,
      temperament: [...input.temperament, e.target.value],
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (
      input.name === ' ' ||
      input.maxHeight === ' ' ||
      input.maxHeight === ' ' ||
      input.minWeight === ' ' ||
      input.maxWeight === ' ' ||
      input.minlife_span === ' ' ||
      input.maxlife_span === ' ' ||
      input.image === ' '
    ) {
      return alert('complete el formulario');
    }
    let crear = {
      name: input.name,
      height: `${input.minHeight}-${input.maxHeight}`,
      weight: `${input.minWeight}-${input.maxWeight}`,
      life_span: `${input.minlife_span}-${input.maxlife_span} years`,
      image: input.image,
      temperament: input.temperament.join(', '),
    };

    dispatch(postDogs(crear));

    setInput({
      name: ' ',
      minHeight: ' ',
      maxHeight: ' ',
      maxWeight: ' ',
      minWeight: ' ',
      minlife_span: ' ',
      maxlife_span: ' ',
      image: ' ',
      temperament: [],
    });
    alert('Congratulations, you have created a new dog!');
    history.push('./home');
  }
  function handleDelete(el) {
    setInput({
      ...input,
      temperament: input.temperament.filter((t) => t !== el),
    });
  }

  useEffect(() => {
    dispatch(getTemperament());
    console.log(getTemperament);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='form'>
      <Link to='/home'>
        {' '}
        <button id='button-home'>Home</button>
      </Link>
      <h1>Create New Dog</h1>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='form-part' id='form-part-1'>
            {/* NOMBRE */}
            <div className='form-input-container'>
              <h3>Name</h3>
              <input
                type='text'
                placeholder='Nombre'
                value={input.name}
                name='name'
                onChange={(e) => handleChange(e)}
              />
              <div className='error1'>
                {errors.name && <p>{errors.name}</p>}
              </div>
            </div>

            {/* IMAGEN */}
            <div className='form-input-container'>
              <h3>Image URL</h3>
              <input type='text' name='image' onChange={handleChange} />
              <div className='error1'>
                {errors.image && <p>{errors.image}</p>}
              </div>
            </div>

            {/* TEMPERAMENTOS */}
            <div className='form-input-container'>
              <h3>Select temperaments</h3>
              <select onChange={(e) => handleSelect(e)}>
                <option></option>
                {temperamentAll?.map((t) => (
                  <option key={t.id} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div className='temperaments-selected'>
              {input.temperament?.map((el) => (
                <div className='temperament-button'>
                  <p key={el.id}>{el}</p>

                  <button
                    className='button-x'
                    name={el}
                    onClick={() => handleDelete(el)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className='form-part' id='form-part-2'>
            {/* ALTURA */}
            <div className='form-input-container'>
              <h3>Height</h3>
              <div className='option-input'>
                <label>Mínima</label>
                <input
                  type='text'
                  placeholder='ingresa el valor'
                  value={input.minHeight}
                  name='minHeight'
                  onChange={(e) => handleChange(e)}
                />

                <label>Max </label>
                <input
                  type='text'
                  placeholder='ingresa el valor'
                  value={input.maxHeight}
                  name='maxHeight'
                  onChange={handleChange}
                />
                <div className='error1'>
                  {errors.maxHeight && <p>{errors.maxHeight}</p>}
                </div>
              </div>
            </div>
            <div className='error1'>
              {errors.minHeight && <p>{errors.minHeight}</p>}
            </div>

            {/* PESO */}
            <div className='form-input-container'>
              <h3>Weight</h3>

              <div className='option-input'>
                <label>Min</label>
                <input
                  type='text'
                  value={input.minWeight}
                  name='minWeight'
                  onChange={handleChange}
                  placeholder='ingresa el valor'
                />
                <div className='error1'>
                  {errors.minWeight && <p>{errors.minWeight}</p>}
                </div>

                <label>Max</label>
                <input
                  type='text'
                  value={input.maxWeight}
                  name='maxWeight'
                  onChange={handleChange}
                  placeholder='ingresa el valor'
                />
                <div className='error1'>
                  {errors.maxWeight && <p>{errors.maxWeight}</p>}
                </div>
              </div>
            </div>
            {/* ESPERANZA DE VIDA */}
            <div className='form-input-container'>
              <h3>Life Span</h3>

              <div className='option-input'>
                <label>Min</label>
                <input
                  type='text'
                  value={input.minlife_span}
                  name='minlife_span'
                  onChange={handleChange}
                  placeholder='ingresa el valor'
                />
                <div className='error1'>
                  {errors.minlife_span && <p>{errors.minlife_span}</p>}
                </div>
                <label>Max</label>
                <input
                  type='text'
                  value={input.maxlife_span}
                  name='maxlife_span'
                  onChange={handleChange}
                  placeholder='ingresa el valor'
                />
                <div className='error1'>
                  {errors.maxlife_span && <p>{errors.maxlife_span}</p>}
                </div>
              </div>
            </div>
          </div>
          <button className='button-submit-dog' type='submit'>
            Send New Breed
          </button>
        </form>
      </div>
    </div>
  );
}
