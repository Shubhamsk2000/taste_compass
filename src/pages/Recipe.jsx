import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  const fetchDetails = async (name) => {
    const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
    const detailData = await data.json();
    setDetails(detailData);
  };

  useEffect(() => {
    fetchDetails(params.name);
  }, [params.name]);

  return (
    <DetailWrapper>
      <ImageWrapper>
        <img src={details.image} alt={details.title} />
      </ImageWrapper>
      <Info>
        <h2>{details.title}</h2>
        <ButtonGroup>
          <Button
            className={activeTab === "instructions" ? "active" : ""}
            onClick={() => setActiveTab("instructions")}
          >
            Instructions
          </Button>
          <Button
            className={activeTab === "ingredients" ? "active" : ""}
            onClick={() => setActiveTab("ingredients")}
          >
            Ingredients
          </Button>
        </ButtonGroup>
        {activeTab === 'instructions' && (
          <div>
            <Summary dangerouslySetInnerHTML={{ __html: details.summary }}></Summary>
            <Instructions dangerouslySetInnerHTML={{ __html: details.instructions }}></Instructions>
          </div>
        )}
        {activeTab === 'ingredients' && (
          <IngredientsList>
            {details.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </IngredientsList>
        )}
      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4rem 0;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: 2rem;

  img {
    width: 100%;
    border-radius: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  @media (min-width: 768px) {
    margin-right: 2rem;
    margin-bottom: 0;
  }
`;

const Info = styled.div`
  flex: 1;
  max-width: 600px;

  h2 {
    margin-bottom: 2rem;
    font-size: 2rem;
    color: #333;
    text-align: center;

    @media (min-width: 768px) {
      text-align: left;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid #313131;
  margin: 0 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background: #313131;
    color: white;
  }

  &.active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
`;

const Summary = styled.h3`
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const Instructions = styled.h3`
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const IngredientsList = styled.ul`
  margin-top: 2rem;
  padding: 0;
  list-style: none;

  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
    border-bottom: 1px solid #ddd;
    padding: 0.5rem 0;
  }
`;

export default Recipe;
