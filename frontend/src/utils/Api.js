
class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
//    this._headers = options.headers
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
//      credentials: 'include',
//      headers: this._headers
    headers: {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,//`Bearer ${token}`,
      'Content-Type': 'application/json'
    }
    })
    .then(this._getResponseData)
  }
  addCardElement(dataValue) {
    return fetch(this._baseUrl + '/cards/', {
      method: 'POST',
  //    credentials: 'include',
  //    headers: this._headers,
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,//`Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: dataValue.name,
        link: dataValue.link
      })
    })
    .then(this._getResponseData)
  };  
  deleteCardElement(idCard) {
      return fetch(this._baseUrl + '/cards/' + idCard, {
  //    credentials: 'include',
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,//`Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      //headers: this._headers
    })
    .then(this._getResponseData)
  };
  getUserData() {
    return fetch(this._baseUrl + '/users/me', {
  //  credentials: 'include',  
  //  headers: this._headers
    headers: {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,//`Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    })
    .then(this._getResponseData)
  };
  editUserData(formData) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
  //    credentials: 'include',
      //headers: this._headers,
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,//`Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        about: formData.about
      })
      })
      .then(this._getResponseData)
  }
  editUserAvatar(dataValue) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
  //    credentials: 'include',
      //headers: this._headers,
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,//`Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: dataValue
      })
      })
      .then(this._getResponseData)
  }
  changeLikeCardStatus(idCard, status) {
    return fetch(this._baseUrl + '/cards/' + idCard + '/likes', {
      method: status ? 'PUT' : 'DELETE',
  //    credentials: 'include',
      //headers: this._headers
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,//`Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      })
      .then(this._getResponseData)    
  };
  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
  } 
};
export const api = new Api({
  baseUrl: 'https://api.arkel.students.nomoredomains.sbs',  // 'http://localhost:3000',
  //headers: {
  //  authorization: `Bearer ${localStorage.getItem('jwt')}`,//`Bearer ${token}`,
  //  'Content-Type': 'application/json'
  //}
});
