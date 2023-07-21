import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm.js";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const currentUser = useContext(CurrentUserContext)

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen])

  function handleChangeUserName(evt) {
    setName(evt.target.value)
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
        name="#edit-profile"
        title="Редактировать профиль"
        buttonText="Сохранить"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        >
          <input
            className="popup__input"
            type="text"
            name="username"
            id="firstname"
            placeholder="Имя Фамилия"
            onChange={handleChangeUserName}
            minLength={2}
            maxLength={40}
            required
            value={name ?? ''}
          />
          <span className="popup__input-error" id="firstname-error" />
          <input
            className="popup__input"
            type="text"
            name="job"
            id="job"
            placeholder="О себе"
            onChange={handleChangeDescription}
            minLength={2}
            maxLength={200}
            required
            value={description ?? ''}
          />
          <span className="popup__input-error" id="job-error" />
        </PopupWithForm>
  )
}