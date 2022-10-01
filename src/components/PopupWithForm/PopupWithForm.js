import React from 'react';
import { FormValidator } from '../FormValidator/FormValidator';

function PopupWithForm(props) {
  const submitButtonTextRef = React.useRef();
  const formRef = React.useRef();

  const renderLoading = () => {
    if (!props.isLoading) {
      return submitButtonTextRef.current = props.buttonText;
    } else {
      return submitButtonTextRef.current = 'Сохранение...';
    }
  }

  React.useEffect(() => {
    if (props.isOpen) {
      formRef.current.reset();
      const formValidation = new FormValidator(formRef.current);
      formValidation.enableValidation();
      formValidation.resetValidationFields();
      formValidation.toggleButtonState();
    }
  }, [props.isOpen]);

  return (
    <div className={`popup popup_action_${props.name} ${props.isOpen ? 'popup_opened' : ''}`} >
      <div className="popup__container">
        <button type="button" className="popup__close-button" onClick={props.onClose} aria-label="Закрыть"></button>
        <h3 className="popup__title">{`${props.title}`}</h3>
        <form name={`form_action_${props.name}`} className={`form form_action_${props.name}`} ref={formRef} onSubmit={props.onSubmit} noValidate>
          {props.children}
          <button type="submit" className="form__submit-button" ref={submitButtonTextRef}>{renderLoading()}</button>
        </form>
      </div>
    </div>
  );
}
      
export default PopupWithForm;