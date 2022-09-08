import React from 'react';
import {Link} from 'react-router-dom';
import useInputChange from '../utils/useInputChange'
const Register = ({ onRegister }) => {
    const [values, setValues, handleChange] = useInputChange()

    React.useEffect(() => {
        setValues({ email:'', password:'' });
    }, []);

    const handleSubmit = (e) => {
      e.preventDefault();
      onRegister({ email: values.email, password: values.password })
    }
    return (
        <form className="popup__forma popup__forma_auth" onSubmit={handleSubmit} >
            <h2 className="popup__title popup__title_auth">Регистрация</h2>
            <input className="popup__input popup__input_auth"
                id="user-email"
                name="email"
                type="email"
                placeholder="Email"
                value={values.email || ''}
                onChange={handleChange}
                required />
            <input className="popup__input popup__input_auth"
                id="user-password"
                name="password"
                type="password"
                placeholder="Пароль"
                value={values.password || ''}
                onChange={handleChange} 
                required />    
            <button className="popup__submit-button popup__submit-button_auth" type="submit" required>Зарегистрироваться</button>
            <p className="popup__text popup__text_auth">Уже зарегистрированы?<Link to='/sign-in' className="popup__text popup__text_auth"> Войти</Link></p>
        </form>
    );
}
export default Register;
