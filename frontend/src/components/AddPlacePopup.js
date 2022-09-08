import React from 'react'
import PopupWithForm from './PopupWithForm';
import useInputChange from '../utils/useInputChange'
function AddPlacePopup ({isOpen, onClose, onAddPlace, onLoading}) {
    const [values, setValues, handleChange] = useInputChange()
    

    React.useEffect(() => {
      setValues({newCardName:'', newCardLink:''});
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
          name: values.newCardName,
          link: values.newCardLink
        });
    } 
    
    return (
        <PopupWithForm
          name="cards"
          title="Новое место"
          onLoading={onLoading}
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
          textButtonLoading="Сохранение..."
          textButton="Создать"
        >  
          <input className="popup__input popup__input_name_namecards"
            onChange={handleChange}
            id="namecards-input"
            name="newCardName"
            value={values.newCardName || ''}
            type="text"
            required
            placeholder="Название"/>
          <input className="popup__input popup__input_name_linkcards popup__input_placeholder"
            onChange={handleChange}
            id="linkcards-input"
            value={values.newCardLink || ''}
            name="newCardLink"
            type="url"
            placeholder="Ссылка на картинку"
            required />
        </PopupWithForm>  
    );
}
export default AddPlacePopup;

