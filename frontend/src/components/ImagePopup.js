function ImagePopup({dataCard, onClose}){
  return (
  <div className={`popup popup_images popup_dark-theme ${Object.keys(dataCard).length!==0 ? 'popup_opened' : ''}`} name="imagePopup">
    <div className="popup__container popup__container_image">
      <img className="popup__image" alt={`фото ${dataCard.name}`} src={dataCard.link} />
      <p className="popup__image-title">{dataCard.name}</p>
      <button className="popup__close-button" type="button" aria-label="Закрыть окно3" onClick={onClose}></button>
    </div>
  </div>
  );
}
export default ImagePopup;