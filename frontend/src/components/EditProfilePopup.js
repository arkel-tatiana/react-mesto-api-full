import React from 'react'
import PopupWithForm from './PopupWithForm';
import useInputChange from '../utils/useInputChange'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
function EditProfilePopup ({isOpen, onClose, onUpdateUser, onLoading}) {
    const currentUser = React.useContext(CurrentUserContext);
    const [values, setValues, handleChange] = useInputChange()

    React.useEffect(() => {
     setValues({name:currentUser.name, description:currentUser.about});
    }, [currentUser, isOpen]);
    
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
          name: values.name,
          about: values.description,
        });
    } 
       
    return (
        <PopupWithForm
          name="profile"
          title="Редактировать профиль"
          onLoading={onLoading}
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
          textButtonLoading="Сохранение..."
          textButton="Сохранить"
        >
        <input className="popup__input popup__input_name_username"
          id="username-input"
          name="name"
          onChange={handleChange}
          type="text"
          value={values.name || ''}
          required
          placeholder="имя" />
        <input className="popup__input popup__input_name_userjob"
          id="userjob-input"
          name="description"
          value={values.description || ''}
          onChange={handleChange}
          type="text"
          required
          placeholder="о себе" />
        </PopupWithForm>
    );
}
export default EditProfilePopup;

//const handleChange = (event) => { 
    //  const { name, value } = event.target
    //  setValues((prev) => ({...prev, [name]: value
    //  }))
   // }