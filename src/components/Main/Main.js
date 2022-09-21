import React from 'react';
import { api } from '../../utils/Api';
import Card from '../Card/Card';

function getUserInfo({setUserName, setUserDescription, setUserAvatar}) {
  api.getUserInfo()
  .then((res) => {
    setUserName(res.name);
    setUserDescription(res.about);
    setUserAvatar(res.avatar);
  })
  .catch((err) => {
    alert(`${err} Данные пользователя не загружены`);
  })
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

function Main(props) {

  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    getUserInfo({setUserName, setUserDescription, setUserAvatar});
  }, []);

  React.useEffect(() => {
      getInitialCards(setCards);
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__personal-data">
          <div className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }} >
            <img className="profile__avatar-image" src={userAvatar} alt={`Аватар пользователя ${userName}`} />
            <button type="button" className="profile__avatar-edit-button" onClick={props.onEditAvatar} aria-label="Редактировать аватар"></button>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{userName}</h1>
            <p className="profile__about">{userDescription}</p>
            <button type="button" className="profile__edit-button" onClick={props.onEditProfile} aria-label="Редактировать данные"></button>
          </div>
        </div>
        <button type="button" className="profile__add-button" onClick={props.onAddPlace} aria-label="Добавить карточку"></button>
      </section>
      <section>
        <ul className="cards">
          {cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={props.onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}
    
export default Main;


