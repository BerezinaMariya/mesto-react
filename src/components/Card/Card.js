import React from 'react';

function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  } 

  return (
    <li className="cardElement">
      <img className="cardElement__image" style={{ backgroundImage: `url(${props.card.link})`}} onClick={handleClick} />
      <div className="cardElement__caption">
        <h2 className="cardElement__title">
          {props.card.name}
        </h2>
        <div className="cardElement__like">
          <button type="button" className="cardElement__like-button" aria-label="Нравится"></button>
          <p className="cardElement__likes">{props.card.likes.length}</p>
        </div>
      </div>
      <button type="button" className="cardElement__delete-button" aria-label="Удалить"></button>
    </li>
  );
}
              
export default Card;