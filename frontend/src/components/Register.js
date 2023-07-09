import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register(props) {

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(formValue);
  }

  return (
    <form className='authentication__form' onSubmit={handleSubmit} name='form-register' method="get" noValidate>
      <h2 className="authentication__title">Регистрация</h2>
      <input
        value={formValue.email}
        onChange={handleChange}
        type="email"
        className="authentication__input"
        name="email"
        placeholder="Email"
        required
        id="email"
      />
      <input
        value={formValue.password}
        onChange={handleChange}
        type="password"
        className="authentication__input"
        name="password"
        placeholder="Пароль"
        required
        id="password-input" />
      <button className={`button authentication__button `} type="submit">Зарегистрироваться</button>
      <p className="authentication__text">Уже зарегистрированы?&nbsp;
        <Link to="/sign-in" className="authentication__sign-in-link">
           Войти
        </Link>
      </p>
    </form>
  )
}

export default Register;