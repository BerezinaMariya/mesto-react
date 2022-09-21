import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup popup_action_image-preview ${props.card._id ? 'popup_opened' : ''}`}>
      <div className="popup__preview-container">
        <button type="button" className="popup__close-button" onClick={props.onClose} aria-label="Закрыть"></button>
        <img className="popup__image-preview-url" src={props.card.link} alt={`Просмотр увеличенного изображения места ${props.card.name}`} />
        <h3 className="popup__image-preview-title">{props.card.name}</h3>
      </div>
    </div>
  );
}
      
export default ImagePopup;