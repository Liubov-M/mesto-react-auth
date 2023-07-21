import React, { useRef, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = useRef();

    useEffect(() => {
      avatarRef.current.value = '';
    }, [isOpen])

    function handleSubmit(evt) {
      evt.preventDefault();
      onUpdateAvatar({
        avatar: avatarRef.current.value
      });
    }

  return (
    <PopupWithForm
        name="#edit-avatar"
        title="Обновить аватар"
        buttonText="Сохранить"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        >
          <input
            className="popup__input"
            type="url"
            name="avatar"
            id="avatar"
            placeholder="Ссылка на фото"
            required=""
            ref={avatarRef}
          />
          <span className="popup__input-error" id="avatar-error" />
        </PopupWithForm>
  )
}