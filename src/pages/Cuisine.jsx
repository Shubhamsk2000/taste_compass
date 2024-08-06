import styled from "styled-components";
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";

function Cuisine() {
    const [cuisine, setCuisine] = useState([]);
    let params = useParams();

    const getCuisine = async (name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}&number=15`);
        const recipes = await data.json();
        setCuisine(recipes.results);
    };

    useEffect(() => {
        getCuisine(params.id);
    }, [params.id]);

    return (
        <Grid
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {cuisine.map((item) => {
                return (
                    <Card key={item.id}>
                        <Link to={'/recipe/' + item.id}>
                            <img src={item.image} alt={item.title} />
                            <h4>{item.title}</h4>
                        </Link>
                    </Card>
                );
            })}
        </Grid>
    );
}

const Grid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    gap: 2rem;
    padding: 2rem;

    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
    }

    @media (max-width: 480px) {
        grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    }
`;

const Card = styled.div`
    border-radius: 2rem;
    overflow: hidden;
    box-shadow: 0px 6px 18px -9px rgba(0, 0, 0, 0.75);
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.05);
    }

    img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 2rem 2rem 0 0;
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
    }

    @media (max-width: 768px) {
        h4 {
            font-size: 0.9rem;
        }
    }

    @media (max-width: 480px) {
        h4 {
            font-size: 0.8rem;
        }
    }
`;

export default Cuisine;
