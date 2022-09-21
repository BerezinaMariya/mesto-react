import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ImagePopup from '../ImagePopup/ImagePopup';

//Закрытие popup по клику по overlay
function setEventListeners(popups, closeAllPopups) {
  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      const targetClasses = evt.target.classList;
      if (targetClasses.contains('popup_opened')) {
        closeAllPopups();
      }
    });
  });
}

function App() {
  const popups = document.querySelectorAll('.popup');

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCards] = React.useState({name: '', link: ''});

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCards(card);
    console.log(card.link);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCards({name: '', link: ''});
  }

  React.useEffect(() => {
    //Закрытие popup при нажатии на Esc
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }

    // Список действий внутри одного хука
    document.addEventListener('keydown', handleEscClose);

    // Возвращаем функцию, которая удаляет эффекты
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  });

  setEventListeners(popups, closeAllPopups);

  return (
    <>
      <Header />
      <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} />
      <Footer />

      <PopupWithForm name="edit-avatar" title="Обновить аватар" buttonText="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <input type="url" name="avatar" id="input-avatar-url" placeholder="Ссылка на картинку" className="form__input form__input_data_avatar-url" required />
        <span className="input-avatar-url-error form__input-error"></span>
      </PopupWithForm>
      <PopupWithForm name="edit-profile" title="Редактировать профиль" buttonText="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <input type="text" name="name" id="input-name" className="form__input form__input_data_name" required minLength="2" maxLength="40" />
        <span className="input-name-error form__input-error"></span>
        <input type="text" name="about" id="input-about" className="form__input form__input_data_about" required minLength="2" maxLength="200" />
        <span className="input-about-error form__input-error"></span>
      </PopupWithForm>
      <PopupWithForm name="add-card" title="Новое место" buttonText="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <input type="text" name="name" id="input-image-title" placeholder="Название" className="form__input form__input_data_image-title" required minLength="2" maxLength="30" />
        <span className="input-image-title-error form__input-error"></span>
        <input type="url" name="link" id="input-image-url" placeholder="Ссылка на картинку" className="form__input form__input_data_image-url" required />
        <span className="input-image-url-error form__input-error"></span>
      </PopupWithForm>
      <PopupWithForm name="delete-card" title="Вы уверены?" buttonText="Да">
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
    </>
  );
}

export default App;