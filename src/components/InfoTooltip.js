import React from "react";
import loginSuccess from '../images/Success.png';
import loginFailed from '../images/Failed.png';

export default function InfoTooltip({ isOpen, onClose, regSuccess, isRegSuccess, regFailed }) {
  return (
    <div className={`popup  ${isOpen && 'popup_opened'}`}>
      <div className="popup__modal-registration">
        <img className="popup__registration-image" src={`${isRegSuccess ? loginSuccess : loginFailed}`} alt="Статус регистрации" />
        <p className="popup__registration-text">{`${isRegSuccess ? regSuccess : regFailed}`}</p>
        <button className="popup__close-button" type="button" onClick={onClose}/>
      </div>
   </div>
  );
}