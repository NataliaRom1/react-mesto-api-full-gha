import React, { useState } from 'react';

function Login(props) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(formValue);
  }

  return (
    <form className='authentication__form' onSubmit={handleSubmit} name='form-authorization' method="get" noValidate>
      <h2 className="authentication__title">Вход</h2>
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
        id="password-input"
      />
      <button className="button authentication__button" type="submit">Войти</button>
    </form>
  )
}

export default Login;