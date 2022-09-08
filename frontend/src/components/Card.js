import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
    function handleClick(){
      onCardClick(card)
    }
    function handleLikeClick(){
      onCardLike(card)
    } 
    function handleDeleteClick(){
      onCardDelete(card)
    } 
    const isOwn = card.owner === currentUser._id;
    const cardDeleteButtonClassName = (`cards__delete ${isOwn ? 'cards__delete' : 'cards__delete_hidden'}`); 
    const isLiked = card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = `cards__likelogo ${isLiked ? 'cards__logolike_active' : 'cards__likelogo'}`; 
    return (
      <li className="cards__item" >
        <div className="cards__images">
          <img className="cards__image" alt={`фото ${card.name}`} src={card.link} onClick={handleClick} />
          <button className={cardDeleteButtonClassName} type="button" aria-label="Удалить фото" onClick={handleDeleteClick}></button>
        </div>
        <p className="cards__title">{card.name}</p>
        <div className="cards__like">
          <button className={cardLikeButtonClassName} type="button" aria-label="Поставить Лайк" onClick={handleLikeClick}></button>
          <p className="cards__likecount">{card.likes.length}</p>
        </div>
      </li>  
    );
}
export default Card;