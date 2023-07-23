import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/Logo.svg'

export default function Header({ login, name }) {
  const [count, setCount] = useState(false)

  function handleClick() {
    count === false ? setCount(true) : setCount(false)
  }
  function logOut() {
    setCount(false)
    localStorage.removeItem("jwt")
  }

  return (
    <header className={`header ${count === false ? "" : "header_opened"}`}>
      <img
      src={logo}
      alt="логотип Mesto"
      className="header__logo"
      />
      {name === "signup" || name === "signin" ?
        <Link to={name === "signup" ? "/sign-in" : "/sign-up"} className="header__link">
          {name === "signup"? "Войти" : "Регистрация"}
        </Link>
        :
        <>
          <div className={`header__container ${count === false ? "" : "header__container_opened"}`}>
            <p className="header__user-email">{login}</p>
            <Link to="/sign-in" className="header__link header__link_goout" onClick={logOut}>Выйти</Link>
          </div>
          <button className={`header__button ${count === false ? "" : "header__button_active"}`} type="button" onClick={handleClick}></button>
        </>
      }
    </header>
  )
}