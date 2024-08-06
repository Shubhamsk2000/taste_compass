import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

function Searched() {
    const [searchedRecipe, setSearchedRecipe] = useState([]);
    let params = useParams();

    const getSearched = async (name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}&number=15`);
        const recipes = await data.json();
        setSearchedRecipe(recipes.results);
    };

    useEffect(() => {
        getSearched(params.search);
    }, [params.search]);

    return (
        <Grid>
            {searchedRecipe.map((item) => (
                <Card key={item.id}>
                    <Link to={'/recipe/' + item.id}>
                        <img src={item.image} alt={item.title} />
                        <h4>{item.title}</h4>
                    </Link>
                </Card>
            ))}
        </Grid>
    );
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    grid-gap: 2rem;
    padding: 2rem;
    background-color: #f8f8f8;
`;

const Card = styled.div`
    background: white;
    border-radius: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
    min-width: 200px;
    max-width: 250px;

    &:hover {
        transform: scale(1.05);
    }

    img {
        width: 100%;
        border-radius: 1rem 1rem 0 0;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    h4 {
        text-align: center;
        padding: 1rem;
        font-size: 1rem;
        font-weight: 600;
        color: #333;
    }
`;

export default Searched;
