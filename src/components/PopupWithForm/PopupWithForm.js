import React from 'react';

function PopupWithForm(props) {

  return (
    <div className={`popup popup_action_${props.name} ${props.isOpen ? 'popup_opened' : ''}`} >
      <div className="popup__container">
        <button type="button" className="popup__close-button" onClick={props.onClose} aria-label="Закрыть"></button>
        <h3 className="popup__title">{`${props.title}`}</h3>
        <form name={`form_action_${props.name}`} className={`form form_action_${props.name}`} noValidate>
          {props.children}
          <button type="submit" className="form__submit-button">{props.buttonText}</button>
        </form>
      </div>
    </div>
  );
}
      
export default PopupWithForm;