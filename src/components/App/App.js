import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup';
import CardDeletePopup from '../CardDeletePopup/CardDeletePopup';
import ImagePopup from '../ImagePopup/ImagePopup';
import { FormValidator } from '../FormValidator/FormValidator';
import { api } from '../../utils/Api';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { CardsContext } from '../../contexts/CardsContext';

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

function getUserInfo(setCurrentUser) {
  api.getUserInfo()
  .then((res) => {
    setCurrentUser(res);
  })
  .catch((err) => {
    alert(`${err} Данные пользователя не загружены`);
  })
}

function setUserInfo(user, setCurrentUser, setLoading) {
  setLoading(true);

  api.setUserInfo(user)
  .then((res) => {
    setCurrentUser(res);
  })
  .catch((err) => {
    alert(`${err} Данные пользователя не обновились`);
  })
  .finally(() => {
    setLoading(false);
  });
}

function setUserAvatar(avatar, setCurrentUser, setLoading) {
  setLoading(true);

  api.setAvatar(avatar)
  .then((res) => {
    setCurrentUser(res);
  })
  .catch((err) => {
    alert(`${err} Аватар не обновился`);
  })
  .finally(() => {
    setLoading(false);
  });
}

function getInitialCards(setCards) {
  api.getInitialCards()
  .then((res) => {
    setCards(res);
  })
  .catch((err) => {
    alert(`${err} Карточки не загружены`);
  })
}

// Отправляем запрос в API и получаем обновлённые данные карточки
function changeLikeCardStatus(card, isLiked, setCards) {
  api.changeLikeCardStatus(card._id, !isLiked)
  .then((newCard) => {
    setCards((state) =>
      state.map((c) => c._id === card._id ? newCard : c)
    )
  })
  .catch((err) => {
    alert(`${err} Лайк не изменился`);
  })
}

function deleteCard(card, setCards, setLoading) {
  setLoading(true);

  api.deleteCard(card._id)
  .then(() => {
    setCards((state) =>
      state.filter(c => c._id !== card._id)
    );
  })
  .catch((err) => {
    alert(`${err} Карточка не удалилась`);
  })
  .finally(() => {
    setLoading(false);
  });
}

function setNewCard(newCard, cards, setCards, setLoading) {
  setLoading(true);

  api.setNewCard(newCard)
  .then((res) => {
    setCards([res, ...cards]);
  })
  .catch((err) => {
    alert(`${err} Карточка не создана`);
  })
  .finally(() => {
    setLoading(false);
  });
}

function App() {
  const popups = document.querySelectorAll('.popup');
  
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isCardDeletePopupOpen, setCardDeletePopupOpen] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
  const [deletedCard, setDeleteCard] = React.useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardDeleteClick(card) {
    setDeleteCard(card);
    setCardDeletePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    console.log(card.link);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setCardDeletePopupOpen(false);
    setSelectedCard({name: '', link: ''});
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    changeLikeCardStatus(card, isLiked, setCards);
  }

  function handleCardDelete(card) {
    deleteCard(card, setCards, setLoading);
  }

  function handleUpdateUser(user) {
    setUserInfo(user, setCurrentUser, setLoading)
  }

  function handleUpdateAvatar(avatar) {
    setUserAvatar(avatar, setCurrentUser, setLoading)
  }

  function handleAddPlaceSubmit(newCard) {
    setNewCard(newCard, cards, setCards, setLoading);
  }

  React.useEffect(() => {
    getUserInfo(setCurrentUser);
  }, []);

  React.useEffect(() => {
    getInitialCards(setCards);
  }, []);

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
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
        <Header />
        <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} setCards={setCards} onCardLike={handleCardLike} onCardDeleteClick={handleCardDeleteClick} />
        <Footer />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading} />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading}/>
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isLoading={isLoading}/>
        <CardDeletePopup card={deletedCard} isOpen={isCardDeletePopupOpen} onClose={closeAllPopups} onCardDelete={handleCardDelete} isLoading={isLoading}/>
        <ImagePopup card={selectedCard}  onClose={closeAllPopups} />

      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;