import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
function EditAvatarPopup ({isOpen, onClose, onUpdateAvatar, onLoading}) {
    const currentUser = React.useContext(CurrentUserContext);
    const userAvatar = React.useRef(currentUser.avatar);  
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(userAvatar.current.value);
    } 
    return (
        <PopupWithForm
          name="avatar"
          title="Обновить аватар"
          onLoading={onLoading}
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
          textButtonLoading="Сохранение..."
          textButton="Сохранить"
        >
        <input className="popup__input popup__input_avatar popup__input_name_linkavatar"
           ref={userAvatar}
           id="linkavatar-input"
           name="linkavatar"
           type="url"
           placeholder="https://somewebsite.com/someimage.jpg"
           required />
        </PopupWithForm>
    );
}
export default EditAvatarPopup;

