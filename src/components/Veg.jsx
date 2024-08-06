import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';

function Veg() {
  const [veg, setVeg] = useState([]);

  useEffect(() => {
    getVeg();
  }, []);

  const getVeg = async () => {
    const check = localStorage.getItem('veg');

    if (check) {
      setVeg(JSON.parse(check));
    } else {
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=5&tags=vegetarian`);
      const data = await api.json();
      localStorage.setItem('veg', JSON.stringify(data.recipes));
      setVeg(data.recipes);
      console.log(data.recipes);
    }
  };

  return (
    <div>
      <Wrapper>
        <h3>Our Vegetarian Picks</h3>
        <Splide
          options={{
            perPage: 3,
            breakpoints: {
              1024: { perPage: 2 },
              768: { perPage: 1 },
            },
            arrows: false,
            pagination: false,
            drag: 'free',
            gap: '2rem',
          }}
        >
          {veg.map((recipe) => (
            <SplideSlide key={recipe.id}>
              <Card>
                <Link to={'/recipe/' + recipe.id}>
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title} />
                  <Gradient />
                </Link>
              </Card>
            </SplideSlide>
          ))}
        </Splide>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  margin: 2rem 0;
`;

const Card = styled.div`
  min-height: 20rem;
  border-radius: 1rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 1rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-size: 0.9rem;
    font-weight: 500;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;
    background: rgba(0, 0, 0, 0.5); /* Adding a background to text for better readability */
  }

  @media (max-width: 1024px) {
    min-height: 15rem;

    p {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 768px) {
    min-height: 12rem;

    p {
      font-size: 0.7rem;
    }
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Veg;
