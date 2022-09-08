import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import {api} from '../utils/Api';
import React, { useState, useEffect } from 'react'
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [deletedCard, setDeletedCard] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [regigedIn, setRegigedIn] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  const [userData, setUserData] = useState('');
  const [message, setMessage] = useState('');
  const [errorLogin, setErrorLogin] = useState(false);
  
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
      if (jwt) {
        setStatusToken(jwt);
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
       history.push('/');
    }
  }, [loggedIn])
  
  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserData(), api.getInitialCards()])
        .then(([resUserData, resinitialCards])=>{
        setCurrentUser(resUserData.data);
        setCards(resinitialCards.data);
      })
      .catch((err)=>{ 
        console.log(`ошибка ${err}`); 
      })
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err)=>{ 
      console.log(`ошибка ${err}`); ; 
    });
  } 
  
  function handleCardDelete(card) {
    setIsLoading(true)
    api.deleteCardElement(card._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id ));
      closeAllPopups();
    })
    .catch((err)=>{ 
      console.log(`ошибка ${err}`); ; 
    })
    .finally(() => {
      setIsLoading(false)
    })
  }
  
  const handleCardClick = (dataCard) => {
    setSelectedCard(dataCard)
  };
  
  function handleButtonDelete(dataCard) {
    setIsDeletePopupOpen(true);
    setDeletedCard(dataCard)  
  }
  
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  };
  
  const handleEditAvatar = () => {
    setIsEditAvatarPopupOpen(true);
  };
  
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsDeletePopupOpen(false);
    setIsInfoTooltip(false);
  };
  
  const handleUpdateUser = (formData) => {
    setIsLoading(true);
    api.editUserData(formData)
    .then((res)=>{
      setCurrentUser(res.data);
    })
    .then(() => {
      closeAllPopups();
    })
    .catch((err)=>{ 
      console.log(`ошибка ${err}`); ; 
    })
    .finally(() => {
      setIsLoading(false)
    })
  }; 
  
  const handleUpdateAvatar = (formData) => {
    setIsLoading(true)
    api.editUserAvatar(formData)
    .then((res)=>{
      setCurrentUser(res.data);
    })
    .then((res)=>{
      closeAllPopups();
    })
    .catch((err)=>{ 
      console.log(`ошибка ${err}`); 
    })
    .finally(() => {
      setIsLoading(false);
    })
  };
  
  const handleAddPlaceSubmit = (formData) => {
    setIsLoading(true)
    api.addCardElement(formData)
    .then((res)=>{
      setCards([res.data, ...cards]);
    })
    .then(() => {
      closeAllPopups();
    })
    .catch((err)=>{ 
      console.log(`ошибка ${err}`); ; 
    })
    .finally(() => {
      setIsLoading(false)
    })
  };
  
  const handleSubmitDelete = (e) => {
    e.preventDefault();
    handleCardDelete(deletedCard);
  }

  const setStatusToken = (jwt) => {
    auth.checkToken(jwt)
    .then((res) => {
      if (res) {
        setLoggedIn(true);
        setUserData(res.data.email);
      } else {
        setLoggedIn(false);
      }
    })
    .catch((err)=>{ 
      console.log(`ошибка ${err}`); 
    })
  }

  const onRegister = ({ email, password }) => {
    return auth.register(email, password)
    .then((res) => {
      setIsInfoTooltip(true);
      if (res.error) {
        setMessage(res.error);
        setRegigedIn(false);
        history.push('/sign-up');
      } else {
        setRegigedIn(true);
        setMessage('');
        history.push('/sign-in');
      }
    })
    .catch((err)=>{ 
      console.log(`ошибка ${err}`); 
    });
  }
  
  const onLogin = ({ email, password }) => {
    return auth.authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          setErrorLogin(false);
          history.push('/');
        } else {
          setErrorLogin(true);
        };
      })
      .catch((err) => { 
         console.log(`ошибка ${err}`);
      });
  };
  
  const signOut = () => {
    localStorage.removeItem('jwt');
    setUserData('')
    setLoggedIn(false);
    history.push('/sign-in');
  }
  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
       <Header loggedIn={loggedIn} userData={userData} signOut={signOut}/>
          <Switch>
            <Route path="/sign-up">
              <Register onRegister={onRegister}/>
            </Route>
            <Route path="/sign-in">
                <Login onLogin={onLogin} errorLogin={errorLogin} error={'Введен некорректный email или пароль'}/>
            </Route>
            <ProtectedRoute
              path="/"
              loggedIn={loggedIn}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleButtonDelete}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatar}
              onCardClick={handleCardClick}
              component={Main} />
            <Route path="*">
              <Redirect to="/sign-in" />
            </Route>
          </Switch>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            onLoading={isLoading} /> 
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            onLoading={isLoading}/>
          <PopupWithForm
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            dataCard={deletedCard}
            name="delete"
            title="Вы уверены?"
            onLoading={isLoading}
            onSubmit={handleSubmitDelete}
            textButtonLoading="Удаление..."
            textButton="Да"/>
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            onLoading={isLoading}/>
          <ImagePopup
            onClose={closeAllPopups}
            dataCard={selectedCard}/>
          <InfoTooltip
            isOpen={isInfoTooltip}
            onClose={closeAllPopups}
            regigedIn={regigedIn}
            message={message}
            textRegisterOk="Вы успешно зарегистрировались!"
            textRegisterNo="Что-то пошло не так! Попробуйте ещё раз." />
          <Footer />
      </CurrentUserContext.Provider> 
    </div>
  );
}

export default App;
