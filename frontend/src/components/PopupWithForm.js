import React from 'react';
function PopupWithForm(props) {
    return (
    <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`} name={`${props.name}`}>
            <div className="popup__container">
            <button className="popup__close-button" type="button" aria-label="Закрыть окно1" onClick={props.onClose}></button>
            <form className={`popup__forma popup__forma_${props.name}`} name={`${props.name}`} onSubmit={props.onSubmit}>
              <h2 className="popup__title">{props.title}</h2>
              {props.children}
              <button className="popup__submit-button popup__submit-button_active" type="submit" >
                {props.onLoading ? props.textButtonLoading : props.textButton} </button>
            </form>
          </div>
    </div>
    );
}
export default PopupWithForm;
