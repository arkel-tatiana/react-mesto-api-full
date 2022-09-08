import React from 'react';
function InfoTooltip( { isOpen, onClose, regigedIn, message, textRegisterOk, textRegisterNo }) {
    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`} >
        <div className="popup__container">
          <button className="popup__close-button" type="button" aria-label="Закрыть окно4" onClick={onClose}></button>
          <form className="popup__forma" name="profile">
              <div className={`${regigedIn ? 'popup__logoOk' : 'popup__logoNo'}`}></div>
              <p className="popup__text">
                {regigedIn ? textRegisterOk : textRegisterNo }
              </p>
              <p className="popup__text_error" 
                 style={regigedIn ? { display: "none" }  :  {display: "block" }} >
                {message}
              </p>
          </form>
              
        </div>
      </div>    
    );
}
export default InfoTooltip;
