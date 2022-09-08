import avatarLogo from '../images/jakivkysto.svg'
import React from 'react';
import Card from './Card';
import { Switch, Route, useHistory} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const history = useHistory();
    return (
    <main className="content">
          <section className="profile">
              <div className="profile__container">
                  <button className="profile__avatar-button"
                    name="edit-button"
                    type="button"
                    aria-label="Редактировать фото профиля"
                    onClick={props.onEditAvatar}>
                      <img className="profile__avatar" alt="аватар пользователя" src={currentUser.avatar}/>
                  </button>
                  <div className="profile__info">
                      <div className="profile__title-container">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button className="profile__edit-button"
                          name="edit-button"
                          type="button"
                          aria-label="Редактировать профиль"
                          onClick={props.onEditProfile} />
                      </div>
                      <p className="profile__subtitle">{currentUser.about}</p>
                  </div>
              </div>
              <button className="profile__add-button"
                name="add-button"
                type="button"
                aria-label="Добавить фото"
                onClick={props.onAddPlace}/>
          </section>
  
          <section className="cards">
            <ul className="cards__container">
              {props.cards.map((item, i) => (
                <Card card={item}
                  onCardClick={props.onCardClick}
                  onCardLike={props.onCardLike}
                  onCardDelete={props.onCardDelete}
                  key={item._id}/>
              ))
              }
            </ul>
          </section>
    </main>
    );
}
export default Main;