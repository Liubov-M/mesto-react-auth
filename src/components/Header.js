import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/Logo.svg'

export default function Header({ onClick, headerText, userData, isLoggedIn, link }) {
  return (
    <header className="header">
      <img
      src={logo}
      alt="логотип Mesto"
      className="header__logo"
    />
      <div className="header__container">
          <p className="header__user-email">{userData}</p>
          <Link to={link}
            onClick={onClick}
            className={`${isLoggedIn && 'header__link_goout'} header__link`}>{headerText}
          </Link>
        </div>
    </header>
  )
}