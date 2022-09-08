import React from 'react';
import { useHistory } from 'react-router-dom';
import useInputChange from '../utils/useInputChange'
const Login = ({ onLogin, errorLogin, error }) => {
    const history = useHistory();
    const [values, setValues, handleChange] = useInputChange()

    React.useEffect(() => {
      setValues({emailLogin:'', passwordLogin:''});
    }, []);
     
    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({ email: values.emailLogin, password: values.passwordLogin })
    }
    return (
        <form className="popup__forma popup__forma_auth" onSubmit={handleSubmit}>
            <h2 className="popup__title popup__title_auth">Вход</h2>
            <input className="popup__input popup__input_auth"
                id="user-email"
                name="emailLogin"
                type="email"
                placeholder="Email"
                value={values.emailLogin || ''}
                onChange={handleChange} 
                required />
            <input className="popup__input popup__input_auth"
                id="user-password"
                name="passwordLogin"
                type="password"
                placeholder="Пароль"
                value={values.passwordLogin || ''}
                onChange={handleChange}
                required />   
            <button className="popup__submit-button popup__submit-button_auth" type="submit" required>Войти</button>
            <p className="popup__text_error" style={!errorLogin ? { display: "none" }  :  {display: "block" }} >{error}</p>
        </form>
    );
}
export default Login;

