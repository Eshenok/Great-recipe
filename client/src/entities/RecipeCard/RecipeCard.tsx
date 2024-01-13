import React from 'react';

const RecipeCard = ({image}) => {
  return (
    <div className={"recipe-card"}>
      <img src={image} className={"recipe-card__image"}/>
    </div>
  );
};

export default RecipeCard;
