import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const titleRef = useRef();
    const linkRef = useRef();

    useEffect(() => {
      titleRef.current.value = '';
      linkRef.current.value = '';
    }, [isOpen])

    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlace({
          title: titleRef.current.value,
          link: linkRef.current.value
        });
      }

  return(
    <PopupWithForm
    name="#edit-cards"
    title="Новое место"
    buttonText="Создать"
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        type="text"
        name="title"
        id="object"
        placeholder="Название"
        minLength={2}
        maxLength={30}
        required=""
        ref={titleRef}
      />
      <span className="popup__input-error" id="object-error" />
      <input
        className="popup__input"
        type="url"
        name="link"
        id="link"
        placeholder="Ссылка на картинку"
        required=""
        ref={linkRef}
      />
      <span className="popup__input-error" id="link-error" />
    </PopupWithForm>
  )
}